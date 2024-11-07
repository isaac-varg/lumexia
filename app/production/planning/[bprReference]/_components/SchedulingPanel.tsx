"use client"
import Card from '@/components/Card'
import React, { useState } from 'react'
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import { updateBpr } from '../_functions/updateBpr';


const SchedulingPanel = ({ start, end, bprId }: { start: Date | null, end: Date | null, bprId: string }) => {

    const [value, setValue] = useState({
        startDate: start,
        endDate: end
    })

    const handleDateSelection = async (value: DateValueType | null) => {

        if (!value) { return }

        setValue(value)

        const { startDate, endDate } = value

        await updateBpr(bprId, {
            scheduledForStart: startDate,
            scheduledForEnd: endDate,
        }, `changed start from ${start} to ${startDate} and end from ${end} to ${endDate}`);

    }

    return (
        <Card.Root>
            <Card.Title >
                <span className='flex gap-x-2'>
                    Scheduling
                </span>
            </Card.Title>

            <Datepicker
                separator='to'
                containerClassName={'border-2 text-neutral-800 border-neutral-500 rounded-lg'}
                value={value}
                onChange={newValue => handleDateSelection(newValue)}
            />
        </Card.Root>
    )
}

export default SchedulingPanel
