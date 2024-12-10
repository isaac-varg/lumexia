import React from 'react'
import { PlanningIBpr } from '../../_functions/getBprs'

type UnscheduledBprProps = {
    bpr: PlanningIBpr,
onDraggableStart: (id: string, title: string) => void
}

const UnscheduledBpr = ({ bpr, onDraggableStart } : UnscheduledBprProps ) => {

    const { id, producedItemName, referenceCode } = bpr;
    const title = `${producedItemName} <${referenceCode}>`

    const handleDraggableStart = () => {
        onDraggableStart(id, title);
    }

  return (
      <button draggable={true} className='btn' id={id} onDragStart={() => handleDraggableStart()} >{title}</button>
  )
}

export default UnscheduledBpr
