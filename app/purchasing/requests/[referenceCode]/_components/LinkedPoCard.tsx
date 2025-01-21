import React from 'react'
import { useRouter } from 'next/navigation'
import { TbTrash } from 'react-icons/tb'
import { LinkedPos } from '../_functions/getLinkedPos'
import { deleteLinkedPo } from '../_functions/deleteLinkedPos'

const LinkedPoCard = ({ po }: { po: LinkedPos }) => {

    const router = useRouter()

    const handleDelete = async (e: any) => {
        e.stopPropagation();
        await deleteLinkedPo(po.id, po.requestId)
    }

    const handleClick = () => {
        router.push(`/purchasing/purchase-orders/${po.po.referenceCode}?id=${po.poId}`)

    }

    return (
        <div className='card bg-indigo-200 hover:cursor-pointer hover:bg-indigo-300' onClick={handleClick}>
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
