import useDialog from "@/hooks/useDialog";
import { useItemSelection } from "@/store/itemSlice";
import { useRouter } from "next/navigation";
import AuditDialog from "./AuditDialog";

const ActionButtons = () => {

  const { showDialog } = useDialog()
  const { item } = useItemSelection();
  const router = useRouter();

  const handleAudit = () => {
    showDialog('inventoryMainAuditDialog')
  }

  const handlePurchaseRequest = () => {

    if (!item) return;

    router.push(`/purchasing/requests/new?itemId=${item.id}`)
  }

  if (!item) return false

  return (
    <div className="flex gap-x-6">
      <AuditDialog itemId={item.id} />

      <button
        onClick={() => handleAudit()}
        className="btn btn-secondary">
        Inventory Audit
      </button>

      <button
        onClick={() => handlePurchaseRequest()}
        className="btn btn-secondary">
        Request Purchase
      </button>


    </div>
  )
}

export default ActionButtons
