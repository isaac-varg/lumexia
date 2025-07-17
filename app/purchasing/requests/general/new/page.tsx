import { createGeneralRequest } from "../_actions/createGeneralRequest";
import { redirect } from 'next/navigation';

const GeneralRequestNewPage = async () => {

    const request = await createGeneralRequest();
    redirect(`/purchasing/requests/general/new/${request.id}`)

}

export default GeneralRequestNewPage
