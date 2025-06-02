'use client'

import ScanListener from "./ScanListener"

const ScanPanel = () => {

    const handleItemSelection = () => {

    }


    return (
        <div className="flex items-center justify-center">
            <ScanListener handleItemSelection={() => handleItemSelection()} />

        </div>

    )
}

export default ScanPanel
