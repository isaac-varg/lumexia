"use client"

import { usePlanningDashboardActions, usePlanningDashboardSelection } from "@/store/planningDashboardSlice";
import { useEffect } from "react";

const StateSetter = ({ bprId }: { bprId: string }) => {

    const { getBpr, getBom, getBprStatuses, getBomItemInventory, getQcExaminations, getQcGroups, getLastItemPrice, getBprNotes, getBprNoteTypes } = usePlanningDashboardActions()
    const { bprStatuses, bpr, bom } = usePlanningDashboardSelection()

    useEffect(() => {
        getBpr(bprId)
    }, [bprId])

    useEffect(() => {
        if (bprStatuses.length === 0) {
            getBprStatuses()
        }

        if (bpr) {
            getBom();
            getQcExaminations();
            getQcGroups()
            getLastItemPrice();
            getBprNotes();
            getBprNoteTypes();
        }

    }, [bpr])

    useEffect(() => {
        if (bom.length !== 0) {

            getBomItemInventory()
        }
    }, [bom])

    return false;

}

export default StateSetter
