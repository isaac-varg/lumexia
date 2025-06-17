'use client'
import { usePlanningDashboardSelection } from '@/store/planningDashboardSlice'
import MaterialSufficiencyLine from './MaterialSufficiencyLine'

const MaterialSufficiencyTable = () => {

    const { bomItemInventory } = usePlanningDashboardSelection()

    return (
        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Material Name</th>
                        <th>Required</th>
                        <th>Available </th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {bomItemInventory.map((material) => <MaterialSufficiencyLine key={material.id} material={material} />)}
                </tbody>
            </table>
        </div>
    )
}

export default MaterialSufficiencyTable
