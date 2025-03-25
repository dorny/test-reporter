// Returns HTML element id and href link usable as manual anchor links
// This is needed because Github in check run summary doesn't automatically
// create links out of headings as it normally does for other markdown content
import {ReportOptions} from '../report/get-report'

export function slug(name: string, options: ReportOptions): {id: string; link: string} {
  const slugId = name
    .trim()
    .replace(/_/g, '')
    .replace(/[./\\]/g, '-')
    .replace(/[^\w-]/g, '')

  const id = `user-content-${slugId}`
  // When using the Action Summary for display, links must include the "user-content-" prefix.
  const link = options.useActionsSummary ? `#${id}` : `#${slugId}`
  return {id, link}
}
