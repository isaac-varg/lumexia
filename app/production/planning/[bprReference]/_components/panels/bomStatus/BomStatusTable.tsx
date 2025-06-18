import { usePlanningDashboardSelection } from "@/store/planningDashboardSlice"

const BomStatusTable = () => {
    const { bomItemInventory } = usePlanningDashboardSelection()
    return (
        <div>
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
                    </tbody>
                </table>
            </div>
        </div>

    )
}

export default BomStatusTable
