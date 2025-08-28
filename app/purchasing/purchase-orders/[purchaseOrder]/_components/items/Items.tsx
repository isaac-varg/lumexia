import ItemTable from "./ItemsTable"
import Totals from "./Totals"

const Items = () => {
  return (
    <div className="grid grid-cols-2 gap-6">
      <ItemTable />
      <Totals />
    </div>
  )
}

export default Items
