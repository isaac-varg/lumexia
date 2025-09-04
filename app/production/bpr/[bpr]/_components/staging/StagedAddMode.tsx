'use client'
import Card from "@/components/Card"
import StepTrack from "./StepTrack"
import { useEffect, useState } from "react"
import ScanStep from "./ScanStep"
import { validateLot } from "../../_actions/stagings/validateLot"
import { useProductionSelection } from "@/store/productionSlice"

const StagedAddMode = () => {
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [scannedLot, setScannedLot] = useState<string>('')
  const { selectedBomItem } = useProductionSelection()

  const handleLotScan = async (lot: string) => {
    if (!selectedBomItem) return false;
    const isLotValid = await validateLot(lot, selectedBomItem.bom.item.id)

    if (isLotValid) {
      setScannedLot(lot);
      setCurrentStep(1);
    }

    if (!isLotValid) {
      // lot the invalid scan
      // show warning
      // reset this state
      //
    }
  }


  return (
    <Card.Root>

      {currentStep}
      <StepTrack currentStep={currentStep} />

      <ScanStep onLotScan={handleLotScan} currentStep={currentStep} />


    </Card.Root>
  )
}



export default StagedAddMode
