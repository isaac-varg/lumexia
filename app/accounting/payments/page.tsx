import { accountingActions } from "@/actions/accounting";
import PageWrapper from "@/components/App/PageWrapper";
import { Panels } from "@/components/Panels";
import SectionTitle from "@/components/Text/SectionTitle";
import AddNewButton from "./_components/AddNewButton";
import PaymentMethodDisplay from "@/components/UI/PaymentMethodDisplay";
import MethodsDisplay from "./_components/MethodsDisplay";

const PaymentsPage = async () => {

    const methods = await accountingActions.paymentMethods.getAll();

    return (
        <PageWrapper pageTitle={'Payments'}>

            <Panels.Root>
                <SectionTitle size="small">Payment Methods</SectionTitle>


                <MethodsDisplay methods={methods} />  

            </Panels.Root>


        </PageWrapper>
    )
}

export default PaymentsPage;
