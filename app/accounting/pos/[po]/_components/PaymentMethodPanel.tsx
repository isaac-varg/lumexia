'use client'
import { accountingActions } from "@/actions/accounting"
import { PaymentMethod } from "@/actions/accounting/paymentMethods/getAll"
import { getUserId } from "@/actions/users/getUserId"
import Dialog from "@/components/Dialog"
import { Panels } from "@/components/Panels"
import SectionTitle from "@/components/Text/SectionTitle"
import PaymentMethodDisplay from "@/components/UI/PaymentMethodDisplay"
import useDialog from "@/hooks/useDialog"
import { useRouter } from "next/navigation"
import { createAccountingAuditLog } from "../../_actions/createAccountingAuditLog"

const PaymentMethodPanel = ({ paymentMethod, allMethods, accountingDetailId, poId }: { paymentMethod: PaymentMethod | null | undefined, allMethods: PaymentMethod[], accountingDetailId: string | null | undefined, poId: string }) => {

    const { showDialog } = useDialog()

    if (!accountingDetailId) return false

    return (
        <Panels.Root>

            <ChooseMethod methods={allMethods} accountingDetailId={accountingDetailId} poId={poId} />
            <SectionTitle size="small">Payment Method</SectionTitle>


            <div>
                {paymentMethod && (
                    <div className="flex flex-col gap-y-2 items-center justify-center">
                        <PaymentMethodDisplay method={paymentMethod} onClick={() => showDialog('choosePaymentMethod')} />
                        <p className="text-sm font-poppins tracking-wide">Change method by clicking above</p>
                    </div>
                )}

                {!paymentMethod && (
                    <div onClick={() => showDialog('choosePaymentMethod')} className="bg-neutral-200 hover:bg-neutral-300 hover:cursor-pointer rounded-xl p-8 flex items-center justify-center">

                        <p className="font-poppins text-lg font-semibold">None Choosen</p>
                    </div>
                )}
            </div>

        </Panels.Root>
    )
}


const ChooseMethod = ({ methods, accountingDetailId, poId }: { methods: PaymentMethod[], accountingDetailId: string, poId: string }) => {

    const router = useRouter()
    const { resetDialogContext } = useDialog()

    const handleMethodClick = async (chosenMethod: PaymentMethod) => {

        const userId = await getUserId();
        await accountingActions.pos.details.update(accountingDetailId, {
            paymentMethodId: chosenMethod.id,
        })
        await createAccountingAuditLog({
            userId,
            poId,
            action: 'Change Payment Menthod',
            context: `Payment method changed to ${chosenMethod.methodName}`
        });
        router.refresh()
        resetDialogContext();



    }

    return (
        <Dialog.Root identifier="choosePaymentMethod" >
            <Dialog.Title>Choose Payment Method</Dialog.Title>

            <div className="max-h-[600px] grid grid-cols-3 gap-4 overflow-auto">
                {methods.map(method => <PaymentMethodDisplay key={method.id} method={method} onClick={handleMethodClick} />)}
            </div>

        </Dialog.Root>
    )
}

export default PaymentMethodPanel
