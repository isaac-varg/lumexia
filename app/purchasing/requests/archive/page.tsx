import { purchasingActions } from "@/actions/purchasing"
import PageBreadcrumbs from "@/components/App/PageBreadcrumbs"
import PageTitle from "@/components/Text/PageTitle"
import Datatable from "./_components/Datatable";
import { getAllGeneralRequests } from "../general/_actions/getAllGeneralRequests";

const RequestArchivePage = async () => {

    const requests = await purchasingActions.requests.getAll();
    const generalRequests = await getAllGeneralRequests(true);




    return (
        <div>
            <div>
                <PageTitle>Request Archive</PageTitle>
                <PageBreadcrumbs />
            </div>

            <Datatable requests={requests} generalRequests={generalRequests} />

        </div>
    )
}

export default RequestArchivePage
