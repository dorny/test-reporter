import {TextDecoder} from 'node:util'

type BomEncoding = {
  name: string
  label: string
  size: number
}

const UTF8_BOM = [0xef, 0xbb, 0xbf]
const UTF16_LE_BOM = [0xff, 0xfe]
const UTF16_BE_BOM = [0xfe, 0xff]
const UTF32_LE_BOM = [0xff, 0xfe, 0x00, 0x00]
const UTF32_BE_BOM = [0x00, 0x00, 0xfe, 0xff]

function startsWith(bytes: Uint8Array, prefix: number[]): boolean {
  return prefix.every((value, index) => bytes[index] === value)
}

function detectBom(bytes: Uint8Array): BomEncoding {
  if (startsWith(bytes, UTF32_LE_BOM)) return {name: 'UTF-32LE', label: 'utf-32le', size: 4}
  if (startsWith(bytes, UTF32_BE_BOM)) return {name: 'UTF-32BE', label: 'utf-32be', size: 4}
  if (startsWith(bytes, UTF8_BOM)) return {name: 'UTF-8', label: 'utf-8', size: 3}
  if (startsWith(bytes, UTF16_LE_BOM)) return {name: 'UTF-16LE', label: 'utf-16le', size: 2}
  if (startsWith(bytes, UTF16_BE_BOM)) return {name: 'UTF-16BE', label: 'utf-16be', size: 2}
  return {name: 'UTF-8', label: 'utf-8', size: 0}
}

function readCodePoint(bytes: Uint8Array, offset: number, littleEndian: boolean): number {
  if (littleEndian) {
    return bytes[offset] + bytes[offset + 1] * 0x100 + bytes[offset + 2] * 0x10000 + bytes[offset + 3] * 0x1000000
  }
  return bytes[offset] * 0x1000000 + bytes[offset + 1] * 0x10000 + bytes[offset + 2] * 0x100 + bytes[offset + 3]
}

function decodeUtf32(bytes: Uint8Array, littleEndian: boolean): string {
  if (bytes.length % 4 !== 0) {
    throw new Error('byte length is not a multiple of four')
  }

  const chunks: string[] = []
  let chunk = ''
  for (let offset = 0; offset < bytes.length; offset += 4) {
    const codePoint = readCodePoint(bytes, offset, littleEndian)
    if (codePoint > 0x10ffff || (codePoint >= 0xd800 && codePoint <= 0xdfff)) {
      throw new Error(`invalid Unicode code point 0x${codePoint.toString(16)}`)
    }
    chunk += String.fromCodePoint(codePoint)
    if (chunk.length >= 4096) {
      chunks.push(chunk)
      chunk = ''
    }
  }
  if (chunk.length > 0) chunks.push(chunk)
  return chunks.join('')
}

/** Decode report bytes using an encoding BOM, or UTF-8 when no BOM exists. */
export function decodeReportBytes(file: string, bytes: Uint8Array): string {
  const encoding = detectBom(bytes)
  try {
    const content = bytes.subarray(encoding.size)
    if (encoding.label === 'utf-32le') return decodeUtf32(content, true)
    if (encoding.label === 'utf-32be') return decodeUtf32(content, false)
    return new TextDecoder(encoding.label, {fatal: true}).decode(content)
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    throw new Error(`Unable to decode report '${file}' as ${encoding.name}: ${message}`)
  }
}
