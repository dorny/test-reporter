import {RestEndpointMethodTypes} from '@octokit/plugin-rest-endpoint-methods'
import {Annotation} from './get-annotations'

export type UpdateChecksParametersWithOutput = RestEndpointMethodTypes['checks']['update']['parameters'] & {
  output: {title: string; summary: string; annotations: Annotation[]}
}
