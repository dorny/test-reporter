export function parseAttribute(str: string | undefined): string | number | undefined {
  if (str === '' || str === undefined) {
    return str
  }

  const num = parseFloat(str)
  if (isNaN(num)) {
    return str
  }

  return num
}
