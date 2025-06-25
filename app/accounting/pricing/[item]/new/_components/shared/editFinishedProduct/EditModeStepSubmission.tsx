'use client'

import { usePricingPurchasedActions } from "@/store/pricingPurchasedSlice";
import { useEffect } from "react"
import { InterimAuxiliaryItemEditMode } from "./EditModeStepAuxiliaries";
import { FinishedProductDetails } from "./EditModeFinishedProductDetails";
import { submitNewFinishedProduct } from "../../../_functions/submitNewFinishedProduct";
import { updateFinishedProduct } from "../../../_functions/updateFinishedProduct";

type Props = {
    currentStep: number
    onReset: () => void;
    finishedProductId: string
    finishedProductDetails: FinishedProductDetails | null
    auxiliaries: InterimAuxiliaryItemEditMode[]
}

const EditModeStepSubmission = ({ currentStep, finishedProductId, finishedProductDetails, auxiliaries, onReset }: Props) => {


    useEffect(() => {

        if (currentStep !== 2) return;
        if (!finishedProductId || !finishedProductDetails || auxiliaries.length === 0) {
            throw new Error('Some thing went wrong with the submission. Data is missing.')
        }



        const submit = async () => {
            try {
                await updateFinishedProduct(finishedProductId, finishedProductDetails, auxiliaries);
            } catch (error) {
                console.error("Error:", error)
            } finally {
                onReset()
            }

        }

        submit();
    }, [finishedProductDetails, auxiliaries])

    if (currentStep !== 2) { return false }

    return (
        <div className="flex w-52 flex-col gap-4">
            <div className="skeleton h-32 w-full"></div>
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
        </div>

    )
}

export default EditModeStepSubmission
