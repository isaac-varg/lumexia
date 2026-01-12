import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { toFracitonalDigits } from "@/utils/data/toFractionalDigits";
import { TbPlus, TbTrash } from "react-icons/tb";
import StepAuxiliariesAdd from "./EditModeStepAuxiliariesAdd";
import { usePricingProducedActions, usePricingProducedSelection } from "@/store/pricingProducedSlice";
import { accountingActions } from "@/actions/accounting";

type Props = {
    currentStep: number
    nextStep: () => void;
    onAuxiliariesStepComplete: Dispatch<SetStateAction<InterimAuxiliaryItemEditMode[]>>
    isProduced: boolean;
}

export type InterimAuxiliaryItemEditMode = {
    existingAuxiliary: boolean
    auxiliaryId: string | null
    auxiliaryItemId: string
    auxiliaryItemName: string
    quantity: string
    difficultyAdjustmentCost: string
}
const EditModeStepAuxiliaries = ({ currentStep, nextStep, onAuxiliariesStepComplete, isProduced }: Props) => {

    const [mode, setMode] = useState<'view' | 'add'>('view')
    const { selectedFinishedProduct } = usePricingProducedSelection()
    const { getProducedPricingSummations } = usePricingProducedActions()
    const [auxiliaries, setAuxiliaries] = useState<InterimAuxiliaryItemEditMode[]>([]);

    const handleAuxiliaryAdd = (data: InterimAuxiliaryItemEditMode) => {
        setAuxiliaries((state) => ([
            ...state,
            data,
        ]))
    }

    const handleAuxiliaryDelete = async (auxiliary: InterimAuxiliaryItemEditMode) => {


        if (auxiliary.existingAuxiliary && auxiliary.auxiliaryId) {
            await accountingActions.finishedProducts.auxiliaries.delete(auxiliary.auxiliaryId);
            getProducedPricingSummations()
        }

        setAuxiliaries((prev) =>
            prev.filter((item) => item.auxiliaryItemId !== auxiliary.auxiliaryItemId)
        );
    };

    const handleCompleteClick = () => {
        onAuxiliariesStepComplete(auxiliaries)
        nextStep();
        // reset
        setAuxiliaries([]);
    }


    useEffect(() => {
        if (isProduced) {
            if (!selectedFinishedProduct) {
                setAuxiliaries([]);
                return;
            }
            const auxes: InterimAuxiliaryItemEditMode[] = selectedFinishedProduct.auxiliaries.breakdown.map((a): InterimAuxiliaryItemEditMode => ({
                existingAuxiliary: true,
                auxiliaryId: a.auxiliaryId,
                auxiliaryItemId: a.auxiliaryItemId,
                auxiliaryItemName: a.name,
                quantity: a.quantity.toString(),
                difficultyAdjustmentCost: a.difficultyAdjustmentCost.toString()

            }))
            setAuxiliaries(auxes)
        }
    }, [selectedFinishedProduct, isProduced])



    if (currentStep !== 1) {
        return false
    }


    return (
        <div className="flex flex-col gap-y-6">
            {mode === 'add' && <StepAuxiliariesAdd setMode={setMode} onAuxiliaryAdd={handleAuxiliaryAdd} />}


            {mode === 'view' && (
                <div className="grid grid-cols-2 gap-2">




                    <div className="flex justify-center items-center p-8 rounded-xl bg-neutral-100 gap-x-4 hover:cursor-pointer hover:bg-neutral-200" onClick={() => setMode('add')}>
                        <span className="text-xl"><TbPlus /></span>
                        <p className="font-poppins text-xl font-medium">Add Auxiliary</p>
                    </div>



                    {auxiliaries.map((aux) => {
                        return (
                            <div className="flex flex-col gap-y-2 p-8 rounded-xl bg-neutral-100" key={aux.auxiliaryItemId}>
                                <div className="flex justify-between items-center">
                                    <p className="font-poppins text-xl font-medium">{aux.auxiliaryItemName}</p>
                                    <button className="btn btn-error" onClick={() => handleAuxiliaryDelete(aux)}><span className="text-xl"><TbTrash /></span></button>
                                </div>
                                <p className="font-poppins text-base font-normal">Quantity: {aux.quantity}</p>
                                <p className="font-poppins text-base font-normal">Difficulty Adjustment Cost: ${toFracitonalDigits.curreny(parseFloat(aux.difficultyAdjustmentCost))}</p>

                            </div>
                        )
                    })}
                </div>
            )}


            {mode === 'view' && (<div className="justify-end">

                <button className="btn btn-success" onClick={() => handleCompleteClick()}>Complete Finished Product</button>
            </div>)}
        </div>
    )
}

export default EditModeStepAuxiliaries
