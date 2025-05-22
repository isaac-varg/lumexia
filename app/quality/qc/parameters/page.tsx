import { qualityActions } from "@/actions/quality"
import PageBreadcrumbs from "@/components/App/PageBreadcrumbs"
import ParameterTable from "./_components/ParameterTable";

const ParametersPage = async () => {

    const parameters = await qualityActions.qc.parameters.getAll();

    return (
        <div className='flex flex-col gap-y-6'>
            <PageBreadcrumbs />


            <ParameterTable parameters={parameters} />


        </div>

    )
}

export default ParametersPage 
