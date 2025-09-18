import { qualityActions } from "@/actions/quality"
import PageTitle from "@/components/Text/PageTitle"
import Form from "./_components/Form"
import Parameters from "./_components/Parameters"

type Props = {
  searchParams: {
    id: string
  }
}
const TemplatePage = async ({ searchParams }: Props) => {

  const template = await qualityActions.qc.templates.getOne(searchParams.id)

  return (
    <div className="flex flex-col gap-6">
      <PageTitle>{template.name} Template</PageTitle>

      <Form template={template} />

      <Parameters template={template} />



    </div>

  )
}

export default TemplatePage
