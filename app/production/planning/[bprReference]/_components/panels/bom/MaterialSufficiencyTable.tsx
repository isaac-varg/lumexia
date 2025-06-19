'use client'
import { usePlanningDashboardSelection } from '@/store/planningDashboardSlice'
import MaterialSufficiencyLine from './MaterialSufficiencyLine'
import MaterialAllocationDialog from './MaterialAllocationDialog'
import { staticRecords } from '@/configs/staticRecords'

const MaterialSufficiencyTable = () => {

    const { bomItemInventory, bpr } = usePlanningDashboardSelection()
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
                            <th>Required</th>
                            <th>Available </th>
                            {isDraft && <th></th>}
                            {!isDraft && <th>Staged</th>}
                            {!isDraft && <th>1° Verification</th>}
                            {!isDraft && <th>2° Verification</th>}

                       </tr>
                    </thead>

                    <tbody>
                        {bomItemInventory.map((material) => <MaterialSufficiencyLine key={material.id} material={material} isDraft={isDraft} />)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default MaterialSufficiencyTable
