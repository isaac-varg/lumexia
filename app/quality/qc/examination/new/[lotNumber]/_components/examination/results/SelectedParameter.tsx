import Card from "@/components/Card"
import SectionTitle from "@/components/Text/SectionTitle"
import { useQcExaminationActions, useQcExaminationSelection } from "@/store/qcExaminationSlice"
import { useEffect } from "react"
import ParameterInput from "./ParameterInput"

const SelectedParameter = () => {

  const { selectedItemParameter, itemParameters } = useQcExaminationSelection()
  const { setSelectedItemParameter } = useQcExaminationActions()

  useEffect(() => {
    if (!selectedItemParameter && itemParameters.length > 0) {
      setSelectedItemParameter(itemParameters[0])
    }
  }, [selectedItemParameter, setSelectedItemParameter])

  return (
    <div className="flex flex-col gap-6 col-span-2">
      <SectionTitle>{selectedItemParameter?.parameter.name || 'Please select a parameter'}</SectionTitle>

      <div className="flex flex-col gap-6">

        <Card.Root>
          <SectionTitle size="small">Specification</SectionTitle>

          {selectedItemParameter?.specifications.length === 0 && <p className="font-medium text-xl text-base-content font-poppins">A specification has not yet been set for this product.</p>}

        </Card.Root>

        <Card.Root>

          <SectionTitle size="small">Values</SectionTitle>


          <ParameterInput />


        </Card.Root>

      </div>

    </div>
  )
}

export default SelectedParameter
