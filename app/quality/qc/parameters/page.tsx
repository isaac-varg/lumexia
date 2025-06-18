import { qualityActions } from "@/actions/quality"
import PageBreadcrumbs from "@/components/App/PageBreadcrumbs"
import ParameterTable from "./_components/ParameterTable";
import TemplateTable from "./_components/TemplateTable";
import GroupsTable from "./_components/GroupsTable";

const ParametersPage = async () => {

    const parameters = await qualityActions.qc.parameters.getAll();
    const templates = await qualityActions.qc.templates.getAll();
    const groups = await qualityActions.qc.groups.getAll();
    const examinationTypes = await qualityActions.qc.examinationTypes.getAll();


    return (
        <div className='flex flex-col gap-y-6'>
            <PageBreadcrumbs />



            <ParameterTable parameters={parameters} templates={templates} groups={groups} />

            <GroupsTable groups={groups} examinationTypes={examinationTypes} />

            <TemplateTable templates={templates} />




        </div>

    )
}

export default ParametersPage 
