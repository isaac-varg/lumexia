import { usePricingSharedSelection } from "@/store/pricingSharedSlice";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import StepAuxiliariesAdd from "./StepAuxiliariesAdd";
import { toFracitonalDigits } from "@/utils/data/toFractionalDigits";
import { TbPlus, TbTrash } from "react-icons/tb";

type Props = {
    currentStep: number
    nextStep: () => void;
    onAuxiliariesStepComplete: Dispatch<SetStateAction<InterimAuxiliaryItem[]>>
}

export type InterimAuxiliaryItem = {
    auxiliaryItemId: string
    auxiliaryItemName: string
    quantity: string
    difficultyAdjustmentCost: string
}
const StepAuxiliaries = ({ currentStep, nextStep, onAuxiliariesStepComplete }: Props) => {

    const [mode, setMode] = useState<'view' | 'add'>('add')
    const [auxiliaries, setAuxiliaries] = useState<InterimAuxiliaryItem[]>([]);

    const handleAuxiliaryAdd = (data: InterimAuxiliaryItem) => {
        setAuxiliaries((state) => ([
            ...state,
            data,
        ]))
    }

    const handleAuxiliaryDelete = (auxiliaryItemId: string) => {
        setAuxiliaries((prev) =>
            prev.filter((item) => item.auxiliaryItemId !== auxiliaryItemId)
        );
    };

    const handleCompleteClick = () => {
        onAuxiliariesStepComplete(auxiliaries)
        nextStep();
        // reset
        setAuxiliaries([]);
    }




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
                                    <button className="btn btn-error" onClick={() => handleAuxiliaryDelete(aux.auxiliaryItemId)}><span className="text-xl"><TbTrash /></span></button>
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

export default StepAuxiliaries
