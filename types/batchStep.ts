export interface BatchStep {
  id: string
  mbprId: string
  sequence: number
  phase: string
  label: string
  createdAt: Date
  updatedAt: Date
}
