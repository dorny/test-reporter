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
  const headerRow = `| ${headers.join(' | ')} |`
  const alignRow = `| ${align.join(' | ')} |`
  const contentRows = rows.map(row => `| ${row.join(' | ')} |`).join('\n')
  return [headerRow, alignRow, contentRows].join('\n')
}

export function exceptionCell(ex: string): string {
  const lines = ex.split(/\r?\n/)
  if (lines.length === 0) {
    return ''
  }

  const summary = tableEscape(lines.shift()?.trim() || '')
  const emptyLine = /^\s*$/
  const firstNonEmptyLine = lines.findIndex(l => !emptyLine.test(l))

  if (firstNonEmptyLine === -1) {
    return summary
  }

  const contentLines = firstNonEmptyLine > 0 ? lines.slice(firstNonEmptyLine) : lines

  const content = '<pre>' + tableEscape(contentLines.join('<br>')) + '</pre>'
  return details(summary, content)
}

export function tableEscape(content: string): string {
  return content.replace('|', '\\|')
}
