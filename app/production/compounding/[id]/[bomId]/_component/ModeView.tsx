"use client"

import { useState } from "react"
import EntryWizard from "./EntryWizard"
import ScanHistory from "./ScanHistory"

const ModeView = ({ bomItem, stagings }: { bomItem: any, stagings: any }) => {
  const [isViewMode, setIsViewMode] = useState(true)

  return (
    <div>
      {isViewMode && <ScanHistory setIsViewMode={setIsViewMode} bomItem={bomItem} stagings={stagings} />}
      {!isViewMode && <EntryWizard setIsViewMode={setIsViewMode} bomItem={bomItem} />}
    </div>
  )
}

export default ModeView
