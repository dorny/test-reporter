import {formatTime} from '../../src/utils/markdown-utils'

describe('formatTime', () => {
  it.each([
    [0, '0ms'],
    [1, '1ms'],
    [999, '999ms'],
    [1000, '1s'],
    [1499, '1s'],
    [59_400, '59s'],
    [60_000, '1m'],
    [63_000, '1m 3s'],
    [3_540_000, '59m'],
    [3_600_000, '1h'],
    [22_293_000, '6h 11m'],
    [86_400_000, '24h']
  ])('formats %ims as %s', (ms, expected) => {
    expect(formatTime(ms)).toBe(expected)
  })

  it('drops a zero remainder rather than printing it', () => {
    expect(formatTime(120_000)).toBe('2m')
    expect(formatTime(7_200_000)).toBe('2h')
  })
})
