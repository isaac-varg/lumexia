import SectionTitle from "@/components/Text/SectionTitle"
import { useQcExaminationSelection } from "@/store/qcExaminationSlice"

const Results = () => {
  const { itemParameters } = useQcExaminationSelection()

  return (
    <div className="grid grid-cols-2 gap-6">
    </div>
  )
}

export default Results
