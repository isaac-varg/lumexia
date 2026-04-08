import ArchiveButton from "./ArchiveButton"
import ChangeInventoryUom from "./ChangeInventoryUom"
import ExportDataVerificationPackage from "./ExportDataVerificationPackage"

const Danger = () => {
  return (
    <div className="grid grid-cols-3 gap-8">

      <ArchiveButton />

      <ChangeInventoryUom />

      <ExportDataVerificationPackage />

    </div>
  )
}

export default Danger
