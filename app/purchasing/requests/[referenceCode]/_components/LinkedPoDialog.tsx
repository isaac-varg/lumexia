'use client'

import Dialog from "@/components/Dialog"
import { LinkedPos } from "../_functions/getLinkedPos"
import Form from "@/components/Form"
import { useForm } from "react-hook-form"
import useDialog from "@/hooks/useDialog"
import { useRouter } from "next/navigation"

type LinkedPoDialogProps = {
  purchaseOrder: LinkedPos
}

type Inputs = {
  weightPerContainer: number
  containerTypeId: string
  quantityOfContainers: number
}

const restructureAs = [
  { key: "id", rename: "value" },
  { key: "name", rename: "label" },
];

const LinkedPoDialog = ({ purchaseOrder }: LinkedPoDialogProps) => {

  const poItem = purchaseOrder.po.purchaseOrderItems[0];
  const poItemDetail = poItem?.details[0];

  const isNewDetailsEntry = !poItemDetail;
  const detailId = poItemDetail?.id;


  const defaultFormValues: Inputs = {
    weightPerContainer: 0,
    containerTypeId: '',
    quantityOfContainers: 0,
  }


  const form = useForm<Inputs>({ defaultValues: defaultFormValues })
  const router = useRouter()
  const { resetDialogContext } = useDialog()


  const handleSubmit = async (data: Inputs) => {



    //    if (isNewDetailsEntry) {
    //      const payload: Prisma.PurchaseOrderItemDetailUncheckedCreateInput = {
    //        weightUomId: uom.pounds,
    //        poItemId: purchaseOrder.po.purchaseOrderItems[0].id,
    //        containerTypeId: data.containerTypeId,
    //        weightPerContainer: data.weightPerContainer,
    //        quantityOfContainers: data.quantityOfContainers,
    //      }
    //
    //      await createPoItemDetails(payload);
    //      resetDialogContext()
    //      return;
    //    }
    //
    //    const payload: Prisma.PurchaseOrderItemDetailUncheckedUpdateInput = {
    //      containerTypeId: data.containerTypeId,
    //      weightPerContainer: data.weightPerContainer,
    //      quantityOfContainers: data.quantityOfContainers,
    //    }
    //
    //    if (!detailId) { throw new Error('No detail id was passed.') }

    //   await updatePoItemDetails(detailId, payload)
    resetDialogContext()

  }

  const handlePoTitleClick = () => {
    router.push(`/purchasing/purchase-orders/${purchaseOrder.po.referenceCode}?id=${purchaseOrder.poId}`)
  }

  return (
    <Dialog.Root identifier={`linkedPoDialog-${purchaseOrder.po.purchaseOrderItems[0].id}`}>
      <Dialog.Title>
        <span>Details for PO </span>
        <span onClick={() => handlePoTitleClick()} className="underline decoration-wavy hover:cursor-pointer text-base-content hover:text-accent">{`#${purchaseOrder.po.referenceCode} - ${purchaseOrder.po.supplier.name}`}</span>
      </Dialog.Title>
      <p>You can specify pack sizes for the order item.</p>


      <Form.Root form={form} onSubmit={(data) => handleSubmit(data)}>


        <button className="btn btn-neutral btn-soft" type="submit">Save</button>

      </Form.Root>

    </Dialog.Root>
  )
}

export default LinkedPoDialog
