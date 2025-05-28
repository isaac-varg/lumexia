import { qualityActions } from "@/actions/quality"
import PageBreadcrumbs from "@/components/App/PageBreadcrumbs"
import ParameterTable from "./_components/ParameterTable";
import TemplateTable from "./_components/TemplateTable";

const ParametersPage = async () => {

    const parameters = await qualityActions.qc.parameters.getAll();
    const templates = await qualityActions.qc.templates.getAll();

    return (
        <div className='flex flex-col gap-y-6'>
            <PageBreadcrumbs />



            <ParameterTable parameters={parameters} />
            <TemplateTable templates={templates} />


        </div>

    )
}

export default ParametersPage 
