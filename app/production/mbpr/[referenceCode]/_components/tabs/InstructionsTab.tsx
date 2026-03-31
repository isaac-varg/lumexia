import { useMbprDetailsSelection } from "@/store/mbprDetailsSlice"
import WorkInstructionsPanel from "../WorkInstructionsPanel"

const InstructionsTab = () => {
  const { mbpr } = useMbprDetailsSelection()

  if (!mbpr) return null

  return <WorkInstructionsPanel steps={mbpr.BatchStep} />
}

export default InstructionsTab
