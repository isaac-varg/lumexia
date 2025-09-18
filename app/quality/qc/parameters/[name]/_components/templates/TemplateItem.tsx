import { TbTrash } from "react-icons/tb"
import { ParameterTemplate } from "../../_actions/getParameterTemplates"

const TemplateItem = ({ template }: { template: ParameterTemplate }) => {

  return (
    <div className="px-4 py-2 bg-secondary/30 rounded-xl text-xl font-medium">
      <div>{template.template.name}</div>

      <button className="btn btn-outline btn-error">{<TbTrash className="size-4" />}</button>
    </div>
  )
}

export default TemplateItem
