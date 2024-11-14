import { revalidatePage } from "@/actions/app/revalidatePage";
import aliasActions from "@/actions/inventory/aliases";
import supplierAliasActions from "@/actions/purchasing/supplierAliasActions";
import Dialog from "@/components/Dialog";
import Form from "@/components/Form";
import { staticRecords } from "@/configs/staticRecords";
import useDialog from "@/hooks/useDialog";
import { AliasType } from "@/types/aliasType";
import { Item } from "@/types/item";
import { SelectOption } from "@/types/selectOption";
import { Supplier } from "@/types/supplier";
import { createActivityLog } from "@/utils/auxiliary/createActivityLog";
import { restructureData } from "@/utils/data/restructureData";
import { useForm } from "react-hook-form";

interface Inputs {
    name: string;
    aliasTypeId: string;
    supplierId?: string | null
}

interface CreateData extends Inputs {
    itemId?: string;
}

const restructureAs = [
    { key: "id", rename: "value" },
    { key: "name", rename: "label" },
];

const AliasDialog = ({
    item,
    aliasTypes,
    suppliers,
}: {
    item: Item;
    aliasTypes: AliasType[];
    suppliers: Supplier[]
}) => {
    const form = useForm<Inputs>();
    const { resetDialogContext } = useDialog();


    const handleSubmit = async (data: Inputs) => {
        const createData: CreateData = { name: data.name, aliasTypeId: data.aliasTypeId, itemId: "" };

        createData.itemId = item.id;

        const response = await aliasActions.createNew(createData);

        await createActivityLog("appendAlias", "item", item.id, {
            context: `'${response.name}' alias was added to ${item.name}`,
        });

        const supplierAlias = await supplierAliasActions.createNew({
            aliasId: response.id,
            supplierId: data.supplierId,
        })

        await createActivityLog("supplierAliasAppended", "supplierAlias", supplierAlias.id, { context: "Alias assed to supplier" })

        resetDialogContext();
        revalidatePage("/inventory/items/[name]");
    };

    const watchAlias = form.watch('aliasTypeId')


    return (
        <Dialog.Root identifier="aliasDialog">
            <Dialog.Title title="New Alias" />


            <Form.Root form={form} onSubmit={handleSubmit}>
                <Form.Text form={form} fieldName="name" label="Name" required={true} />
                <Form.Select
                    form={form}
                    label="Alias Type"
                    fieldName="aliasTypeId"
                    options={restructureData(aliasTypes, restructureAs) as SelectOption[]}
                />

                {watchAlias === staticRecords.inventory.aliases.types.supplier && <Form.Select form={form} label="Supplier" fieldName="supplierId" options={restructureData(suppliers, restructureAs) as SelectOption[]} />}

                <Form.ActionRow form={form} />
            </Form.Root>
        </Dialog.Root>
    );
};

export default AliasDialog;
