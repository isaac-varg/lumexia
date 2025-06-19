'use client'

import Layout from "@/components/Layout"
import { Panels } from "@/components/Panels"
import Text from "@/components/Text"
import { usePlanningDashboardSelection } from "@/store/planningDashboardSlice"
import ExaminationCard from "./ExaminationCard"

const QcRecordsPanel = () => {

    const { qcExaminations } = usePlanningDashboardSelection()


    return (
        <Panels.Root span={2}>
            <Text.SectionTitle size="small">QC Examinations</Text.SectionTitle>

            {qcExaminations.length === 0 && <p className="font-poppins">Examinations not yet conducted</p>}

            {qcExaminations.length > 0 && <Layout.Grid cols={2}>

                {qcExaminations.map(e => <ExaminationCard key={e.id} examination={e} />)}

            </Layout.Grid>
            }
        </Panels.Root>
    )
}

export default QcRecordsPanel
