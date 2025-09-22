'use client'
import { qualityActions } from "@/actions/quality"
import { QcParameterGroup } from "@/actions/quality/qc/groups/getAll"
import { QcTemplateParameter } from "@/actions/quality/qc/templates/getAll"
import { useRouter } from "next/navigation"
import { TbTrash } from "react-icons/tb"

const ParameterCard = ({ parameter }: { parameter: QcParameterGroup['parameters'][number] }) => {

  const router = useRouter()
  const handleDelete = async () => {
    await qualityActions.qc.groups.groupParameters.delete(parameter.id);
    router.refresh()
  }

  return (
    <div className="bg-base-300/80 rounded-xl p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="text-md text-base-content font-medium">{parameter.parameter.name}</div>
        <button onClick={handleDelete} className="btn btn-error btn-outline"><TbTrash className="size-4" /></button>
      </div>
    </div>
  )
}

export default ParameterCard
