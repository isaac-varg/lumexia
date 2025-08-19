import Datatable from "@/app/purchasing/requests/archive/_components/Datatable"
import Card from "@/components/Card"
import DataTable from "@/components/DataTable"
import { useItemSelection } from "@/store/itemSlice"
import { activityColumns } from "./ActivityColumns"
import { Filter } from "@/types/filter"
import { toFacetFilter } from "@/utils/data/toFacetFilter"

const Activity = () => {

  const { activity } = useItemSelection()

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
    <Card.Root span={2}>

      <Card.Title>Activity</Card.Title>


      <DataTable.Default
        data={activity}
        filters={filters}
        columns={activityColumns}
        onRowClick={() => console.log('ehy')}
        tableStateName='itemActivity'
        searchBg="elevated"
      />

    </Card.Root>
  )
}

export default Activity
