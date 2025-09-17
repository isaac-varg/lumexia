import { qualityActions } from "@/actions/quality"
import StateSetter from "./_components/state/StateSetter"
import PageTitle from "@/components/Text/PageTitle"
import Basics from "./_components/basics/Basics"

type Props = {
  searchParams: {
    id: string
  }
}

const ParameterPage = async ({ searchParams }: Props) => {

  const parameter = await qualityActions.qc.parameters.getOne(searchParams.id);



  return (
    <div className="flex flex-col gap-6">
      <PageTitle>{parameter.name} Parameter Configuration</PageTitle>
      <StateSetter
        parameter={parameter}
      />

      <div className="grid grid-cols-2 gap-6">

        <Basics />
      </div>

    </div>
  )
}

export default ParameterPage
