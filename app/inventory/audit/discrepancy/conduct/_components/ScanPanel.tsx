'use client'
import { Panels } from "@/components/Panels"
import ScanListener from "@/components/Scan/ScanListener"
import SectionTitle from "@/components/Text/SectionTitle"
import { useDiscrepancyActions, useDiscrepancySelection } from "@/store/discrepancySlice"

const ScanPanel = () => {

    const { mode, item } = useDiscrepancySelection()
    const { setSelectedItem } = useDiscrepancyActions()
    const handleScan = (lotId: string) => {

        setSelectedItem(lotId);
    }

    return (
        <Panels.Root>

            <SectionTitle size="small">{!item  ? 'Scan To Start' : 'Scan To Switch Items'}</SectionTitle>


            <ScanListener onScanComplete={handleScan} />

        </Panels.Root>
    )
}

export default ScanPanel
