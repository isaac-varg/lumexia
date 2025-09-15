'use client'
import { usePlanningDashboardSelection } from '@/store/planningDashboardSlice'
import MaterialSufficiencyLine from './MaterialSufficiencyLine'
import MaterialAllocationDialog from './MaterialAllocationDialog'
import { staticRecords } from '@/configs/staticRecords'
import { useAppQuerySelection } from '@/store/appQuerySlice'
import { useAppSelection } from '@/store/appSlice'
import { useBprDetailsSelection } from '@/store/bprDetailsSlice'

const MaterialSufficiencyTable = () => {

  const { bomInventory, bpr } = useBprDetailsSelection()
  const { user } = useAppSelection();
  const status = bpr?.status.id
  const isDraft = status === staticRecords.production.bprStatuses.draft

  return (
    <div>

      <MaterialAllocationDialog />
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Material Name</th>
              {isDraft ? <th>Required</th> : <th>Needed for Another Batch</th>}
              {isDraft ? <th>Available </th> : (user?.roles.isPurchasing ? <th>Available for Another Batch</th> : null)}
              {isDraft && <th></th>}
              {!isDraft && <th>Staged</th>}
              {!isDraft && <th>1° Verification</th>}
              {!isDraft && <th>2° Verification</th>}

            </tr>
          </thead>

          <tbody>
            {bomInventory.map((material) => <MaterialSufficiencyLine key={material.id} material={material} isDraft={isDraft} />)}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MaterialSufficiencyTable
