import { Dispatch, SetStateAction } from "react"
import { PaymentMethodType } from "./PaymentMethodWizard"
import Text from "@/components/Text"

const StepType = ({ setSelectedType, nextStep, step }: { setSelectedType: Dispatch<SetStateAction<PaymentMethodType>>, nextStep: () => void, step: number }) => {

    const types: PaymentMethodType[] = ['visa', 'mastercard', 'amex', 'bankTransfer', 'check'];

    const handleSelection = (type: PaymentMethodType) => {
        setSelectedType(type)
        nextStep();
    }

    if (step !== 0) return false

    return (
        <div className="flex flex-col gap-y-6">

            <Text.Normal>Please select a payment method type.</Text.Normal>


            <div className="grid grid-cols-3 gap-6">

                {types.map(t => {
                    return (
                        <div
                            key={t}
                            className="bg-neutral-200 hover:bg-neutral-300 rounded-xl hover:cursor-pointer p-6 flex items-center justify-center"
                            onClick={() => handleSelection(t)}
                        >
                            <p className="uppercase font-poppins text-xl font-medium">{t === 'bankTransfer' ? 'bank transfer' : t}</p>
                        </div>
                    )
                })}

            </div>




        </div >
    )
}

export default StepType
