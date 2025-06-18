'use client'

import { usePlanningDashboardSelection } from "@/store/planningDashboardSlice"

const QcRecordsPanel = () => {

    const { qcExaminations } = usePlanningDashboardSelection()

    console.log(qcExaminations)

    return (
        <div></div>
    )
}

export default QcRecordsPanel
