'use client'
import { useProductionSelection } from "@/store/productionSlice"
import Staging from "../staging/Staging"
import { useAppSelection } from "@/store/appSlice"
import Primary from "../quality/Primary"

// currently there isn't a need for separate components for
// primary and secondary verification, but they are being kept separate
// because it is likely quality control wants to change this in the future

export type BprViewStatus = 'staging' | 'primaryVerification' | 'secondaryVerification'

const ViewManager = () => {

  const { viewStatuses } = useProductionSelection()
  const { user } = useAppSelection()


  return (
    <div>

      {(user?.roles.isProduction && viewStatuses.isStaging) && <Staging />}

      {(user?.roles.isProductionQuality && viewStatuses.isPrimaryVerifcation) && <Primary />}
    </div>
  )
}

export default ViewManager
