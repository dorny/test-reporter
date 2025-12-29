// Types for Open Test Reporting format (https://github.com/ota4j-team/open-test-reporting)
// Supports both hierarchical and event-based XML formats (version 0.2.0)

// ============================================================================
// Shared Core Types
// ============================================================================

export type OtrStatus = 'SUCCESSFUL' | 'SKIPPED' | 'ABORTED' | 'FAILED' | 'ERRORED'

export interface OtrResult {
  $?: {
    status?: OtrStatus
  }
  reason?: string[]
}

export interface OtrFilePosition {
  $: {
    line: string
    column?: string
  }
}

export interface OtrFileSource {
  $: {
    path: string
  }
  filePosition?: OtrFilePosition[]
}

export interface OtrDirectorySource {
  $: {
    path: string
  }
}

export interface OtrSources {
  directorySource?: OtrDirectorySource[]
  fileSource?: OtrFileSource[]
}

export interface OtrDataEntry {
  _: string
  $: {
    key: string
  }
}

export interface OtrData {
  $: {
    time: string
  }
  entry?: OtrDataEntry[]
}

export interface OtrFile {
  $: {
    time: string
    path: string
    mediaType?: string
  }
}

export interface OtrOutput {
  _: string
  $: {
    time: string
    source: string
  }
}

export interface OtrAttachments {
  data?: OtrData[]
  file?: OtrFile[]
  output?: OtrOutput[]
}

export interface OtrTags {
  tag?: string[]
}

export interface OtrMetadata {
  tags?: OtrTags[]
}

export interface OtrInfrastructure {
  hostName?: string[]
  userName?: string[]
  operatingSystem?: string[]
  cpuCores?: string[]
}

// ============================================================================
// Hierarchical Format Types
// ============================================================================

export interface OtrHierarchyNode {
  $: {
    name: string
    start: string // ISO 8601 datetime
    duration?: string // ISO 8601 duration (e.g., "PT0.013404S")
  }
  result?: OtrResult[]
  metadata?: OtrMetadata[]
  sources?: OtrSources[]
  attachments?: OtrAttachments[]
  child?: OtrHierarchyNode[]
}

export interface OtrHierarchyExecution {
  $?: Record<string, string>
  infrastructure?: OtrInfrastructure[]
  root?: OtrHierarchyNode[]
}

export interface OtrHierarchyDocument {
  execution: OtrHierarchyExecution
}

// ============================================================================
// Event-Based Format Types
// ============================================================================

export interface OtrStartedEvent {
  $: {
    id: string
    name: string
    time: string // ISO 8601 datetime
    parentId?: string
  }
  metadata?: OtrMetadata[]
  sources?: OtrSources[]
  attachments?: OtrAttachments[]
}

export interface OtrFinishedEvent {
  $: {
    id: string
    time: string // ISO 8601 datetime
  }
  result?: OtrResult[]
  metadata?: OtrMetadata[]
  sources?: OtrSources[]
  attachments?: OtrAttachments[]
}

export interface OtrReportedEvent {
  $: {
    id: string
    time: string // ISO 8601 datetime
  }
  result?: OtrResult[]
  metadata?: OtrMetadata[]
  sources?: OtrSources[]
  attachments?: OtrAttachments[]
}

export interface OtrEvents {
  $?: Record<string, string>
  infrastructure?: OtrInfrastructure[]
  started?: OtrStartedEvent[]
  finished?: OtrFinishedEvent[]
  reported?: OtrReportedEvent[]
}

export interface OtrEventsDocument {
  events: OtrEvents
}

// ============================================================================
// Union type for parsed XML document
// ============================================================================

export type OtrDocument = OtrHierarchyDocument | OtrEventsDocument
