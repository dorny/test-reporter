import {getBasePath} from '../../src/utils/path-utils'

describe('getBasePath', () => {
  it('tracked file in path', () => {
    const path = 'C:/Users/Michal/Workspace/dorny/test-check/reports/jest/__tests__/main.test.js'
    const trackedFiles = ['__tests__/main.test.js', '__tests__/second.test.js', 'lib/main.js']

    const result = getBasePath(path, trackedFiles)

    expect(result).toBe('C:/Users/Michal/Workspace/dorny/test-check/reports/jest/')
  })

  // it('tracked file contains part of the path', () => {
  //   const path = 'mnt/extra-addons/product_changes/tests/first_test.py'
  //   const trackedFiles = ['addons/product_changes/tests/first_test.py']
  //
  //   const result = getBasePath(path, trackedFiles)
  //
  //   expect(result).toBe('addons/product_changes/tests/first_test.py')
  // })
})
