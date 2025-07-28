'use client'

import { Panels } from "@/components/Panels"
import SectionTitle from "@/components/Text/SectionTitle"
import { useDiscrepancySelection } from "@/store/discrepancySlice"
import ActiveLots from "./ActiveLots"

const ItemView = () => {


    return (
        <Panels.Root>
            <SectionTitle size="small">Inspect Item</SectionTitle>

            <ActiveLots />


        </Panels.Root>
    )
}

export default ItemView
