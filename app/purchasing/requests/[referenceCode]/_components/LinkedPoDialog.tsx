'use client'

import Dialog from "@/components/Dialog"
import { LinkedPos } from "../_functions/getLinkedPos"
import Form from "@/components/Form"
import { useForm } from "react-hook-form"
import { Containers } from "../_functions/getContainerTypes"
import { restructureData } from "@/utils/data/restructureData"
import { SelectOption } from "@/types/selectOption"
import { Prisma } from "@prisma/client"
import { createPoItemDetails } from "../_functions/createPoItemDetail"
import { updatePoItemDetails } from "../_functions/updatePoItemDetails"
import useDialog from "@/hooks/useDialog"
import { useRouter } from "next/navigation"
import { uom } from "@/configs/staticRecords/unitsOfMeasurement"

type LinkedPoDialogProps = {
  containerTypes: Containers[]
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

const LinkedPoDialog = ({ purchaseOrder, containerTypes }: LinkedPoDialogProps) => {

  const poItem = purchaseOrder.po.purchaseOrderItems[0];
  const poItemDetail = poItem?.details[0];

  const isNewDetailsEntry = !poItemDetail;
  const detailId = poItemDetail?.id;

  const { weightPerContainer, containerTypeId, quantityOfContainers } = poItemDetail || { weightPerContainer: 0, containerTypeId: '', quantityOfContainers: 0 };


  const defaultFormValues: Inputs = {
    weightPerContainer,
    containerTypeId,
    quantityOfContainers,
  }


  const form = useForm<Inputs>({ defaultValues: defaultFormValues })
  const router = useRouter()
  const { resetDialogContext } = useDialog()

  const containerTypeOptions = restructureData(containerTypes, restructureAs) as SelectOption[]

  const handleSubmit = async (data: Inputs) => {



    if (isNewDetailsEntry) {
      const payload: Prisma.PurchaseOrderItemDetailUncheckedCreateInput = {
        weightUomId: uom.pounds,
        poItemId: purchaseOrder.po.purchaseOrderItems[0].id,
        containerTypeId: data.containerTypeId,
        weightPerContainer: data.weightPerContainer,
        quantityOfContainers: data.quantityOfContainers,
      }

      await createPoItemDetails(payload);
      resetDialogContext()
      return;
    }

    const payload: Prisma.PurchaseOrderItemDetailUncheckedUpdateInput = {
      containerTypeId: data.containerTypeId,
      weightPerContainer: data.weightPerContainer,
      quantityOfContainers: data.quantityOfContainers,
    }

    if (!detailId) { throw new Error('No detail id was passed.') }

    await updatePoItemDetails(detailId, payload)
    resetDialogContext()

  }

  const handlePoTitleClick = () => {
    router.push(`/purchasing/purchase-orders/${purchaseOrder.po.referenceCode}?id=${purchaseOrder.poId}`)
  }

  return (
    <Dialog.Root identifier={`linkedPoDialog-${purchaseOrder.po.purchaseOrderItems[0].id}`}>
      <Dialog.Title>
        <span>Details for PO# </span>
        <span onClick={() => handlePoTitleClick()} className="underline decoration-wavy hover:cursor-pointer hover:text-sky-900 ">{`${purchaseOrder.po.referenceCode} - ${purchaseOrder.po.supplier.name}`}</span>
      </Dialog.Title>
      <p>You can specify pack sizes for the order item.</p>



      <Form.Root form={form} onSubmit={(data) => handleSubmit(data)}>


        <Form.Number form={form} label="Weight per Container" fieldName="weightPerContainer" required />

        <Form.Select form={form} label="Container Type" fieldName="containerTypeId" options={containerTypeOptions} />

        <Form.Number form={form} label="Quantity of Containers" fieldName="quantityOfContainers" required />

        <button className="btn btn-neutral btn-soft" type="submit">Save</button>

      </Form.Root>

    </Dialog.Root>
  )
}

export default LinkedPoDialog
