import DataTable from "@/components/DataTable"
import { useItemActions, useItemSelection } from "@/store/itemSlice"
import { Filter } from "@/types/filter"
import { lotsColumns } from "./LotsColumns"
import { InventoryLot } from "@/actions/auxiliary/getLotsByItem"
import Card from "@/components/Card"

const LotsTable = () => {

  const { inventory } = useItemSelection()
  const { setLotsViewMode, setSelectedLot } = useItemActions()

  const handleRowClick = (row: InventoryLot) => {

    setLotsViewMode('lot')
    setSelectedLot(row)


  }

  const filters: Filter[] = [
    {
      columnName: "isDepleted",
      filterLabel: "Is Depleted",
      options: [{ value: true, label: 'True' }, { value: false, label: 'false' }]
    },
  ];

  if (!inventory) return false

  return (
    <Card.Root>
      <DataTable.Default
        data={inventory.lots}
        columns={lotsColumns}
        searchBg="elevated"
        filters={filters}
        onRowClick={(row) => handleRowClick(row.original)}
        initialSortBy={[{
          id: 'totalQuantityOnHand',
          desc: true,
        }]}
        tableStateName="inventoryLots"
        initialColumnFilters={[
          { id: 'isDepleted', value: [false] }
        ]}


      />
    </Card.Root>
  )
}

export default LotsTable
