export enum Align {
  Left = ':---',
  Center = ':---:',
  Right = '---:',
  None = '---'
}

export const Icon = {
  skip: '⚪', // ':white_circle:'
  success: '✅', // ':white_check_mark:'
  fail: '❌' // ':x:'
}

export function link(title: string, address: string): string {
  return `[${title}](${address})`
}

type ToString = string | number | boolean | Date
export function table(headers: ToString[], align: ToString[], ...rows: ToString[][]): string {
  return tableFromRows(headers, align, rows)
}

// Takes the rows as an array rather than as rest arguments. A table with more rows than the maximum
// argument count cannot be built with `table`, because spreading them makes each row an argument.
export function tableFromRows(headers: ToString[], align: ToString[], rows: ToString[][]): string {
  const headerRow = `|${headers.map(tableEscape).join('|')}|`
  const alignRow = `|${align.join('|')}|`
  const contentRows = rows.map(row => `|${row.map(tableEscape).join('|')}|`).join('\n')
  return [headerRow, alignRow, contentRows].join('\n')
}

export function tableEscape(content: ToString): string {
  return content.toString().replace(/\|/g, '\\|')
}

export function fixEol(text?: string): string {
  return text?.replace(/\r/g, '') ?? ''
}

export function ellipsis(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text
  }

  return text.substring(0, maxLength - 3) + '...'
}

export function formatTime(ms: number): string {
  if (ms > 1000) {
    return `${Math.round(ms / 1000)}s`
  }

  return `${Math.round(ms)}ms`
}
