export interface LcovReport {
  [str: string]: {
    path: string
    statementMap: unknown
    fnMap: unknown
    branchMap: unknown
    s: CovStats
    f: CovStats
    b: CovStats
  }
}

export interface CovStats {
  [str: string]: number
}

export interface CovParsedStat {
  max: number
  nonCovered: number
  percentage: number
}
