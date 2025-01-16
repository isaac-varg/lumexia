import Text from '@/components/Text'
import React from 'react'

type BasicDetailsPanelProps = {
    requestingUser: string
    statusName: string
    priorityName: string
}

const BasicDetailsPanel = ({ requestingUser, statusName , priorityName}: BasicDetailsPanelProps) => {
    return (
        <div className='card bg-base-300'>

            <div className='card-body'>
                <div className='card-title'>Basic Details</div>

                <Text.LabelDataPair label='Requesting User' data={requestingUser} />

                <Text.LabelDataPair label='Status' data={statusName} displayType='badge' badgeColor='success'/>


                <Text.LabelDataPair label='Priority' data={priorityName} displayType='badge' badgeColor='info'/>

            </div>

        </div>
    )
}

export default BasicDetailsPanel
