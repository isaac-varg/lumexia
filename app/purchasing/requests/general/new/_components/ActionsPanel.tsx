import { Panels } from "@/components/Panels"
import SectionTitle from "@/components/Text/SectionTitle"

const ActionsPanel = () => {
    return (
        <Panels.Root>

            <SectionTitle size="small">Actions</SectionTitle>

            <div className="grid grid-cols-1 gap-4">

                <button className="btn">Commit</button>
            </div>
        </Panels.Root>
    )

}

export default ActionsPanel
