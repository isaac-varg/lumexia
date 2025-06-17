'use client'

import { staticRecords } from "@/configs/staticRecords"
import { usePlanningDashboardSelection } from "@/store/planningDashboardSlice"
import MaterialSufficiencyTable from "./MaterialSufficiencyTable"
import { Panels } from "@/components/Panels"
import Text from "@/components/Text"

const BomMain = () => {

    const { bpr, bomItemInventory } = usePlanningDashboardSelection()
    const status = bpr?.status.id

    console.log(bomItemInventory)
    return (
        <Panels.Root span={3}>
            <Text.SectionTitle size="small">Bill of Materials</Text.SectionTitle>

            {status === staticRecords.production.bprStatuses.draft && <MaterialSufficiencyTable />}

        </Panels.Root>
    )
}

export default BomMain
