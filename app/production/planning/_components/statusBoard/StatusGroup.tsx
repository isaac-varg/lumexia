import React, { useMemo } from 'react'
import { SortableContext } from '@dnd-kit/sortable'
import { BatchProductionRecord } from '@/types/batchProductionRecord'
import { useDroppable } from '@dnd-kit/core'
import BprCard from './BprCard'
import { BprStatus } from '@/types/bprStatus'
import SortableBpr from './SortableBpr'

type StatusGroupProps = {
  status: BprStatus
  bprs: BatchProductionRecord[]
}

const bgClasses = {
  0: 'bg-neutral-100',
  1: 'bg-neutral-200',
  2: 'bg-indigo-100',
  3: 'bg-rose-100',
  4: 'bg-orange-100',
  5: 'bg-violet-100',
  6: 'bg-violet-200',
  7: 'bg-sky-100',
  8: 'bg-sky-200',
  9: 'bg-teal-100',
  10: 'bg-red-100',
  11: 'bg-red-200',
  12: 'bg-emerald-100',
}

const StatusGroup = ({ status, bprs }: StatusGroupProps) => {

  const { id, name, sequence } = status
  const bprIds = useMemo(() => {
    return bprs.map((bpr) => bpr.id)
  }, [bprs])

  const { setNodeRef } = useDroppable({
    id,
    data: {
      type: 'StatusGroup',
      status: status,
    }
  });
  


  return (

    <div className={`p-4 rounded-lg  h-full ${bgClasses[sequence as keyof typeof bgClasses]}`}>
      <span className='flex flex-row gap-x-2 font-poppins font-semibold text-lg'>
        <h1 className='text-neutral-900'>{name}</h1>
        <h1 className='text-neutral-500'>{bprs.length}</h1>
      </span>

      <div ref={setNodeRef} className='py-4 flex flex-col h-full w-full gap-y-2'>
        <SortableContext
          items={bprIds}
        >
          {bprs.map((bpr) => <SortableBpr key={bpr.id} bpr={bpr}> <BprCard bpr={bpr} /></SortableBpr>)}
        </SortableContext>

      </div>
    </div >
  )
}

export default StatusGroup
