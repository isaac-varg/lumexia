import { IPurchasingRequest } from '../_functions/getRequests'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!

const RequestsCalendar = ({ requests }: { requests: IPurchasingRequest[] }) => {
    return (
        <div>
            <FullCalendar
                plugins={[dayGridPlugin]}
            />
        </div>
    )
}

export default RequestsCalendar
