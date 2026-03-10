export interface BatchStep {
  id: string
  mbprId: string
  sequence: number
  phase: string
  label: string
  recordStatusId: string
  createdAt: Date
  updatedAt: Date
}
