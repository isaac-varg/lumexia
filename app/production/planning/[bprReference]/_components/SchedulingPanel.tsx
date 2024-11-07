"use client"
import React, { useState } from 'react'
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import { updateBpr } from '../_functions/updateBpr';
import { Panels } from '@/components/Panels';
import Text from '@/components/Text';


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
        <Panels.Root>
            <Text.SectionTitle>Scheduling</Text.SectionTitle>


            <Datepicker
                separator='to'
                value={value}
                onChange={newValue => handleDateSelection(newValue)}
            />
        </Panels.Root>

    )
}

export default SchedulingPanel
