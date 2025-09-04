'use client'
import { BatchProductionRecord } from '@/types/batchProductionRecord'
import React from 'react'
import { DateTime } from 'luxon'
import { useTranslation } from '@/hooks/useTranslation'
import SectionTitle from '@/components/Text/SectionTitle'
import { translationsBprProduction } from '../../_configs/translations'
import DayPanel from './DayPanel'
import { ProducibleBpr } from '../../_actions/getProducibleBprs'

const Bprs = ({ bprs }: { bprs: ProducibleBpr[] }) => {

  const { t } = useTranslation();
  const productionDaysOfWeek = [
    {
      day: t(translationsBprProduction, 'monday'),
      bg: 'bg-accent/20',
      date: getDate(0)
    },
    {
      day: t(translationsBprProduction, 'tuesday'),
      bg: 'bg-accent/35',
      date: getDate(1),
    },
    {
      day: t(translationsBprProduction, 'wednesday'),
      bg: 'bg-accent/50',
      date: getDate(2),
    },
    {
      day: t(translationsBprProduction, 'thursday'),
      bg: 'bg-accent/65',
      date: getDate(3)
    }
  ];

  const nextProductionDaysOfWeek = [
    {
      day: t(translationsBprProduction, 'monday'),
      bg: 'bg-accent/20',
      date: getDate(0, 1)
    },
    {
      day: t(translationsBprProduction, 'tuesday'),
      bg: 'bg-accent/35',
      date: getDate(1, 1),
    },
    {
      day: t(translationsBprProduction, 'wednesday'),
      bg: 'bg-accent/50',
      date: getDate(2, 1),
    },
    {
      day: t(translationsBprProduction, 'thursday'),
      bg: 'bg-accent/65',
      date: getDate(3, 1)
    }
  ];

  return (


    <div className='flex flex-col gap-y-6'>
      <SectionTitle>        {t(translationsBprProduction, 'titleThisWeek')}
      </SectionTitle>

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

      <SectionTitle>        {t(translationsBprProduction, 'titleNextWeek')}
      </SectionTitle>

      <div className='grid grid-cols-4 gap-4'>
        {nextProductionDaysOfWeek.map((day) => (
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

export const getDate = (dayOfWeek: number, weekOffset: number = 0) => {
  return DateTime.now().plus({ weeks: weekOffset }).startOf('week').plus({ days: dayOfWeek }).toISODate();
}

export default Bprs;
