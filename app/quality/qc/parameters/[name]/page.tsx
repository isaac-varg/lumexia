import { qualityActions } from "@/actions/quality"
import StateSetter from "./_components/state/StateSetter"
import PageTitle from "@/components/Text/PageTitle"
import Basics from "./_components/basics/Basics"
import InputDefinitions from "./_components/inputDefinitions/InputDefinitions"

type Props = {
  searchParams: {
    id: string
  }
}

const ParameterPage = async ({ searchParams }: Props) => {

  const parameter = await qualityActions.qc.parameters.getOne(searchParams.id);
  const [inputDefinitions] = await Promise.all([
    await qualityActions.qc.inputDefinitions.getAll(parameter.id),
  ])



  return (
    <div className="flex flex-col gap-6">
      <PageTitle>{parameter.name} Parameter Configuration</PageTitle>
      <StateSetter
        inputDefinitions={inputDefinitions}
        parameter={parameter}

      />

      <div className="grid grid-cols-2 gap-6">

        <Basics />
        <div>hey</div>
        <InputDefinitions />
      </div>

    </div>
  )
}

export default ParameterPage
