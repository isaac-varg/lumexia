'use client'
import Card from "@/components/Card"
import StepTrack from "./StepTrack"
import { useState } from "react"
import ScanStep from "./ScanStep"
import { validateLot } from "../../_actions/stagings/validateLot"
import { useProductionActions, useProductionSelection } from "@/store/productionSlice"
import useDialog from "@/hooks/useDialog"
import { createActivityLog } from "@/utils/auxiliary/createActivityLog"
import AlertInvalidLot from "./AlertInvalidLot"
import QuantityStep from "./QuantityStep"
import PhotoStep, { StagingImage } from "./PhotoStep"
import { validateQuantity } from "../../_actions/stagings/validateQuantity"
import AlertInvalidQuantity from "./AlertInvalidQuantity"
import { handleStagingCascade } from "../../_actions/stagings/handleStagingCascade"

const StagedAddMode = () => {
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [scannedLot, setScannedLot] = useState<string>('')
  const [quantity, setQuantity] = useState<number | null>(null)
  const { selectedBomItem, bpr } = useProductionSelection()
  const { fetchStagings, setStagingsMode } = useProductionActions()
  const { showDialog } = useDialog()

  const handleLotScan = async (lot: string) => {

    if (!selectedBomItem || !bpr) return false;
    const isLotValid = await validateLot(lot, selectedBomItem.bom.item.id)

    if (isLotValid) {
      setScannedLot(lot);
      setCurrentStep(1);
    }

    if (!isLotValid) {
      // lot the invalid scan
      createActivityLog('scannedInvalidLot', 'bpr', bpr.id, { context: `A lot for a material that is invalid for this BOM was scanned but denied.`, bomItem: selectedBomItem.bom.item.name })
      // show warning
      showDialog(`lotInvalid`)
      // reset this state
      setScannedLot('');
      setCurrentStep(0)
      //
    }
  }

  const handleQuantitySubmit = async (submittedQuantity: number) => {

    if (!scannedLot || !bpr || !selectedBomItem) return;
    // this isn't really possible with the ui so not showing error
    if (submittedQuantity <= 0) return;

    const isValid = await validateQuantity(scannedLot, submittedQuantity);

    if (isValid) {
      setQuantity(submittedQuantity)
      setCurrentStep(2);
      return;
    }

    showDialog('quantityInvalid')
    setQuantity(null)
    createActivityLog('quantityError', 'bpr', bpr.id, { context: `There is insufficient on-hand inventory for the quantity attempting to be staged. Amount was not accepted and user directed to adjust staged amount or audit the inventory.`, bomItem: selectedBomItem.bom.item.name })

  };

  const handleImagesSubmit = async (images: StagingImage[]) => {

    if (!quantity || !selectedBomItem) return;
    // last step so submit
    await handleStagingCascade(selectedBomItem.id, scannedLot, quantity, images, selectedBomItem.bprId, selectedBomItem.bom.item.name, selectedBomItem.bom.identifier)
    fetchStagings(selectedBomItem.id)
    setStagingsMode('view')

  }


  return (
    <Card.Root>
      <AlertInvalidLot />
      <AlertInvalidQuantity />
      <StepTrack currentStep={currentStep} />

      <ScanStep onLotScan={handleLotScan} currentStep={currentStep} />
      <QuantityStep onQuantitySubmit={handleQuantitySubmit} currentStep={currentStep} />
      <PhotoStep currentStep={currentStep} onImagesSubmit={handleImagesSubmit} />


    </Card.Root>
  )
}



export default StagedAddMode
