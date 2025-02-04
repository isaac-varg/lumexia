import { RequestForDashboard } from '../_functions/getRequests'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import { useState } from 'react'
import { DateTime } from 'luxon'

const RequestsCalendar = ({ requests }: { requests: RequestForDashboard[] }) => {

    const [mode, setMode] = useState<'requested' | 'expected'>('expected')

    const filtered = requests.filter((request) => (
        request.pos.length !== 0 &&
        request.pos[0].po.purchaseOrderItems[0].details.length !== 0 &&
        request.pos[0].po.purchaseOrderItems[0].details[0].expectedDateStart &&
        request.pos[0].po.purchaseOrderItems[0].details[0].expectedDateEnd
    ))

    const events = filtered.map((request) => {
        if (!request.pos[0].po.purchaseOrderItems[0].details[0].expectedDateStart || !request.pos[0].po.purchaseOrderItems[0].details[0].expectedDateEnd) {
            // no dates therefore do not add event
            console.log('22 ran')
            return
        }

        const { expectedDateStart, expectedDateEnd } = request.pos[0].po.purchaseOrderItems[0].details[0]


        // has details
        return {
            title: request.title,
            start: DateTime.fromJSDate(expectedDateStart).toISO(),
            end: DateTime.fromJSDate(expectedDateEnd).toISO(),
        }
    })


    return (
        <div>
            <FullCalendar
                plugins={[dayGridPlugin]}
                events={events as any}
            />
        </div>
    )
}

export default RequestsCalendar
