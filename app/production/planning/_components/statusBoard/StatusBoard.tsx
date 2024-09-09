"use client"

import { BatchProductionRecord } from '@/types/batchProductionRecord'
import { DndContext, DragOverlay, MouseSensor, TouchSensor, closestCenter, closestCorners, useSensor, useSensors } from '@dnd-kit/core';
import { useState } from 'react';
import { handleDragStart } from '../../_functions/statusBoard/handleDragStart';
import StatusGroup from './StatusGroup';
import { handleDragOver } from '../../_functions/statusBoard/handleDragOver';
import { BprStatus } from '@/types/bprStatus';
import BprCard from './BprCard';
import { handleDragEnd } from '../../_functions/statusBoard/handleDragEnd';
import ScrollArea from '@/components/ScrollArea';

type StatusBoardProps = {
  bprs: BatchProductionRecord[]
  statuses: BprStatus[]
}


const StatusBoard = ({ bprs, statuses }: StatusBoardProps) => {
  const [batches, setBatches] = useState(bprs)
  const [activeBpr, setActiveBpr] = useState<BatchProductionRecord | null>(null);
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 5,
    },
  });

  const sensors = useSensors(
    mouseSensor,
    touchSensor,
  );


  return (
    <DndContext
      onDragStart={(event) => handleDragStart(event, setActiveBpr)}
      onDragOver={(event) => handleDragOver(event, batches, setBatches)}
      onDragEnd={(event) => handleDragEnd(event)}
      collisionDetection={closestCenter}
      sensors={sensors}
    >
      <div className='grid grid-cols-5 gap-4 '>
        {statuses.map((status) => {
          const batchesInStatus = batches.filter((bpr) => bpr.bprStatusId === status.id);
          return (

            <StatusGroup
              key={status.id}
              status={status}
              bprs={batchesInStatus}
            />
          );
        })}
      </div>
      <DragOverlay>
        {activeBpr && <BprCard bpr={activeBpr} />}
      </DragOverlay>
    </DndContext>

  )
}

export default StatusBoard;

