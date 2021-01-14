const isoDateRe = /^\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)$/

// matches dotnet duration: 00:00:00.0010000
const durationRe = /^(\d\d):(\d\d):(\d\d\.\d+)$/

export function parseAttribute(str: string | undefined): string | Date | number | undefined {
  if (str === '' || str === undefined) {
    return str
  }

  if (isoDateRe.test(str)) {
    return new Date(str)
  }

  const durationMatch = str.match(durationRe)
  if (durationMatch !== null) {
    const [_, hourStr, minStr, secStr] = durationMatch
    return (parseInt(hourStr) * 3600 + parseInt(minStr) * 60 + parseFloat(secStr)) * 1000
  }

  const num = parseFloat(str)
  if (isNaN(num)) {
    return str
  }

  return num
}
