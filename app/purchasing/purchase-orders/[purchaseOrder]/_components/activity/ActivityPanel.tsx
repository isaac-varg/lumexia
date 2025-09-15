'use client'
import Card from "@/components/Card"
import DataTable from "@/components/DataTable"
import { Filter } from "@/types/filter"
import { toFacetFilter } from "@/utils/data/toFacetFilter"
import { activityColumns } from "./ActivityColumns"
import { usePurchasingSelection } from "@/store/purchasingSlice"

const ActivityPanel = () => {

  const { activity } = usePurchasingSelection()

  const filters: Filter[] = [
    {
      columnName: "action",
      filterLabel: "Action",
      options: toFacetFilter(activity, "action", "action"),
    },
    {
      columnName: 'user',
      filterLabel: 'User',
      options: toFacetFilter(activity, 'user.id', 'user.name')
    }
  ];
  return (
    <Card.Root>
      <DataTable.Default
        data={activity}
        filters={filters}
        searchBg="elevated"
        columns={activityColumns}
        tableStateName='poActivity'
        onRowClick={() => console.log('No action')}
      />
    </Card.Root>
  )
}

export default ActivityPanel
