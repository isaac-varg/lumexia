'use client'
import { useState } from "react"
import ActionsPanel from "./ActionsPanel"
import InfoPanel from "./InfoPanel"
import TitlePanel from "./TitlePanel"

const RequestMain = () => {

    const [title, setTitle] = useState<string>('');

    return (
        <div className="flex items-center px-40">
            <div className="grid grid-cols-2 gap-8">

                <ActionsPanel />

                <InfoPanel />

                <TitlePanel onChange={setTitle} value={title} />

            </div>
        </div>
    )
}

export default RequestMain
