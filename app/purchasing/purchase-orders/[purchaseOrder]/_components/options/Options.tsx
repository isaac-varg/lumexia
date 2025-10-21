import { accountingActions } from "@/actions/accounting"
import { purchasingActions } from "@/actions/purchasing"
import purchaseOrderActions from "@/actions/purchasing/purchaseOrderActions"
import purchaseOrderItemActions from "@/actions/purchasing/purchaseOrderItemActions"
import { getUserId } from "@/actions/users/getUserId"
import Card from "@/components/Card"
import { poAccountingStatuses } from "@/configs/staticRecords/poAccountingStatuses"
import { purchaseOrderStatuses } from "@/configs/staticRecords/purchaseOrderStatuses"
import { recordStatuses } from "@/configs/staticRecords/recordStatuses"
import { usePurchasingActions, usePurchasingSelection } from "@/store/purchasingSlice"
import { useTabActions } from "@/store/tabSlice"
import { createActivityLog } from "@/utils/auxiliary/createActivityLog"
import { useRouter } from "next/navigation"

const Options = () => {

  const { purchaseOrder, orderItems } = usePurchasingSelection()
  const { setActiveTab } = useTabActions()
  const router = useRouter()

  const handleDuplicate = async () => {

    if (!purchaseOrder || orderItems.length === 0) return;

    const { supplierId, referenceCode } = purchaseOrder;

    const userId = await getUserId()
    const newPurchaseOrder = await purchaseOrderActions.createNew({
      submittingUserId: userId,
      supplierId,
      statusId: purchaseOrderStatuses.draft,
    });

    await accountingActions.pos.details.create({
      statusId: poAccountingStatuses.notStarted,
      purchaseOrderId: newPurchaseOrder.id,
      paid: false,
      packingSlipReceived: false,
      paperworkGivenToAdmin: false,
    });


    await createActivityLog('Duplicated PO', 'purchaseOrder', purchaseOrder.id, { context: `This PO was created from duplicating PO #${referenceCode}` })

    await Promise.all(orderItems.map(async (i) => {
      return await purchaseOrderItemActions.createNew({
        purchaseOrderId: newPurchaseOrder.id,
        itemId: i.itemId,
        quantity: i.quantity,
        pricePerUnit: i.pricePerUnit,
        uomId: i.uomId,
        purchaseOrderStatusId: purchaseOrderStatuses.draft,
      })
    }));

    const path = `/purchasing/purchase-orders/${newPurchaseOrder.referenceCode}?id=${newPurchaseOrder.id}`
    router.push(path)
    setActiveTab('purchasing', 'items')
  }

  const handleArchive = async () => {
    if (!purchaseOrder) return;

    await purchaseOrderActions.update({ id: purchaseOrder.id }, {
      recordStatusId: recordStatuses.archived,
    });

    await createActivityLog('Archived PO', 'purchaseOrder', purchaseOrder.id, { context: 'The PO was archived.' })
    router.push("/purchasing/purchase-orders")
    router.refresh();

  }

  return (
    <div className="">
      <Card.Root>
        <div className="grid col-span-4 ">
          <div className="flex gap-4 items-center justify-center">
            <button className="btn btn-primary min-w-60 btn-lg min-h-30 btn-outline" onClick={() => handleDuplicate()}>
              Duplicate
            </button>

            <button className="btn btn-lg min-h-30 min-w-60 btn-error btn-outline" onClick={() => handleArchive()}>
              Archive
            </button>

          </div>

        </div>

      </Card.Root>


    </div>
  )
}

export default Options
