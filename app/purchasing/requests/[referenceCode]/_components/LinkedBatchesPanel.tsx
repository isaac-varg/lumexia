"use client"
import React from 'react'
import { LinkedBatchesType } from '../_functions/getLinkedBatches'
import LinkedBprCard from './LinkedBprCard'
import useDialog from '@/hooks/useDialog'

type LinkedBprsPanelProps = {
    bprs: LinkedBatchesType
}

const LinkedBatchesPanel = ({ bprs }: LinkedBprsPanelProps) => {

    const { showDialog } = useDialog()

    const handleAdd = () => {
        showDialog('actionLinkBprToPurchasingRequest')
    }

    return (
        <div className='card bg-base-300'>
            <div className='card-body'>
                <div className='flex justify-between'>
                    <div className='card-title'>Linked Batches</div>
                    <button className='btn' onClick={handleAdd}>Connect</button>
                </div>
                <div className='grid grid-cols-2 gap-4 '>
                    {bprs.map((bpr) => <LinkedBprCard key={bpr.id} bpr={bpr} />)}
                </div>
            </div>

        </div>
    )
}

export default LinkedBatchesPanel
