import React, { useState } from 'react'
import { FloatingPortal } from '@floating-ui/react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export type DatepickerRange = { start: Date | null, end: Date | null }
type DateSelectProps = {
    onClick: (value: DatepickerRange) => void;
    value: DatepickerRange

}



const DateSelector = ({ onClick, value }: DateSelectProps) => {

    const [startDate, setStartDate] = useState(value.start);
    const [endDate, setEndDate] = useState(value.end);

    const onChange = (dates: [Date | null, Date | null]) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);

        onClick({start, end})
    };


    return (
        <div
            onClick={(e) => e.stopPropagation()}
            className='font-poppins font-medium text-base bg-neutral-300 hover:bg-neutral-400 rounded-xl px-2 py-1 text-neutral-900'
        >
            <DatePicker
                selected={startDate}
                startDate={startDate}
                endDate={endDate}
                onChange={(date) => onChange(date)}
                popperPlacement="bottom-start" // Position the calendar below the input
                popperContainer={FloatingPortal}
                selectsRange
            />
        </div>

    )
}

export default DateSelector
