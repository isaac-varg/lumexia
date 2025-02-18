'use client'
import React from 'react'
import RequestsCalendar from './RequestsCalendar'
import { RequestForDashboard } from '../_functions/getRequests'


type MainPanelProps = {
    requests: RequestForDashboard[]
}

const MainPanel = ({ requests }: MainPanelProps) => {


    return (
        <div className='flex flex-col gap-y-4'>

             <RequestsCalendar requests={requests} />

        </div>
    )
}

export default MainPanel
