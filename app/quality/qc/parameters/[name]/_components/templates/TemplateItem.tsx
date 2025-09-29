import { TbTrash } from "react-icons/tb"
import { ParameterTemplate } from "../../_actions/getParameterTemplates"
import { qualityActions } from "@/actions/quality"
import { useRouter } from "next/navigation"

const TemplateItem = ({ template }: { template: ParameterTemplate }) => {

  const router = useRouter()
  const handleDelete = async () => {
    await qualityActions.qc.templateParameters.delete(template.id);
    router.refresh()
  }

  return (
    <div className="px-4 py-2 bg-secondary/30 rounded-xl text-xl font-medium flex justify-between items-center">
      <div>{template.template.name}</div>

      <button onClick={handleDelete} className="btn btn-ghost btn-error">{<TbTrash className="size-4" />}</button>
    </div>
  )
}

export default TemplateItem
