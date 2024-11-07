import { BatchProductionRecord } from '@/types/batchProductionRecord'
import React from 'react'
import DayPanel from './DayPanel'
import { DateTime } from 'luxon'

const WeeklyPanel = ({ bprs }: { bprs: BatchProductionRecord[] }) => {

    const productionDaysOfWeek = [
        {
            day: 'Monday',
            bg: 'bg-[#DDBEA9]',
            date: getDate(0)
        },
        {
            day: 'Tuesday',
            bg: 'bg-[#FFE8D6]',
            date: getDate(1),
        },
        {
            day: 'Wednesday',
            bg: 'bg-[#B7B7A4]',
            date: getDate(2),
        },
        {
            day: 'Thursday',
            bg: 'bg-[#A5A58D]',
            date: getDate(3)
        }
    ];

    return (

        <div className=' bg-neutral-100 rounded-lg p-6  flex flex-col gap-y-2'>
        <h1 className='text-2xl font-poppins text-neutral-900 font-semibold'>This week</h1>
            <div className='grid grid-cols-4 gap-4'>
                {productionDaysOfWeek.map((day) => (
                    <DayPanel
                        key={day.day}
                        day={day}
                        bprs={bprs.filter((bpr) => {
                            if (!bpr.scheduledForStart) { return false; }
                            return DateTime.fromJSDate(bpr.scheduledForStart).toISODate() === DateTime.fromISO(day.date).toISODate();
                        }) as any}
                    />
                ))}
            </div>
        </div>
    );
}

export const getDate = (dayOfWeek: number) => {
    return DateTime.now().startOf('week').plus({ days: dayOfWeek }).toISODate();
}

export default WeeklyPanel;
