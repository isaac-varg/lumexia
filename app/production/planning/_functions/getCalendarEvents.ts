import { PlanningIBpr } from "./getBprs";

export const getCalendarEvents = ( bprs: PlanningIBpr[]) => {
   
    const events =  bprs.map((bpr) => {
        return {
            start: bpr.scheduledForStart,
            end: bpr.scheduledForEnd,
            id: bpr.id,
            title: `${bpr.producedItemName} <${bpr.referenceCode}>`,
            referenceCode: bpr.referenceCode
        }
    })

    return events;

}
