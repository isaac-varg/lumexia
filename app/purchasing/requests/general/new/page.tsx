import PageWrapper from "@/components/App/PageWrapper"
import RequestMain from "./_components/RequestMain"
import { getAllGeneralRequestNotes } from "./_actions/getAllGeneralRequestNotes"
import { getAllGeneralRequestNoteTypes } from "./_actions/getAllGeneralRequestNoteTypes";
import { createGeneralRequest } from "./_actions/createGeneralRequest";

const GeneralRequestNewPage = async () => {

    const noteTypes = await getAllGeneralRequestNoteTypes();
    const request = await createGeneralRequest();
    const notes = await getAllGeneralRequestNotes(request.id);

    return (
        <PageWrapper pageTitle='New General Request'>


            <RequestMain notes={notes} noteTypes={noteTypes} requestId={request.id} />




        </PageWrapper >
    )
}

export default GeneralRequestNewPage
