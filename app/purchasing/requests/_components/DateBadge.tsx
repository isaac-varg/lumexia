import React, { useState } from 'react'
import { IPurchasingRequest } from '../_functions/getRequests'
import { DateTime } from 'luxon'
import Dropdown from '@/components/Dropdown'
import { updateRequest } from '../_functions/updateRequest'
import { Prisma } from '@prisma/client'
import { staticRecords } from '@/configs/staticRecords'
import { updatePoItemDetails } from '../_functions/updatePoItemDetails'
import { DatepickerRange } from '@/components/Dropdown/DateSelector'


const DateBadge = ({ request }: { request: IPurchasingRequest }) => {


    const hasMultiplePos = request.pos.length > 1;
    const hasExpectedDate = request.relevantPoItems ? request.relevantPoItems[0].details[0].expectedDateStart : false;
    const relevantPoItems = request.relevantPoItems?.filter((i) => i.purchaseOrderStatus.id !== staticRecords.purchasing.poStatuses.received) // exlude already received for split arrivals

    let labelText = 'No Date Yet';

    let date: { start: Date | null, end: Date | null } = {
        start: null,
        end: null,
    }

    if (hasExpectedDate) {

        const { expectedDateStart, expectedDateEnd } = request.pos[0].po.purchaseOrderItems[0].details[0]
        if (!expectedDateStart || !expectedDateEnd) {
            return
        }

        const start = DateTime.fromJSDate(expectedDateStart).toFormat('DDDD');
        const end = DateTime.fromJSDate(expectedDateEnd).toFormat('DDDD');
        date = {
            start: expectedDateStart,
            end: expectedDateEnd,
        }

        labelText = `${start} to ${end} `
    }

    if (hasMultiplePos) {
        labelText = 'Multiple Connected POs'
    }

    const handleDateSelection = async (value: DatepickerRange) => {

        if (relevantPoItems?.length !== 1) {
            // too many poitems
            return;     
        }
       
        await updatePoItemDetails(relevantPoItems[0].details[0].id, {
            expectedDateStart: value.start,
            expectedDateEnd: value.end,
        }) 

        
    }

    return (

        <div>
            
            <Dropdown.Date
                onClick={handleDateSelection}
                value={date}
            />


        </div>
    )
}

export default DateBadge
