'use client'
import Text from '@/components/Text'
import { staticRecords } from '@/configs/staticRecords'
import { camelToTitleCase } from '@/utils/text/camelToTitleCase'
import { DateTime } from 'luxon'
import React from 'react'
import { updateRequest } from '../_functions/updateRequest'
import { RequestStatus } from '../_functions/getRequestStatuses'

type BasicDetailsPanelProps = {
    requestingUser: string
    statusName: string
    priorityName: string
    requestDate: Date
    requestId: string
    allStatuses: RequestStatus[] 
}


const BasicDetailsPanel = ({ requestingUser, statusName, priorityName, requestDate, requestId , allStatuses}: BasicDetailsPanelProps) => {

    const prioritiesArray = Object.entries(staticRecords.purchasing.requestPriorities).map(([key, value]) => ({ [key]: value }));


    const priorityOptions = prioritiesArray.map((p: any ) => {
        return {
            value: Object.values(p)[0] as string,
            label: camelToTitleCase(Object.keys(p)[0]),
        }
    });

    const statusOptions = allStatuses.map((s) => {

        return {
            value: s.id,
            label: s.name , 
        }
    });

    const handlePriorityOption = async (value: string) => {
        await updateRequest(requestId, { priorityId: value })

    };

    const handleStatusOptions = async (value: string) => {
        await updateRequest(requestId, { statusId: value })
    }


    return (
        <div className='card bg-base-300'>

            <div className='card-body'>
                <div className='card-title'>Basic Details</div>

                <Text.LabelDataPair label='Requesting User' data={requestingUser} />


                <Text.LabelDataPair label='Request On' data={DateTime.fromJSDate(requestDate).toFormat('dd MMM yyyy \'at\' hh:mm a')} />


                <Text.LabelDataDropdown label='Status' displayType='badge' options={statusOptions} onOptionClick={handleStatusOptions}>{statusName}</Text.LabelDataDropdown>


                <Text.LabelDataDropdown label='Priority' displayType='badge' options={priorityOptions} onOptionClick={handlePriorityOption}>{priorityName}</Text.LabelDataDropdown>


            </div>

        </div>
    )
}

export default BasicDetailsPanel
