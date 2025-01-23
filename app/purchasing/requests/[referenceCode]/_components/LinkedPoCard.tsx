import React from 'react'
import { TbTrash } from 'react-icons/tb'
import { LinkedPos } from '../_functions/getLinkedPos'
import { deleteLinkedPo } from '../_functions/deleteLinkedPos'
import LinkedPoDialog from './LinkedPoDialog'
import useDialog from '@/hooks/useDialog'

const LinkedPoCard = ({ po }: { po: LinkedPos }) => {

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
            <LinkedPoDialog purchaseOrder={po} />
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
