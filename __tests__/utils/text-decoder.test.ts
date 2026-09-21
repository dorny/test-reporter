import {decodeReportBytes} from '../../src/utils/text-decoder.js'

function withBom(bom: number[], content: Uint8Array): Uint8Array {
  return Uint8Array.from([...bom, ...content])
}

function encodeUtf16BE(value: string): Uint8Array {
  const littleEndian = Buffer.from(value, 'utf16le')
  const bigEndian = Buffer.alloc(littleEndian.length)
  for (let index = 0; index < littleEndian.length; index += 2) {
    bigEndian[index] = littleEndian[index + 1]
    bigEndian[index + 1] = littleEndian[index]
  }
  return bigEndian
}

function encodeUtf32(value: string, littleEndian: boolean): Uint8Array {
  const bytes = Buffer.alloc([...value].length * 4)
  let offset = 0
  for (const character of value) {
    const codePoint = character.codePointAt(0) as number
    if (littleEndian) bytes.writeUInt32LE(codePoint, offset)
    else bytes.writeUInt32BE(codePoint, offset)
    offset += 4
  }
  return bytes
}

describe('decodeReportBytes', () => {
  const json = '{"message":"Hello 😀"}'

  it.each([
    ['UTF-8 without BOM', new TextEncoder().encode(json)],
    ['UTF-8 with BOM', withBom([0xef, 0xbb, 0xbf], new TextEncoder().encode(json))],
    ['UTF-16LE with BOM', withBom([0xff, 0xfe], Buffer.from(json, 'utf16le'))],
    ['UTF-16BE with BOM', withBom([0xfe, 0xff], encodeUtf16BE(json))],
    ['UTF-32LE with BOM', withBom([0xff, 0xfe, 0x00, 0x00], encodeUtf32(json, true))],
    ['UTF-32BE with BOM', withBom([0x00, 0x00, 0xfe, 0xff], encodeUtf32(json, false))]
  ])('%s', (_name, bytes) => {
    const decoded = decodeReportBytes('report.json', bytes)
    expect(JSON.parse(decoded)).toStrictEqual({message: 'Hello 😀'})
  })

  it('rejects invalid UTF-8 instead of replacing bytes', () => {
    expect(() => decodeReportBytes('report.json', Uint8Array.from([0xc3, 0x28]))).toThrow(
      "Unable to decode report 'report.json' as UTF-8"
    )
  })

  it('rejects invalid UTF-32 code points', () => {
    const bytes = withBom([0xff, 0xfe, 0x00, 0x00], Uint8Array.from([0x00, 0x00, 0x11, 0x00]))
    expect(() => decodeReportBytes('report.json', bytes)).toThrow("Unable to decode report 'report.json' as UTF-32LE")
  })
})
