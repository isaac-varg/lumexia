import { accountingActions } from "@/actions/accounting";
import PageWrapper from "@/components/App/PageWrapper";
import { Panels } from "@/components/Panels";
import SectionTitle from "@/components/Text/SectionTitle";
import CreditCard, { CreditCardTypes } from "@/components/UI/CreditCard";
import AddNewButton from "./_components/AddNewButton";
import BankTransfer from "@/components/UI/BankTransfer";
import BankCheck from "@/components/UI/BankCheck";

const PaymentsPage = async () => {

    const methods = await accountingActions.paymentMethods.getAll();

    return (
        <PageWrapper pageTitle={'Payments'}>

            <Panels.Root>
                <SectionTitle size="small">Payment Methods</SectionTitle>


                <div className="grid grid-cols-4 gap-8">


                    <AddNewButton />

                    {methods.map(method => {

                        const type = method.paymentType;

                        if (type === 'visa' || type === 'mastercard' || type === 'amex') {
                            return (
                                <CreditCard
                                    key={method.id}
                                    cardName={method.methodName}
                                    nameOnCard={method.associatedName}
                                    endingIn={method.accountEndingIn || ''}
                                    expiry={method.expiry || ''}
                                    type={method.paymentType as CreditCardTypes}
                                    bgColorA={method.bgColorA} bgColorB={method.bgColorB}
                                    circleColorA={method.circleColorA || ''} circleColorB={method.circleColorB || ''}
                                />
                            )
                        }

                        if (type === 'bankTransfer') {

                            return (
                                <div className="flex items-center justify-center">
                                    <BankTransfer
                                        key={method.id}
                                        methodName={method.methodName}
                                        bgColorA={method.bgColorA} bgColorB={method.bgColorB}
                                        circleColorA={method.circleColorA || ''} circleColorB={method.circleColorB || ''}
                                    />
                                </div>
                            )
                        }

                        if (type === 'check') {
                            return (
                                <div className="flex items-center justify-center col-span-2">
                                    <BankCheck
                                        methodName={method.methodName}
                                        nameOnAccount={method.associatedName}
                                        endingIn={method.accountEndingIn || ''}
                                        bgColorA={method.bgColorA} bgColorB={method.bgColorB}
                                        circleColorA={method.circleColorA || ''} circleColorB={method.circleColorB || ''}

                                    />
                                </div>
                            )
                        }

                    })}
                </div>

            </Panels.Root>


        </PageWrapper>
    )
}

export default PaymentsPage;
