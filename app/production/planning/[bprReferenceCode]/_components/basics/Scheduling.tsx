"use client"

import React, { useEffect, useState } from 'react'
import { IoCalendarOutline } from "react-icons/io5";
import { productionActions } from '@/actions/production';
import { DateTime } from 'luxon';
import { dateFormatString } from '@/configs/data/dateFormatString';
import { TbDeviceFloppy, TbX } from 'react-icons/tb';
import { useBprDetailsSelection } from '@/store/bprDetailsSlice';
import Card from '@/components/Card';
import { DayPicker, DateRange } from "react-day-picker";
import "react-day-picker/style.css";
import { useRouter } from 'next/navigation';
import { createActivityLog } from '@/utils/auxiliary/createActivityLog';


const Scheduling = () => {

  const { bpr } = useBprDetailsSelection()
  const router = useRouter()
  const [selectedRange, setSelectedRange] = useState<DateRange>()
  const [isSameDay, setIsSameDay] = useState<boolean>()
  const [isEdit, setIsEdit] = useState<boolean>(false)

  const handleDateSelection = async (range: DateRange | undefined) => {

    setSelectedRange(range)
  }

  const handleDateSave = async () => {
    if (!bpr || !selectedRange) {
      return
    }
    await productionActions.bprs.update2(bpr.id, {
      scheduledForStart: selectedRange?.from ?? null,
      scheduledForEnd: selectedRange?.to ?? selectedRange?.from ?? null,
    });

    setIsEdit(false);
    await createActivityLog('modifySchedule', 'bpr', bpr.id, { context: `The schedule date was set to start ${selectedRange?.from ? DateTime.fromJSDate(selectedRange.from).toFormat(dateFormatString) : ''} to ${selectedRange?.to ? DateTime.fromJSDate(selectedRange.to).toFormat(dateFormatString) : ''}` })
    router.refresh()
  }

  const handleClear = async () => {
    if (!bpr) return;

    await productionActions.bprs.update2(bpr.id, {
      scheduledForStart: null,
      scheduledForEnd: null,
    })
    await createActivityLog('modifySchedule', 'bpr', bpr.id, { context: `The schedule date was cleared.` })

    setIsEdit(false);
    router.refresh()
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
    if (!selectedRange?.from) {
      return (
        <span className="text-gray-500 italic">No dates selected</span>
      );
    }
    const luxonStartDate = toLuxonDateTime(selectedRange.from);
    const luxonEndDate = toLuxonDateTime(selectedRange.to || selectedRange.from);

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

    setSelectedRange({
      from: bpr.scheduledForStart ? new Date(bpr.scheduledForStart) : undefined,
      to: bpr.scheduledForEnd ? new Date(bpr.scheduledForEnd) : undefined
    })
  }, [bpr])

  useEffect(() => {
    if (!selectedRange) return;

    const { from, to } = selectedRange;

    let isSameDate = false;

    if (from && to) {
      const startDateTime = toLuxonDateTime(from);
      const endDateTime = toLuxonDateTime(to);

      if (startDateTime.isValid && endDateTime.isValid) {
        isSameDate = startDateTime.hasSame(endDateTime, 'day');
      } else {
        console.warn("Invalid date(s) received for comparison in useEffect.");
      }
    } else if (from) {
      isSameDate = true
    }
    setIsSameDay(isSameDate)
  }, [selectedRange])


  return (
    <Card.Root>
      <div className='flex justify-between items-center' >
        <Card.Title size='small' >Scheduling</Card.Title>

        {isEdit && (
          <div className='flex gap-2'>
            <button onClick={handleDateSave} className='btn btn-md flex items-center justify-center btn-circle'><TbDeviceFloppy className='size-5' /> </button>
            <button onClick={handleClear} className='btn btn-md flex items-center justify-center btn-circle'> <TbX className='size-5' /></button>
          </div>
        )}
        {!isEdit && (
          <button onClick={() => setIsEdit(true)} className='btn btn-sm'><span className='text-xl'>< IoCalendarOutline /></span></button>
        )}
      </div>


      {!isEdit && displayDate()}


      {isEdit &&
        <div className='flex justify-center'>
          <DayPicker
            mode="range"
            selected={selectedRange}
            onSelect={handleDateSelection}
            classNames={{
              chevron: `fill-base-content`, // Change the color of the chevron
              today: `border-1 border-dashed border-base-content`, // Add a border to today's date
              range_end: 'bg-secondar/50 rounded-full text-secondary-content',
              range_middle: 'bg-secondary/40 text-secondary-content rounded-xl',
              range_start: 'bg-secondar/50 rounded-full text-secondary-content',
              selected: `bg-secondary text-secondary-content`, // Highlight the selected day
            }}
          />
        </div>
      }



    </Card.Root>

  )
}

export default Scheduling
