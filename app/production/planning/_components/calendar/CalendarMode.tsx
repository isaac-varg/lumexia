import React, { useEffect, useState } from 'react'
import { PlanningIBpr } from '../../_functions/getBprs'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { getCalendarEvents } from '../../_functions/getCalendarEvents'
import interactionPlugin, { Draggable, EventReceiveArg, EventResizeStopArg } from '@fullcalendar/interaction';
import UnscheduledBpr from './UnscheduledBpr'
import Text from '@/components/Text'
import { updateBpr } from '../../_functions/updateBpr'
import { DateTime } from 'luxon'
import { createActivityLog } from '@/utils/auxiliary/createActivityLog'
import { EventClickArg, EventDropArg } from '@fullcalendar/core/index.js'
import { useRouter } from 'next/navigation'

type CalendarModeProps = {
    bprs: PlanningIBpr[]
}

const CalendarMode = ({ bprs }: CalendarModeProps) => {

    const events = getCalendarEvents(bprs);

    const notScheduled = bprs.filter((bpr) => bpr.scheduledForStart === null)
    const isAllScheduled = notScheduled.length === 0;
    const router = useRouter()

    const handleExternalDrag = (id: string, eventTitle: string) => {
        const ele = document.getElementById(id)
        if (!ele) return;

        new Draggable(ele, {
            eventData: () => {
                return { title: eventTitle, }
            }
        })

    }

    const handleEventReceive = async (info: EventReceiveArg) => {
        const { start } = info.event
        const id = info.draggedEl.id;

        if (!start) return

        await updateBpr(id, {
            scheduledForStart: DateTime.fromJSDate(start).toISO(),
            scheduledForEnd: DateTime.fromJSDate(start).toISO()
        })

        await createActivityLog('changeBprDate', 'bprId', id, { context: 'Bpr was unassigned and dragged to a calendar for new Bpr Date.' })
        location.reload()
    }

    const handleEventDrop = async (event: EventDropArg) => {

        const { start, end, id } = event.event

        if (!start) return
        const fixedEnd = end ? end : start

        await updateBpr(id, {
            scheduledForStart: DateTime.fromJSDate(start).toISO(),
            scheduledForEnd: DateTime.fromJSDate(fixedEnd).toISO()

        })

        await createActivityLog('changeBprDate', 'bprId', id, { context: 'Bpr was schedule dates changed.' })
    }

    const handleResize = async (event: EventResizeStopArg) => {

        const { id, end } = event.event

        console.log(event)
        if (!end) return
        await updateBpr(id, {
            scheduledForEnd: DateTime.fromJSDate(end).toISO()

        })
        await createActivityLog('changeBprDate', 'bprId', id, { context: 'Bpr was schedule dates changed by dragging the end date on the calendar' })
    }

    const handleClick = (event: EventClickArg) => {
        const { extendedProps, id } = event.event
        router.push(`/production/planning/${extendedProps.referenceCode}?id=${id}`)
    }


    return (
        <div className='flex flex-row gap-x-8 h-screen '>
            {!isAllScheduled && <div className='flex flex-col gap-y-2 max-w-[550px]'>
                <Text.SectionTitle size='small'>Unassigned</Text.SectionTitle>
                {notScheduled && notScheduled.map((bpr) => {
                    return <UnscheduledBpr key={bpr.id} bpr={bpr} onDraggableStart={handleExternalDrag} />
                })}
            </div>}
            <div className='w-full h-full'>
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView='dayGridMonth'
                    events={events as any}
                    weekends={false}
                    height={'100%'}
                    defaultAllDay={true}
                    droppable={true}
                    editable={true}
                    eventDrop={(event) => handleEventDrop(event)}
                    eventReceive={(info) => handleEventReceive(info)}
                    eventResizeStop={(event) => handleResize(event)}
                    eventClick={(event) => handleClick(event)}
                />
            </div>
        </div>
    )
}

export default CalendarMode
