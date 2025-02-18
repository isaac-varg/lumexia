import { purchasingActions } from "@/actions/purchasing"
import PageBreadcrumbs from "@/components/App/PageBreadcrumbs"
import PageTitle from "@/components/Text/PageTitle"
import Datatable from "./_components/Datatable";

const RequestArchivePage = async () => {

    const requests = await purchasingActions.requests.getAll();




    return (
        <div>
            <div>
                <PageTitle>Request Archive</PageTitle>
                <PageBreadcrumbs />
            </div>

            <Datatable requests={requests} />

        </div>
    )
}

export default RequestArchivePage
