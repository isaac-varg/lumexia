import { DragOverEvent } from "@dnd-kit/core";
import { BatchProductionRecord } from "@/types/batchProductionRecord";
import { Dispatch, SetStateAction } from "react";
import { arrayMove } from "@dnd-kit/sortable";




export const handleDragOver = (event: DragOverEvent, batches: BatchProductionRecord[], setBatches: Dispatch<SetStateAction<BatchProductionRecord[]>>) => {

  const { active, over } = event;

  if (!over) return  // not over a valid droppable

  const activeId = active.id;
  const overId = over.id

  if (activeId === overId) return;

  const isActiveABpr = active.data.current?.type === "BPR" // not really necessary atm, but might make columns draggable too in future
  const isOverABpr = over.data.current?.type === "BPR"

  if (!isActiveABpr) return; // only want to handle dragging bpr 

  // dropping bpr over another bpr scenario
  if (isActiveABpr && isOverABpr) {
    setBatches((batches) => {
      const activeIndex = batches.findIndex((b: BatchProductionRecord) => b.id === activeId)
      const overIndex = batches.findIndex((b) => b.id === overId);

      batches[activeIndex].bprStatusId = batches[overIndex].bprStatusId

      return arrayMove(batches, activeIndex, overIndex);
    })
  }


  // dropping bpr over another status group

  const isOverAStatusGroup = over.data.current?.type === 'StatusGroup';

  if (isActiveABpr && isOverAStatusGroup) {
    setBatches((batches) => {
      const activeIndex = batches.findIndex((b: BatchProductionRecord) => b.id === activeId)

      batches[activeIndex].bprStatusId = overId as string
      return arrayMove(batches, activeIndex, activeIndex);
    })

  }



} 
