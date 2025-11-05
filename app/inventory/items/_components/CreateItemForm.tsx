"use client";
import { revalidatePage } from "@/actions/app/revalidatePage";
import { Uom } from "@/actions/inventory/getAllUom";
import itemActions from "@/actions/inventory/items";
import Dialog from "@/components/Dialog";
import Form from "@/components/Form";
import { recordStatuses } from "@/configs/staticRecords/recordStatuses";
import useDialog from "@/hooks/useDialog";
import { InventoryType } from "@/types/inventoryType";
import { ItemType } from "@/types/itemType";
import { ProcurementType } from "@/types/procurementType";
import { SelectOption } from "@/types/selectOption";
import { createActivityLog } from "@/utils/auxiliary/createActivityLog";
import { restructureData } from "@/utils/data/restructureData";
import { Prisma } from "@prisma/client";
import React from "react";
import { useForm } from "react-hook-form";

type Inputs = {
  name: string;
  referenceCode: string;
  itemTypeId: string;
  inventoryTypeId: string;
  procurementTypeId: string;
  inventoryUomId: string;
};

type CreateItemFormProps = {
  itemTypes: ItemType[];
  inventoryTypes: InventoryType[];
  procurementTypes: ProcurementType[];
  uoms: Uom[];
};


const CreateItemForm = ({
  itemTypes,
  inventoryTypes,
  procurementTypes,
  uoms,

}: CreateItemFormProps) => {
  const form = useForm<Inputs>();
  const restructureAs = [
    { key: "id", rename: "value" },
    { key: "name", rename: "label" },
  ];

  const { resetDialogContext } = useDialog();

  const handleSubmit = async (data: Inputs) => {
    const payload: Prisma.ItemUncheckedCreateInput = {
      recordStatusId: recordStatuses.active,
      ...data
    };

    const response = await itemActions.createNew({ ...payload });
    await createActivityLog(
      "Item Created",
      "item",
      response.id,
      { context: `'${response.name}' item was created` }
    );
    resetDialogContext();
    revalidatePage("/inventory/edit");
  };

  return (
    <Dialog.Root identifier="createItem">
      <Dialog.Title>Create Item</Dialog.Title>
      <Form.Root form={form} onSubmit={handleSubmit}>
        <Form.Text form={form} label="Name" fieldName="name" required />
        <Form.Text
          form={form}
          label="Reference Code"
          fieldName="referenceCode"
          required
        />
        <Form.Select
          form={form}
          label="Item Type"
          fieldName="itemTypeId"
          options={restructureData(itemTypes, restructureAs) as SelectOption[]}
        />
        <Form.Select
          form={form}
          label="Inventory Type"
          fieldName="inventoryTypeId"
          options={
            restructureData(inventoryTypes, restructureAs) as SelectOption[]
          }
        />
        <Form.Select
          form={form}
          label="Procurement Type"
          fieldName="procurementTypeId"
          options={
            restructureData(procurementTypes, restructureAs) as SelectOption[]
          }
        />

        <Form.Select
          form={form}
          label="Inventory Unit of Measurement"
          fieldName="inventoryUomId"
          options={
            restructureData(uoms, restructureAs) as SelectOption[]
          }
        />

        <Form.ActionRow form={form} />
      </Form.Root>
    </Dialog.Root>
  );
};

export default CreateItemForm;
