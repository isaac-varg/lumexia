import { DragEndEvent } from "@dnd-kit/core";
import { updateBpr } from "./updateBpr";

export const handleDragEnd = (event: DragEndEvent) => {

  const { active, over } = event;

  if (!over) return  // not over a valid droppable

  const isOverABpr = over.data.current?.type === 'BPR'
  const isOverAStatusGroup = over.data.current?.type === "StatusGroup"

  const overStatusId = isOverAStatusGroup ? over.id : over.data.current?.bpr.bprStatusId;

 
  updateBpr(active.id as string, { bprStatusId: overStatusId})
 }
