'use client'
import { Panels } from "@/components/Panels"
import SectionTitle from "@/components/Text/SectionTitle"
import { useState } from "react"
import { RequestLink } from "../../_actions/getAllRequestLinks"
import CreateViewMode from "./CreateViewMode"
import { ItemType } from "@/actions/inventory/itemTypes/getAll"
import CreateAddMode from "./CreateAddMode"

type Props = {
    links: RequestLink[]
    requestId: string
    itemTypes: ItemType[]
}

const CreatePanel = ({ links, requestId, itemTypes }: Props) => {

    const [mode, setMode] = useState<'view' | 'add'>('view');

    return (
        <Panels.Root span={2}>

            <SectionTitle size="small">Items & Requests</SectionTitle>

            {mode === 'view' && <CreateViewMode setMode={setMode} links={links} />}
            {mode === 'add' && <CreateAddMode setMode={setMode} requestId={requestId} itemTypes={itemTypes} />}

        </Panels.Root>
    )
}




export default CreatePanel
