import { RequestForDashboard } from '../_functions/getRequests'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { DateTime } from 'luxon'
import multiMonthPlugin from '@fullcalendar/multimonth'


const RequestsCalendar = ({ requests }: { requests: RequestForDashboard[] }) => {

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
            backgroundColor: request.status.bgColor,
            textColor: request.status.textColor,
            classNames: "hover:opacity-80 hover:cursor-pointer",
            url: `/purchasing/requests/${request.referenceCode}?id=${request.id}`
        }
    })



    return (
        <div>
            <FullCalendar
                plugins={[dayGridPlugin, multiMonthPlugin]}
                events={events as any}
                initialView='month'
                views={{
                    "multiMonthFour": {
                        type: 'multiMonth',
                        duration: { months: 6 }
                    },
                    "month": {
                        type: 'dayGridMonth',
                    }
                }}
                headerToolbar={{
                    right: 'prev,next today',
                    center: 'title',
                    left: 'month,multiMonthFour' // Add buttons for switching views
                }}

            />
        </div>
    )
}

export default RequestsCalendar
