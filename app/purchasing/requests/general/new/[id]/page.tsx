import PageWrapper from "@/components/App/PageWrapper"
import RequestMain from "../../_components/RequestMain"
import { getAllGeneralRequestNotes } from "../../_actions/getAllGeneralRequestNotes"
import { getAllGeneralRequestNoteTypes } from "../../_actions/getAllGeneralRequestNoteTypes";

type GeneralRequestNewIdPageProps = {
    params: {
        id: string;
    }
}

const GeneralRequestNewIdPage = async ({ params }: GeneralRequestNewIdPageProps) => {

    const noteTypes = await getAllGeneralRequestNoteTypes();
    const notes = await getAllGeneralRequestNotes(params.id);

    return (
        <PageWrapper pageTitle='New General Request'>
            <RequestMain notes={notes} noteTypes={noteTypes} requestId={params.id} />
        </PageWrapper >
    )
}

export default GeneralRequestNewIdPage;
