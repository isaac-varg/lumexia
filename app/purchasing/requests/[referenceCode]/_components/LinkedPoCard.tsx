import React from 'react'
import { TbTrash } from 'react-icons/tb'
import { LinkedPos } from '../_functions/getLinkedPos'
import { deleteLinkedPo } from '../_functions/deleteLinkedPos'
import LinkedPoDialog from './LinkedPoDialog'
import useDialog from '@/hooks/useDialog'
import { Containers } from '../_functions/getContainerTypes'
import { DateTime } from 'luxon'
import Dropdown from '@/components/Dropdown'
import { DatepickerRange } from '@/components/Dropdown/DateSelector'
import { updatePoItemDetails } from '../_functions/updatePoItemDetails'

const LinkedPoCard = ({ po, containerTypes }: { po: LinkedPos, containerTypes: Containers[] }) => {

    const { showDialog } = useDialog()

    const hasDetails = po.po.purchaseOrderItems[0].details.length !== 0;
    const poItemDetail = po.po.purchaseOrderItems[0].details[0]
    const expectedDate: DatepickerRange = { start: poItemDetail.expectedDateStart, end: poItemDetail.expectedDateEnd }


    const handleDelete = async (e: any) => {
        e.stopPropagation();
        await deleteLinkedPo(po.id, po.requestId)
    }

    const handleClick = () => {
        showDialog(`linkedPoDialog-${po.po.purchaseOrderItems[0].id}`)
    }

    const handleDateSelection = async (value: DatepickerRange) => {

        const poItemDetailId = po.po.purchaseOrderItems[0].details[0].id
        const update = await updatePoItemDetails(poItemDetailId, {
            expectedDateStart: value.start,
            expectedDateEnd: value.end,
        });

    };


    return (
        <div className='card bg-lilac-50 hover:cursor-pointer hover:bg-lilac-200' onClick={handleClick}>
            <LinkedPoDialog purchaseOrder={po} containerTypes={containerTypes} />
            <div className='card-body'>
                <div className='flex justify-between'>
                    <div className='card-title'>PO# {po.po.referenceCode} - {po.po.supplier.name} </div>
                    <span className='text-2xl hover:text-red-500' onClick={(e) => handleDelete(e)}><TbTrash /></span>
                </div>
                <div>
                    <Dropdown.Date onClick={handleDateSelection} value={expectedDate} />

                </div>
            </div>
        </div>
    )
}

export default LinkedPoCard
