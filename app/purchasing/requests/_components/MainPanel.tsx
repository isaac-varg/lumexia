'use client'
import React, { useState } from 'react'
import ModeMenu from './ModeMenu'
import RequestsCalendar from './RequestsCalendar'
import { RequestForDashboard } from '../_functions/getRequests'


type MainPanelProps = {
    requests: RequestForDashboard[]
}

const MainPanel = ({ requests }: MainPanelProps) => {

    const [mode, setMode] = useState<"table" | "calendar">("calendar")

    return (
        <div className='flex flex-col gap-y-4'>
            <ModeMenu setMode={setMode} mode={mode} />

            {mode === 'calendar' && <RequestsCalendar requests={requests} />}

        </div>
    )
}

export default MainPanel
