import React from 'react'
import { TbTrash } from 'react-icons/tb'
import { LinkedPos } from '../_functions/getLinkedPos'
import { deleteLinkedPo } from '../_functions/deleteLinkedPos'
import LinkedPoDialog from './LinkedPoDialog'
import useDialog from '@/hooks/useDialog'
import { Containers } from '../_functions/getContainerTypes'

const LinkedPoCard = ({ po, containerTypes }: { po: LinkedPos, containerTypes: Containers[] }) => {

    const { showDialog } = useDialog()

    const handleDelete = async (e: any) => {
        e.stopPropagation();
        await deleteLinkedPo(po.id, po.requestId)
    }

    const handleClick = () => {
        showDialog(`linkedPoDialog-${po.po.purchaseOrderItems[0].id}`)

    }

    return (
        <div className='card bg-indigo-200 hover:cursor-pointer hover:bg-indigo-300' onClick={handleClick}>
            <LinkedPoDialog purchaseOrder={po} containerTypes={containerTypes} />
            <div className='card-body'>
                <div className='flex justify-between'>
                    <div className='card-title'>PO# {po.po.referenceCode} - {po.po.supplier.name} </div>
                    <span className='text-2xl hover:text-red-500' onClick={(e) => handleDelete(e)}><TbTrash /></span>
                </div>
            </div>
        </div>
    )
}

export default LinkedPoCard
