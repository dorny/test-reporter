export enum Align {
  Left = ':---',
  Center = ':---:',
  Right = '---:',
  None = '---'
}

export const Icon = {
  skip: '✖️', // ':heavy_multiplication_x:'
  success: '✔️', // ':heavy_check_mark:'
  fail: '❌' // ':x:'
}

export function details(summary: string, content: string): string {
  return `<details><summary>${summary}</summary>${content}</details>`
}

export function link(title: string, address: string): string {
  return `[${title}](${address})`
}

type ToString = string | number | boolean | Date
export function table(headers: ToString[], align: ToString[], ...rows: ToString[][]): string {
  const headerRow = `| ${headers.map(tableEscape).join(' | ')} |`
  const alignRow = `| ${align.join(' | ')} |`
  const contentRows = rows.map(row => `| ${row.map(tableEscape).join(' | ')} |`).join('\n')
  return [headerRow, alignRow, contentRows].join('\n')
}

export function tableEscape(content: ToString): string {
  return content.toString().replace('|', '\\|')
}
