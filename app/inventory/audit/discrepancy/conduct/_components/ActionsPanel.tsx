import { Panels } from "@/components/Panels"
import SectionTitle from "@/components/Text/SectionTitle"
import { useDiscrepancyActions, useDiscrepancySelection } from "@/store/discrepancySlice"

const ActionsPanel = () => {

    const { setDiscrepancyAppMode } = useDiscrepancyActions()
    const { mode } = useDiscrepancySelection()

    const handleModeClick = () => {
        if (mode === 'view') {
            setDiscrepancyAppMode('item')
            return;
        }

        setDiscrepancyAppMode('view')

    }
    return (
        <Panels.Root>

            <SectionTitle size="small">Actions</SectionTitle>

            <div className="grid grid-cols-1 gap-4">
                <button className="btn" onClick={() => handleModeClick()} >{mode === 'item' ? 'View Audit Progress' : 'Conduct Audit'}</button>




            </div>


        </Panels.Root>
    )
}

export default ActionsPanel
