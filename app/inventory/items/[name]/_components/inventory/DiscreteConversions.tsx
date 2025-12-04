import Card from "@/components/Card"
import SectionTitle from "@/components/Text/SectionTitle"
import ConversionTable from "./ConversionTable"
import { useState } from "react"
import ConversionForm from "./ConversionForm"
import { DiscreteConversion } from "@/actions/inventory/items/discreteConversions/getAll"
import { TbPlus } from "react-icons/tb"

const DiscreteConversions = () => {


  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [selected, setSelected] = useState<DiscreteConversion | null>(null);

  return (
    <div className="h-full">
      <div className="flex flex-col gap-y-6 h-full">
        <div className="flex justify-between items-center">
          <SectionTitle>{'Discrete Conversions'}</SectionTitle>

          <button className="btn btn-primary" onClick={() => {
            setIsEdit(true);
            setSelected(null);
          }}>
            <TbPlus className="size-4" />
          </button>
        </div>

        <Card.Root>
          {!isEdit && (
            <ConversionTable setIsEdit={setIsEdit} setSelected={setSelected} />
          )}

          {isEdit && (
            <ConversionForm selected={selected} setSelected={setSelected} setIsEdit={setIsEdit} />
          )}

        </Card.Root>
      </div>
    </div>

  )
}

export default DiscreteConversions
