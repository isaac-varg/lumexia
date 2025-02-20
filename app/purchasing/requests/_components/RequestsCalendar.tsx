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
            return
        }
        const { expectedDateStart, expectedDateEnd } = request.pos[0].po.purchaseOrderItems[0].details[0]

        const luxStart = DateTime.fromJSDate(expectedDateStart)
        const luxEnd = DateTime.fromJSDate(expectedDateEnd);
        const equalDates = +luxStart === +luxEnd;

        // has details
        return {
            title: request.title,
            start: DateTime.fromJSDate(expectedDateStart).toISO(),
            end: DateTime.fromJSDate(expectedDateEnd).toISO(),
            backgroundColor: request.status.bgColor,
            textColor: request.status.textColor,
            classNames: [
                "hover:opacity-80 font-poppins text-sm hover:cursor-pointer rounded-xl px-2",
                equalDates ? "rounded-xl px-2 bg-neutral-300 " : ""
            ].join(" "),
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
                    "multiMonth": {
                        type: 'multiMonth',
                        duration: { months: 6 }
                    },
                    "month": {
                        defaultAllDay: true,
                        displayEventTime: false,
                        type: 'dayGridMonth',
                    }
                }}
                headerToolbar={{
                    right: 'prev,next today',
                    center: 'title',
                    left: 'month,multiMonth'
                }}
                buttonText={{
                    month: 'Month',
                    multiMonth: 'Multi Month'
                }}

            />
        </div>
    )
}

export default RequestsCalendar
