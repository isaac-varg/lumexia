import { QcTemplateParameter } from "@/actions/quality/qc/templates/getAll"
import { TbTrash } from "react-icons/tb"

const ParameterCard = ({ parameter }: { parameter: QcTemplateParameter }) => {
  return (
    <div className="bg-base-300/80 rounded-xl p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="text-md text-base-content font-medium">{parameter.parameter.name}</div>
        <button className="btn btn-error btn-outline"><TbTrash className="size-4" /></button>
      </div>
    </div>
  )
}

export default ParameterCard
