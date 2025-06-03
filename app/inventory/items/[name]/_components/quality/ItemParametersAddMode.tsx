import Text from "@/components/Text"
import { useState } from "react"
import AiEntry from "./AiEntry"
import TemplateEntry from "./TemplateEntry"
import { useItemDashboardActions } from "@/store/itemDashboardSlice"

const ItemParametersAddMode = () => {

    const [mode, setMode] = useState<"ai" | "single" | "template" | null>(null)
    const { setItemParametersPanelMode } = useItemDashboardActions()

    return (
        <>
            <div className="flex justify-between items-center">

                <Text.SectionTitle>Add QC Parameters</Text.SectionTitle>

            </div>


            {!mode && (<div className="grid grid-cols-3 gap-6">
                <button className="btn" onClick={() => setMode('ai')}>
                    AI & PDF
                </button>

                <button className="btn" onClick={() => setMode('single')}>
                    Single
                </button>

                <button className="btn" onClick={() => setMode('template')}>
                    Template
                </button>


            </div>

            )}


            {!mode && <div className="flex justify-end"><button onClick={() => setItemParametersPanelMode('view')} className="btn btn-warning">Cancel</button></div>}



            {mode === 'ai' && <AiEntry />}
            {mode === 'template' && <TemplateEntry />}




        </>
    )
}






export default ItemParametersAddMode
