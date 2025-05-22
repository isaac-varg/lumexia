import { qualityActions } from "@/actions/quality"
import PageBreadcrumbs from "@/components/App/PageBreadcrumbs"
import ParameterWizard from "./_components/ParameterWizard"

const NewParametersPage = async () => {


    return (
        <div className='flex flex-col gap-y-6'>
            <PageBreadcrumbs />


            <ParameterWizard />




        </div>

    )
}

export default NewParametersPage 
