"use client"
import React from 'react'
import { LinkedBatchesType } from '../_functions/getLinkedBatches'
import LinkedBprCard from './LinkedBprCard'
import useDialog from '@/hooks/useDialog'
import { toFracitonalDigits } from '@/utils/data/toFractionalDigits'
import { LinkedBprsAmounts } from '../_functions/getLinkedBprAmounts'

type LinkedBprsPanelProps = {
    bprs: LinkedBatchesType
    linkedBprAmounts: LinkedBprsAmounts
}

const LinkedBatchesPanel = ({ bprs, linkedBprAmounts }: LinkedBprsPanelProps) => {

    const { showDialog } = useDialog()

    const handleAdd = () => {
        showDialog('actionLinkBprToPurchasingRequest')
    }

    return (

        <div className="card bg-base-300">
            <div className="card-body flex flex-col gap-y-4 justify-between h-full">
                <div className="flex justify-between items-center gap-y-2">
                    <div className="card-title">Linked Batches</div>
                    <button className="btn" onClick={handleAdd}>
                        Connect
                    </button>
                </div>

                <div className="grow grid grid-cols-2 gap-4">
                    {bprs.map((bpr) => (
                        <LinkedBprCard key={bpr.id} bpr={bpr} />
                    ))}
                </div>

                <div className="flex justify-end font-poppins text-sm font-medium">
                    Total: {toFracitonalDigits.weight(linkedBprAmounts.totalNeeded)} lbs
                </div>
            </div>
        </div>
    )
}

export default LinkedBatchesPanel
