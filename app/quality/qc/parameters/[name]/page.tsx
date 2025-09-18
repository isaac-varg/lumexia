import { qualityActions } from "@/actions/quality"
import StateSetter from "./_components/state/StateSetter"
import PageTitle from "@/components/Text/PageTitle"
import Basics from "./_components/basics/Basics"
import InputDefinitions from "./_components/inputDefinitions/InputDefinitions"
import { getParameterGroups } from "./_actions/getParameterGroups"
import { getParameterTemplates } from "./_actions/getParameterTemplates"
import Groups from "./_components/groups/Groups"
import Templates from "./_components/templates/Templates"

type Props = {
  searchParams: {
    id: string
  }
}

const ParameterPage = async ({ searchParams }: Props) => {

  const parameter = await qualityActions.qc.parameters.getOne(searchParams.id);
  const [inputDefinitions, parameterGroups, parameterTemplates] = await Promise.all([
    await qualityActions.qc.inputDefinitions.getAll(parameter.id),
    await getParameterGroups(parameter.id),
    await getParameterTemplates(parameter.id),
  ]);



  return (
    <div className="flex flex-col gap-6">
      <PageTitle>{parameter.name} Parameter Configuration</PageTitle>
      <StateSetter
        inputDefinitions={inputDefinitions}
        parameter={parameter}
        parameterGroups={parameterGroups}
        parameterTemplates={parameterTemplates}


      />

      <div className="grid grid-cols-3 gap-6">

        <Basics />
        <Groups />
        <Templates />
        <InputDefinitions />
      </div>

    </div>
  )
}

export default ParameterPage
