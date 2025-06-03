'use client'

import { Panels } from "@/components/Panels"
import Text from "@/components/Text"
import { useQcExaminationActions, useQcExaminationSelection } from "@/store/qcExaminationSlice"
import { useEffect } from "react"

const LotSelectionStep = () => {

    const { allLots } = useQcExaminationSelection()
    const { getLots } = useQcExaminationActions()
    useEffect(() => {
        if (allLots.length === 0) {
            console.log('ranmelots')
            getLots();
        }
    }, [allLots])


    return (
        <div className="grid grid-cols-3 gap-4">
            <Panels.Root>
                <Text.SectionTitle size="small">Recently Received </Text.SectionTitle>
            </Panels.Root>
            <Panels.Root>
                <Text.SectionTitle size="small">Active Batches</Text.SectionTitle>
            </Panels.Root>

            <Panels.Root>
                <Text.SectionTitle size="small">Search</Text.SectionTitle>
            </Panels.Root>

        </div>
    )
}

export default LotSelectionStep
