import {jest} from '@jest/globals'
import {GitHub} from '@actions/github/lib/utils'
import {listFiles} from '../../src/utils/github-utils'

type GetTreeParams = {tree_sha: string; recursive?: string}
type GetTreeEntry = {path: string; type: 'blob' | 'tree'; sha?: string}
type GetTreeResponse = {data: {tree: GetTreeEntry[]; truncated: boolean}}

function buildOctokit(treesBySha: Map<string, {recursive: GetTreeResponse; flat: GetTreeResponse}>) {
  const getCommit = jest.fn().mockResolvedValue({data: {tree: {sha: 'root-sha'}}})
  const getTree = jest.fn().mockImplementation(({tree_sha, recursive}: GetTreeParams) => {
    const entry = treesBySha.get(tree_sha)
    if (!entry) {
      throw new Error(`Unexpected tree_sha requested in test: ${tree_sha}`)
    }
    return Promise.resolve(recursive === 'true' ? entry.recursive : entry.flat)
  })

  return {
    rest: {
      git: {getCommit, getTree}
    }
  } as unknown as InstanceType<typeof GitHub>
}

function recursiveResponse(tree: GetTreeEntry[], truncated = false): GetTreeResponse {
  return {data: {tree, truncated}}
}

describe('listFiles / listGitTree', () => {
  // Suppress stdout logging from @actions/core during tests
  let stdoutWriteSpy: jest.SpiedFunction<typeof process.stdout.write>

  beforeEach(() => {
    process.env.GITHUB_REPOSITORY = 'owner/repo'
    stdoutWriteSpy = jest.spyOn(process.stdout, 'write').mockImplementation(() => true)
  })

  afterEach(() => {
    stdoutWriteSpy.mockRestore()
  })

  it('returns only blob paths from a non-truncated root and fetches the tree once', async () => {
    const trees = new Map([
      [
        'root-sha',
        {
          recursive: recursiveResponse([
            {path: 'src', type: 'tree', sha: 'src-sha'},
            {path: 'README.md', type: 'blob'},
            {path: 'src/index.ts', type: 'blob'}
          ]),
          flat: recursiveResponse([])
        }
      ]
    ])
    const octokit = buildOctokit(trees)

    const files = await listFiles(octokit, 'commit-sha')

    expect(files.sort()).toEqual(['README.md', 'src/index.ts'].sort())
    expect(octokit.rest.git.getTree).toHaveBeenCalledTimes(1)
  })

  it('falls back to a non-recursive fetch and descends into subtrees when the root is truncated, prefixing nested paths', async () => {
    const trees = new Map([
      [
        'root-sha',
        {
          recursive: recursiveResponse([], true),
          flat: recursiveResponse([
            {path: 'a', type: 'tree', sha: 'a-sha'},
            {path: 'top.txt', type: 'blob'}
          ])
        }
      ],
      [
        'a-sha',
        {
          // A non-truncated recursive listing already flattens nested blobs (e.g. b/deep.ts),
          // so it has no reason to also list "b" as a tree entry.
          recursive: recursiveResponse([
            {path: 'file.ts', type: 'blob'},
            {path: 'b/deep.ts', type: 'blob'}
          ]),
          flat: recursiveResponse([])
        }
      ]
    ])
    const octokit = buildOctokit(trees)

    const files = await listFiles(octokit, 'commit-sha')

    expect(files.sort()).toEqual(['top.txt', 'a/file.ts', 'a/b/deep.ts'].sort())
  })

  it('expands a subtree one level further when its recursive response is also truncated', async () => {
    const trees = new Map([
      [
        'root-sha',
        {
          recursive: recursiveResponse([], true),
          flat: recursiveResponse([{path: 'big', type: 'tree', sha: 'big-sha'}])
        }
      ],
      [
        'big-sha',
        {
          // subtree is itself truncated when fetched recursively
          recursive: recursiveResponse([], true),
          flat: recursiveResponse([
            {path: 'nested', type: 'tree', sha: 'nested-sha'},
            {path: 'big-file.ts', type: 'blob'}
          ])
        }
      ],
      [
        'nested-sha',
        {
          recursive: recursiveResponse([{path: 'leaf.ts', type: 'blob'}]),
          flat: recursiveResponse([])
        }
      ]
    ])
    const octokit = buildOctokit(trees)

    const files = await listFiles(octokit, 'commit-sha')

    expect(files.sort()).toEqual(['big/big-file.ts', 'big/nested/leaf.ts'].sort())
  })

  it('skips tree entries missing a SHA', async () => {
    const trees = new Map([
      [
        'root-sha',
        {
          recursive: recursiveResponse([], true),
          flat: recursiveResponse([
            {path: 'no-sha-dir', type: 'tree'},
            {path: 'top.txt', type: 'blob'}
          ])
        }
      ]
    ])
    const octokit = buildOctokit(trees)

    const files = await listFiles(octokit, 'commit-sha')

    expect(files).toEqual(['top.txt'])
  })

  it('does not overflow the call stack when a truncated subtree contains a very large number of blobs', async () => {
    const blobCount = 300000
    const bigSubtree: GetTreeEntry[] = []
    for (let i = 0; i < blobCount; i++) {
      bigSubtree.push({path: `file-${i}.ts`, type: 'blob'})
    }

    const trees = new Map([
      [
        'root-sha',
        {
          recursive: recursiveResponse([], true),
          flat: recursiveResponse([{path: 'big', type: 'tree', sha: 'big-sha'}])
        }
      ],
      [
        'big-sha',
        {
          recursive: recursiveResponse(bigSubtree),
          flat: recursiveResponse([])
        }
      ]
    ])
    const octokit = buildOctokit(trees)

    const files = await listFiles(octokit, 'commit-sha')

    expect(files).toHaveLength(blobCount)
  })

  it('does not overflow the call stack when truncation nests thousands of levels deep', async () => {
    const depth = 10000
    const trees = new Map<string, {recursive: GetTreeResponse; flat: GetTreeResponse}>()

    trees.set('root-sha', {
      recursive: recursiveResponse([], true),
      flat: recursiveResponse([{path: 'level-0', type: 'tree', sha: 'level-0-sha'}])
    })

    for (let i = 0; i < depth; i++) {
      const sha = `level-${i}-sha`
      const isLast = i === depth - 1
      trees.set(sha, {
        recursive: isLast ? recursiveResponse([{path: 'leaf.ts', type: 'blob'}]) : recursiveResponse([], true),
        flat: isLast
          ? recursiveResponse([])
          : recursiveResponse([{path: `level-${i + 1}`, type: 'tree', sha: `level-${i + 1}-sha`}])
      })
    }

    const octokit = buildOctokit(trees)

    const files = await listFiles(octokit, 'commit-sha')

    const expectedPath = `${Array.from({length: depth}, (_, i) => `level-${i}`).join('/')}/leaf.ts`
    expect(files).toEqual([expectedPath])
  })
})
