'use client'

import { usePlanningDashboardSelection } from "@/store/planningDashboardSlice"
import MaterialSufficiencyTable from "./bom/MaterialSufficiencyTable"
import { Panels } from "@/components/Panels"
import Text from "@/components/Text"

const BomMain = () => {

    const { bpr  } = usePlanningDashboardSelection()
    const status = bpr?.status.id

    return (
        <Panels.Root span={3}>
            <Text.SectionTitle size="small">Bill of Materials</Text.SectionTitle>

            <MaterialSufficiencyTable />


        </Panels.Root>
    )
}

export default BomMain
