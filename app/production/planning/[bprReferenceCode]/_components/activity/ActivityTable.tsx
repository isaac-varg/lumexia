import DataTable from "@/components/DataTable";
import { useBprDetailsSelection } from "@/store/bprDetailsSlice";
import { Filter } from "@/types/filter";
import { toFacetFilter } from "@/utils/data/toFacetFilter";
import { activityColumns } from "./ActivityColumns";

const ActivityTable = () => {

  const { activity } = useBprDetailsSelection()
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
    <DataTable.Default
      data={activity}
      filters={filters}
      searchBg="elevated"
      columns={activityColumns}
      tableStateName='poActivity'
      onRowClick={() => console.log('No action')}
    />

  )
}

export default ActivityTable
