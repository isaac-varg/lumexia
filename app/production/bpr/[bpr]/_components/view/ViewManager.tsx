'use client'
import { useProductionSelection } from "@/store/productionSlice"
import Staging from "../staging/Staging"
import { useAppSelection } from "@/store/appSlice"
import Primary from "../quality/Primary"
import Secondary from "../quality/Secondary"
import Compounding from "../compounding/Compounding"
import AwaitingVerification from "../blocked/AwaitingVerification"
import AwaitingProduction from "../blocked/AwaitingProduction"

// currently there isn't a need for separate components for
// primary and secondary verification, but they are being kept separate
// because it is likely quality control wants to change this in the future

export type BprViewStatus = 'staging' | 'primaryVerification' | 'secondaryVerification' | 'isCompounding';

const ViewManager = () => {

  const { viewStatuses } = useProductionSelection()
  const { user } = useAppSelection()



  return (
    <div>

      {(user?.roles.isProduction && !viewStatuses.isStaging && (viewStatuses.isPrimaryVerifcation || viewStatuses.isSecondaryVerification)) && <AwaitingVerification />}

      {(user?.roles.isProduction && viewStatuses.isStaging) && <Staging />}

      {(user?.roles.isProductionQuality && viewStatuses.isPrimaryVerifcation) && <Primary />}

      {(user?.roles.isProductionQualitySecondary && viewStatuses.isSecondaryVerification) && <Secondary />}

      {((user?.roles.isProductionQuality || user?.roles.isProductionQualitySecondary) && (!viewStatuses.isPrimaryVerifcation || !viewStatuses.isSecondaryVerification)) && <AwaitingProduction />}

      {(user?.roles.isProduction && viewStatuses.isCompounding) && <Compounding />}
    </div>
  )
}

export default ViewManager
