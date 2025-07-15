import PageWrapper from "@/components/App/PageWrapper"
import PaymentMethodWizard from "./_component/PaymentMethodWizard"
import { accountingActions } from "@/actions/accounting"

type Props = {
    searchParams: {
        id: string
    }
}

const PaymentMethodCreatePage = async ({ searchParams }: Props) => {

    const id = searchParams.id;
    const existingMethod = id ? await accountingActions.paymentMethods.getOne(id) : null;

    return (
        <PageWrapper pageTitle={'Create Payment Method'}>

            <PaymentMethodWizard existingMethod={existingMethod} />

        </PageWrapper>
    )
}

export default PaymentMethodCreatePage
