'use client'
import Text from '@/components/Text'
import { staticRecords } from '@/configs/staticRecords'
import { camelToTitleCase } from '@/utils/text/camelToTitleCase'
import { DateTime } from 'luxon'
import React from 'react'
import { updateRequest } from '../_functions/updateRequest'
import { RequestStatus } from '../_functions/getRequestStatuses'
import { DropdownOptions } from '@/components/Dropdown/Badge'
import { RequestPriority } from '../../_functions/getPriorities'

type BasicDetailsPanelProps = {
    requestingUser: string
    statusName: string
    priorityName: string
    requestDate: Date
    requestId: string
    allStatuses: RequestStatus[]
    allPriorities: RequestPriority[]
}


const BasicDetailsPanel = ({ requestingUser, statusName, priorityName, requestDate, requestId, allStatuses, allPriorities }: BasicDetailsPanelProps) => {



    const priorityOptions = allPriorities.map((p) => {
        return {
            value: p.id, 
            label: p.name, 
            bgColor: p.bgColor,
            textColor: p.textColor,

        }
    });

    const statusOptions: DropdownOptions[] = allStatuses.map((s) => {
        return {
            value: s.id,
            label: s.name,
            bgColor: s.bgColor,
            textColor: s.textColor,
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


                <Text.LabelDataDropdown label='Status' currentSelectionName={statusName} badgeColor={allStatuses.filter((s) => s.name === statusName)[0].bgColor} textColor={allStatuses.filter((s) => s.name === statusName)[0].textColor} options={statusOptions} onOptionClick={handleStatusOptions}>{statusName}</Text.LabelDataDropdown>


                <Text.LabelDataDropdown label='Priority' currentSelectionName={priorityName} badgeColor={allPriorities.filter((p) => p.name === priorityName)[0].bgColor} options={priorityOptions} onOptionClick={handlePriorityOption}>{priorityName}</Text.LabelDataDropdown>


            </div>

        </div>
    )
}

export default BasicDetailsPanel
