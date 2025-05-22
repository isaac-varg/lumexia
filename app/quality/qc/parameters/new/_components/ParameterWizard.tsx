'use client'

import { useState } from "react"
import ModeSelector from "./ModeSelector"
import ManualEntry from "./ManualEntry"
import AiEntry from "./AiEntry"

// not really a wizard but here we are

const ParameterWizard = () => {

    const [mode, setMode] = useState<'manual' | 'ai' | null>(null)

    return (
        <div>


            {!mode && <ModeSelector setMode={setMode} />}

            {mode === 'manual' && <ManualEntry />}

            {mode === 'ai' && <AiEntry />}



        </div>
    )
}

export default ParameterWizard
