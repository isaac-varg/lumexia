import { useEffect } from "react"
import { PaymentMethodColors, PaymentMethodData, PaymentMethodType } from "./PaymentMethodWizard"
import { PaymentMethod } from "@/actions/accounting/paymentMethods/getAll"
import { accountingActions } from "@/actions/accounting"
import { DateTime } from "luxon"
import { useRouter } from "next/navigation"

const Submission = ({ data, type, colors, step, existingMethod }: { data: PaymentMethodData, type: PaymentMethodType, colors: PaymentMethodColors, step: number, existingMethod: PaymentMethod | undefined | null }) => {


    const router = useRouter();

    useEffect(() => {
        const payload = {
            identifier: data.identifier,
            limit: data.limit,
            expiry: data.expiry,
            paymentType: type,
            accountEndingIn: data.accountEndingIn,
            associatedName: data.associatedName,
            methodName: data.methodName,
            bgColorA: colors.bgColorA,
            bgColorB: colors.bgColorB,
            circleColorA: colors.circleColorA,
            circleColorB: colors.circleColorB,
        }

        const handleSubmit = async () => {
            if (existingMethod) {
                await accountingActions.paymentMethods.update(existingMethod.id, payload)
            }

            if (!existingMethod) {
                await accountingActions.paymentMethods.create(payload);
            }


            router.back();
            router.refresh()

        }

        if (step === 3) {
            handleSubmit();
        }
    }, [step, existingMethod, router, colors, data, type])

    if (step !== 3) return false;

    return (
        <div className="flex items-center justify-center min-h-40">
            <p className="font-poppins text-3xl font-semibold text-gray-700 animate-pulse">
                Submitting . . .
            </p>
        </div>
    )
}

export default Submission
