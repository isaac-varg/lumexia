'use client'
import { useProductionSelection } from "@/store/productionSlice"
import Staging from "../staging/Staging"

export type BprViewStatus = 'staging' | 'primaryVerification' | 'secondaryVerification'

const ViewManager = () => {

  const { viewStatuses } = useProductionSelection()



  return (
    <div>

      {viewStatuses.isStaging && <Staging />}
    </div>
  )
}

export default ViewManager
