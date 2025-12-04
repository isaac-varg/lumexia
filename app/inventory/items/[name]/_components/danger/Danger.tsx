import ArchiveButton from "./ArchiveButton"
import ChangeInventoryUom from "./ChangeInventoryUom"

const Danger = () => {
  return (
    <div className="grid grid-cols-3 gap-8">

      <ArchiveButton />

      <ChangeInventoryUom />

    </div>
  )
}

export default Danger
