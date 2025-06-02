import Text from "@/components/Text"
import { useState } from "react"
import AiEntry from "./AiEntry"
import TemplateEntry from "./TemplateEntry"

const ItemParametersAddMode = () => {

    const [mode, setMode] = useState<"ai" | "single" | "template" | null>(null)

    return (
        <>
            <Text.SectionTitle>Add QC Parameters</Text.SectionTitle>


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



            {mode === 'ai' && <AiEntry />}
            {mode === 'template' && <TemplateEntry />}


        </>
    )
}






export default ItemParametersAddMode
