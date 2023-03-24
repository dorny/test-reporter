import {getBasePath} from '../../src/utils/path-utils'

describe('getBasePath', () => {
  it('tracked file in path', () => {
    const path = 'C:/Users/Michal/Workspace/dorny/test-check/reports/jest/__tests__/main.test.js'
    const trackedFiles = ['__tests__/main.test.js', '__tests__/second.test.js', 'lib/main.js']

    const result = getBasePath(path, trackedFiles)

    expect(result).toBe('C:/Users/Michal/Workspace/dorny/test-check/reports/jest/')
  })
})
