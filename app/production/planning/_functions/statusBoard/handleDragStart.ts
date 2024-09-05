import { BatchProductionRecord } from "@/types/batchProductionRecord";
import { DragStartEvent } from "@dnd-kit/core";

export const handleDragStart = (event: DragStartEvent, setActiveBpr: (bpr: BatchProductionRecord) => void) => {
  const { active } = event;
  setActiveBpr(active.data.current?.bpr);
  return;
}
