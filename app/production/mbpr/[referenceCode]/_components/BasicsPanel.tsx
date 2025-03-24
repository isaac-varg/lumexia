'use client'
import { RecordStatus } from '@/actions/app/recordStatuses/getAllRecordStatuses'
import { productionActions } from '@/actions/production'
import { Mbpr } from '@/actions/production/mbpr/getOneMbpr'
import Card from '@/components/Card'
import { DropdownOptions } from '@/components/Dropdown/Badge'
import Text from '@/components/Text'
import { TextUtils } from '@/utils/text'
import React from 'react'

const BasicsPanel = ({ mbpr, statuses }: { mbpr: Mbpr, statuses: RecordStatus[] }) => {

    if (!mbpr || !statuses) return false

    const statusOptions: DropdownOptions[] = statuses.map((status) => {
        return ({
            value: status.id,
            label: TextUtils.properCase(status.name),
            bgColor: status.bgColor,
            textColor: status.textColor,
        })
    })

    const handleOptionClick = async (statusId: string) => {
        await productionActions.mbprs.update(mbpr.id, {
            recordStatusId: statusId
        });

        location.reload()
    }


    return (
        <Card.Root>

            <Card.Title>Basics</Card.Title>

            <Text.LabelDataPair
                label='Produces'
                data={`${mbpr.producesItem.name}, ${mbpr.producesItem.referenceCode}`}
            />

            <Text.LabelDataPair
                label='Version Label'
                data={mbpr.versionLabel || ''}
            />

            <Text.LabelDataDropdown
                label="Status"
                currentSelectionName={TextUtils.properCase(mbpr.recordStatus.name)}
                badgeColor={mbpr.recordStatus.bgColor}
                textColor={mbpr.recordStatus.textColor}
                options={statusOptions}
                onOptionClick={handleOptionClick}
            />


        </Card.Root>
    )
}

export default BasicsPanel
