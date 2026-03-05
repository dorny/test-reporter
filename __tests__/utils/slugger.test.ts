import {DEFAULT_OPTIONS} from '../../src/report/get-report.js'
import {slug} from '../../src/utils/slugger.js'

describe('slugger', () => {
  it('adds prefix from report options to generated slug', () => {
    const result = slug('r0s1', {
      ...DEFAULT_OPTIONS,
      slugPrefix: 'prefix-'
    })

    expect(result).toEqual({
      id: 'user-content-prefix-r0s1',
      link: '#user-content-prefix-r0s1'
    })
  })

  it('sanitizes custom prefix using existing slug normalization', () => {
    const result = slug('r0', {
      ...DEFAULT_OPTIONS,
      slugPrefix: ' my /custom_prefix?.'
    })

    expect(result).toEqual({
      id: 'user-content-my-customprefix-r0',
      link: '#user-content-my-customprefix-r0'
    })
  })
})
