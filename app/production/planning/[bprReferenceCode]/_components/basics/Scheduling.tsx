"use client"

import React, { useEffect, useState } from 'react'
import { IoCalendarOutline } from "react-icons/io5";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import { productionActions } from '@/actions/production';
import { DateTime } from 'luxon';
import { dateFormatString } from '@/configs/data/dateFormatString';
import { TbX } from 'react-icons/tb';
import { useBprDetailsSelection } from '@/store/bprDetailsSlice';
import Card from '@/components/Card';


const Scheduling = () => {

  const { bpr } = useBprDetailsSelection()
  const [value, setValue] = useState<DateValueType | null>(null)
  const [isSameDay, setIsSameDay] = useState<boolean>()
  const [isEdit, setIsEdit] = useState<boolean>(false)

  const handleDateSelection = async (value: DateValueType | null) => {

    if (!value || !bpr) {
      setValue(null)
      return
    }

    setValue(value)

    const { startDate, endDate } = value

    await productionActions.bprs.update2(bpr.id, {
      scheduledForStart: startDate,
      scheduledForEnd: endDate,
    });

  }


  // helper to deal with datepicker date to luxon
  const toLuxonDateTime = (dateInput: string | Date | null | undefined): DateTime => {
    if (!dateInput) {
      return DateTime.invalid('No date input provided');
    }
    if (dateInput instanceof Date) {
      return DateTime.fromJSDate(dateInput);
    }
    // assuming if it's a string, it's an ISO string
    return DateTime.fromISO(dateInput);
  };


  const displayDate = () => {
    if (!value || (!value.startDate && !value.endDate)) {
      return (
        <span className="text-gray-500 italic">No dates selected</span>
      );
    }

    const luxonStartDate = toLuxonDateTime(value.startDate);
    const luxonEndDate = toLuxonDateTime(value.endDate);

    const formattedStartDate = luxonStartDate.toFormat(dateFormatString);
    const formattedEndDate = luxonEndDate.toFormat(dateFormatString);

    if (isSameDay) {
      return (
        <span className="text-3xl font-semibold text-base-content">
          {formattedStartDate}
        </span>
      );
    } else {
      return (

        <span className="text-3xl font-semibold text-base-content">
          {formattedStartDate} <span className="text-neutral-600">to</span> {formattedEndDate}
        </span>
      );
    }
  };

  useEffect(() => {
    if (!bpr) return;

    setValue({
      startDate: bpr.scheduledForStart || null,
      endDate: bpr.scheduledForEnd || null

    })
  }, [bpr])

  useEffect(() => {
    if (!value) {
      setIsEdit(true);
      return;
    }
    const { startDate, endDate } = value;

    let isSameDate = false;
    if (startDate && endDate) {
      const startDateTime = toLuxonDateTime(startDate);
      const endDateTime = toLuxonDateTime(endDate);

      if (startDateTime.isValid && endDateTime.isValid) {
        isSameDate = startDateTime.hasSame(endDateTime, 'day');
      } else {
        console.warn("Invalid date(s) received from datepicker for comparison in useEffect.");
      }
    }

    setIsSameDay(isSameDate)
    setIsEdit(false)

  }, [value])


  return (
    <Card.Root>
      <div className='flex justify-between items-center' >
        <Card.Title size='small' >Scheduling</Card.Title>

        {isEdit && (
          <button onClick={() => setIsEdit(false)} className='btn btn-sm'><span className='text-xl'><TbX /></span></button>
        )}
        {!isEdit && (
          <button onClick={() => setIsEdit(true)} className='btn btn-sm'><span className='text-xl'>< IoCalendarOutline /></span></button>
        )}
      </div>

      <div className='flex flex-col w-full justify-center items-center h-full hover:cursor-pointer '>

        {!isEdit && displayDate()}

        {isEdit &&
          <Datepicker
            containerClassName={"bg-red-300"}
            separator='to'
            value={value}
            onChange={newValue => handleDateSelection(newValue)}
          />
        }
      </div>



    </Card.Root>

  )
}

export default Scheduling
