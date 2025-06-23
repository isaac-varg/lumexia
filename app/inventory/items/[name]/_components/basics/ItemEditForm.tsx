"use client";

import { revalidatePage } from "@/actions/app/revalidatePage";
import itemActions from "@/actions/inventory/items";
import supplierActions from "@/actions/purchasing/supplierActions";
import Dialog from "@/components/Dialog";
import Form from "@/components/Form";
import useDialog from "@/hooks/useDialog";
import { Item } from "@/types/item";
import { Supplier } from "@/types/supplier";
import { useForm } from "react-hook-form";
import { ItemEditSelectables } from "../../page";
import { createActivityLog } from "@/utils/auxiliary/createActivityLog";

type Inputs = {
    name: string
    itemTypeId: string
    procurementTypeId: string
    inventoryTypeId: string
    referenceCode: string
};

const ItemEditForm = ({ item, itemEditSelectables }: { item: Item, itemEditSelectables: ItemEditSelectables }) => {
    const form = useForm<Inputs>({ defaultValues: { name: item.name, itemTypeId: item.itemTypeId, procurementTypeId: item.procurementTypeId, inventoryTypeId: item.inventoryTypeId, referenceCode: item.referenceCode } });
    const { resetDialogContext } = useDialog();


    const handleSubmit = async (data: Inputs) => {
        await itemActions.update({ id: item.id }, data);

        createActivityLog("modifyItem", "item", item.id, { context: `Modified item` })
        revalidatePage("/inventory/items/[name]");
        resetDialogContext();

    };


    return (
        <Dialog.Root identifier="editItem">
            <Form.Root form={form} onSubmit={handleSubmit}>
                <Form.Text form={form} label="Name" fieldName="name" required />


                <Form.Text form={form} label="Reference Code" fieldName="referenceCode" required />
                <Form.Select
                    form={form}
                    fieldName="itemTypeId"
                    label="Item Type"
                    options={itemEditSelectables.itemTypes.map((it) => ({
                        value: it.id,
                        label: it.name,
                    }))}
                />
                <Form.Select
                    form={form}
                    fieldName="procurementTypeId"
                    label="Procurement Type"
                    options={itemEditSelectables.procurementTypes.map((pt) => ({
                        value: pt.id,
                        label: pt.name,
                    }))}
                />
                <Form.Select
                    form={form}
                    fieldName="inventoryTypeId"
                    label="Inventory Type"
                    options={itemEditSelectables.inventoryTypes.map((it) => ({
                        value: it.id,
                        label: it.name,
                    }))}
                />

                <Form.ActionRow form={form} />
            </Form.Root>
        </Dialog.Root>
    );
};

export default ItemEditForm
