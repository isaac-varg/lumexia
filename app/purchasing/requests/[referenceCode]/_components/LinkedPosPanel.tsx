"use client"
import React from 'react'
import useDialog from '@/hooks/useDialog'
import { LinkedPos } from '../_functions/getLinkedPos'
import LinkedPoCard from './LinkedPoCard'
import { Containers } from '../_functions/getContainerTypes'

type LinkedPosPanelProps = {
    pos: LinkedPos[]
    containerTypes: Containers[]
}

const LinkedPosPanel = ({ pos , containerTypes }: LinkedPosPanelProps) => {

    const { showDialog } = useDialog()


    const handleAdd = () => {
        showDialog('actionLinkPosToPurchasingRequest')
    }

    return (
        <div className='card bg-base-300'>
            <div className='card-body'>
                <div className='flex justify-between'>
                    <div className='card-title'>Purchased Via</div>
                    <button className='btn' onClick={handleAdd}>Add</button>
                </div>
                <div className='grid grid-cols-2 gap-4 '>
                    {pos.map((po) => <LinkedPoCard key={po.id} po={po} containerTypes={containerTypes}/>)}
                </div>
            </div>

        </div>
    )
}

export default LinkedPosPanel
