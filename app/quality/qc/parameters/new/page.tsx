import { qualityActions } from "@/actions/quality"
import PageBreadcrumbs from "@/components/App/PageBreadcrumbs"
import ParameterWizard from "./_components/ParameterWizard"
import PageTitle from "@/components/Text/PageTitle"
import ManualEntry from "./_components/ManualEntry"

const NewParametersPage = async () => {

  const dataTypes = await qualityActions.qc.dataTypes.getAll();

  return (
    <div className='flex flex-col gap-y-6'>
      <PageTitle>New Parameter</PageTitle>

      <ManualEntry dataTypes={dataTypes} />

    </div>

  )
}

export default NewParametersPage 
