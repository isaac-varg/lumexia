import { BatchProductionRecord } from "@/types/batchProductionRecord";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type BprCardProps = {
  bpr: BatchProductionRecord
  children: React.ReactNode
}
import React from 'react'

const SortableBpr = ({ bpr, children }: BprCardProps) => {

  const { id } = bpr;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id,
    data: {
      type: "BPR",
      bpr,
    }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  if (isDragging) {
    return <div className="bg-blue-50 rounded-lg flex items-center p-4 justify-center opacity-50" > <h1 className="font-bold font-poppins text-xl">{bpr.referenceCode} </h1></div>
  }


  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} >{children}</div>
  )
}

export default SortableBpr
