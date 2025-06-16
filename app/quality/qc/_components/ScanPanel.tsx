'use client'

import { useRouter } from "next/navigation"
import ScanListener from "./ScanListener"

const ScanPanel = () => {

    const router = useRouter()

    const handleItemSelection = (lot: string) => {
        router.push(`/quality/qc/examination/new?id=${lot}`)
    }


    return (
        <div className="flex items-center justify-center">
            <ScanListener handleItemSelection={(lot) => handleItemSelection(lot)} />

        </div>

    )
}

export default ScanPanel
