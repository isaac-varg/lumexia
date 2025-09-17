'use client'
import Card from "@/components/Card"
import SectionTitle from "@/components/Text/SectionTitle"
import { useQcParameterSelection } from "@/store/qcParametersSlice"
import InputDefCard from "./InputDefCard"
import { qualityActions } from "@/actions/quality"
import { staticRecords } from "@/configs/staticRecords"
import { useRouter } from "next/navigation"

const InputDefinitions = () => {

  const { parameterInputDefinitions, selectedParameter } = useQcParameterSelection()
  const router = useRouter()

  const handleInputDefAdd = async () => {
    if (!selectedParameter) {
      throw new Error("Cannot create input definition if parameter not selected.")
    }

    await qualityActions.qc.inputDefinitions.create({
      parameterId: selectedParameter.id,
      name: '',
      label: '',
      dataTypeId: staticRecords.quality.dataTypes.text,
      unit: '',
      required: false,
    });

    router.refresh()
  }

  return (
    <div className="flex flex-col gap-4 col-span-2">
      <div className="flex items-center justify-between">
        <SectionTitle>Input Definitions</SectionTitle>

        <button className="btn btn-secondary" onClick={handleInputDefAdd}>Add Input Definition</button>

      </div>
      <Card.Root>
        <div className="grid grid-cols-3 gap-4">
          {parameterInputDefinitions.map(def => <InputDefCard key={def.id} inputDefinition={def} />)}


        </div>

        {parameterInputDefinitions.length === 0 && (

          <div className="grid grid-cols-3 gap-4">
            <div className="min-h-[400px] skeleton" />

            <div className="min-h-[400px] skeleton" />
          </div>
        )}
      </Card.Root>
    </div>

  )
}

export default InputDefinitions
