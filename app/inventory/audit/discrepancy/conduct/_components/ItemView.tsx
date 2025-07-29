'use client'

import { Panels } from "@/components/Panels"
import ActiveLots from "./ActiveLots"
import NotesPanel from "./NotesPanel"
import { useDiscrepancySelection } from "@/store/discrepancySlice"

const ItemView = () => {

    const { item } = useDiscrepancySelection()

    if (!item) {
        return (
            <div className="flex flex-row justify-center items-center h-full min-h-[500px]">
                <h1 className="font-poppins text-5xl text-pink-400 animate-pulse font-bold">Scan to Start</h1>
            </div>
        )
    }

    return (
        <>
            <ActiveLots />
            <NotesPanel />
        </>
    )
}

export default ItemView
