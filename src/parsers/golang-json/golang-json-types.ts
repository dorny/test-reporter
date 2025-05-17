export type GoTestAction = 'start'
  | 'run'
  | 'pause'
  | 'cont'
  | 'pass'
  | 'bench'
  | 'fail'
  | 'output'
  | 'skip'

export type GoTestEvent = {
  Time: string
  Action: GoTestAction
  Package: string
  Test?: string
  Elapsed?: number
  Output?: string
  FailedBuild?: string
}
