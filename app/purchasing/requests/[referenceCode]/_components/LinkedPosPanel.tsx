"use client"
import React from 'react'
import useDialog from '@/hooks/useDialog'
import { LinkedPos } from '../_functions/getLinkedPos'
import LinkedPoCard from './LinkedPoCard'
import { Containers } from '../_functions/getContainerTypes'
import { TbPlugConnected, TbPlus } from 'react-icons/tb'

type LinkedPosPanelProps = {
    pos: LinkedPos[]
    containerTypes: Containers[]
}

const LinkedPosPanel = ({ pos, containerTypes }: LinkedPosPanelProps) => {

    const { showDialog } = useDialog()


    const handleAdd = () => {
        showDialog('actionLinkPosToPurchasingRequest')
    }


    return (
        <div className='card bg-base-300'>
            <div className='card-body'>
                <div className='flex justify-between'>
                    <div className='card-title'>Linked POs</div>
                    <div className='flex gap-x-2'>
                        <button className='btn' onClick={handleAdd}>
                            <span className='text-xl'> <TbPlugConnected /></span>
                            <h2>Connect Existing</h2>
                        </button>
                        <button className='btn' onClick={() => showDialog('newPOFromRequest')}>
                            <span className='text-xl'> <TbPlus /></span>
                            <h2>Add New</h2>
                        </button>
                    </div>
                </div>
                <div className='grid grid-cols-2 gap-4 '>
                    {pos.map((po) => <LinkedPoCard key={po.id} po={po} containerTypes={containerTypes} />)}
                </div>
            </div>

        </div>
    )
}

export default LinkedPosPanel
