export enum Align {
  Left = ':---',
  Center = ':---:',
  Right = '---:',
  None = '---'
}

export const Icon = {
  skip: '⚪', // ':white_circle:'
  success: '✅', // ':white_check_mark:'
  fail: '❌', // ':x:'
  flaky: '🔁' // ':repeat:'
}

export function link(title: string, address: string): string {
  return `[${title}](${address})`
}

type ToString = string | number | boolean | Date
export function table(headers: ToString[], align: ToString[], ...rows: ToString[][]): string {
  const headerRow = `|${headers.map(tableEscape).join('|')}|`
  const alignRow = `|${align.join('|')}|`
  const contentRows = rows.map(row => `|${row.map(tableEscape).join('|')}|`).join('\n')
  return [headerRow, alignRow, contentRows].join('\n')
}

export function tableEscape(content: ToString): string {
  return content.toString().replace('|', '\\|')
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

// A suite's time is the sum of its test cases', which on a framework that runs
// them concurrently can run to hours. Printed as seconds that reads as a mistake
// rather than as accumulated time.
export function formatTime(ms: number): string {
  if (ms < 1000) {
    return `${Math.round(ms)}ms`
  }

  const seconds = Math.round(ms / 1000)
  if (seconds < 60) {
    return `${seconds}s`
  }

  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) {
    const remainingSeconds = seconds % 60
    return remainingSeconds > 0 ? `${minutes}m ${remainingSeconds}s` : `${minutes}m`
  }

  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`
}
