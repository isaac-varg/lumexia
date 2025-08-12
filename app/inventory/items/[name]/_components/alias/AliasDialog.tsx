import { revalidatePage } from "@/actions/app/revalidatePage";
import aliasActions from "@/actions/inventory/aliases";
import supplierAliasActions from "@/actions/purchasing/supplierAliasActions";
import { Supplier } from "@/actions/purchasing/suppliers/getAll";
import Dialog from "@/components/Dialog";
import Form from "@/components/Form";
import { staticRecords } from "@/configs/staticRecords";
import useDialog from "@/hooks/useDialog";
import { useItemDashboardActions, useItemDashboardSelection } from "@/store/itemDashboardSlice";
import { AliasType } from "@/types/aliasType";
import { Item } from "@/types/item";
import { SelectOption } from "@/types/selectOption";
import { createActivityLog } from "@/utils/auxiliary/createActivityLog";
import { restructureData } from "@/utils/data/restructureData";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { TbTrash } from "react-icons/tb";

const supplierAliasType = staticRecords.inventory.aliases.types.supplier

interface Inputs {
  name: string;
  aliasTypeId: string;
  supplierId?: string | null
}

interface CreateData extends Inputs {
  itemId?: string;
}

type Props = {
  item: Item;
  aliasTypes: AliasType[];
  suppliers: Supplier[]
}

const restructureAs = [
  { key: "id", rename: "value" },
  { key: "name", rename: "label" },
];



const AliasDialog = ({
  item,
  aliasTypes,
  suppliers,
}: Props) => {

  const { aliasDialogMode, selectedAlias } = useItemDashboardSelection();
  const { getAliases } = useItemDashboardActions()
  const { resetDialogContext } = useDialog();

  const defaults = (aliasDialogMode === 'modify') ? {
    name: selectedAlias?.name || 'hey',
    aliasTypeId: selectedAlias?.aliasTypeId || '',
    ...(selectedAlias?.aliasTypeId === supplierAliasType && { supplierId: selectedAlias.supplierAlias[0].supplierId })
  } : {};

  const form = useForm<Inputs>();


  const handleSubmit = async (data: Inputs) => {
    const createData: CreateData = { name: data.name, aliasTypeId: data.aliasTypeId, itemId: "" };

    createData.itemId = item.id;

    if (aliasDialogMode === 'create') {
      const response = await aliasActions.createNew(createData);

      await createActivityLog("appendAlias", "item", item.id, {
        context: `'${response.name}' alias was added to ${item.name}`,
      });

      if (data.aliasTypeId === staticRecords.inventory.aliases.types.supplier) {
        const supplierAlias = await supplierAliasActions.createNew({
          aliasId: response.id,
          supplierId: data.supplierId,
        })

        await createActivityLog("supplierAliasAppended", "supplierAlias", supplierAlias.id, { context: "Alias added to supplier" })
      }
    } else {

      if (!selectedAlias) return;
      const response = await aliasActions.update({ id: selectedAlias.id }, createData)

      await createActivityLog("modifyAlias", "item", item.id, {
        context: `'${response.name}' alias was modified to ${item.name}`,
      });

      if (data.aliasTypeId === staticRecords.inventory.aliases.types.supplier) {
        const supplierAlias = await supplierAliasActions.update({ id: selectedAlias.supplierAlias[0].id }, {
          aliasId: response.id,
          supplierId: data.supplierId,
        })

        await createActivityLog("supplierAliasModified", "supplierAlias", supplierAlias.id, { context: "Alias added to supplier" })
      }

    }

    getAliases()
    resetDialogContext();
    revalidatePage("/inventory/items/[name]");
  };

  const handleDelete = async () => {
    if (!selectedAlias) return;
    if (selectedAlias.aliasTypeId === supplierAliasType) {
      await supplierAliasActions.deleteOne({ id: selectedAlias.supplierAlias[0].id });
    }
    await aliasActions.deleteOne({ id: selectedAlias.id });
    await createActivityLog('supplierAliasRemoved', "itemId", selectedAlias.itemId, { context: `Alias was removed` });
    getAliases()
    resetDialogContext()
  }

  useEffect(() => {
    form.reset(defaults);
  }, [aliasDialogMode, selectedAlias])

  const watchAlias = form.watch('aliasTypeId')


  return (
    <Dialog.Root identifier="aliasDialog">
      <div className="flex justify-between items-center">
        <Dialog.Title title="New Alias" />
        <button onClick={() => handleDelete()} className="btn btn-soft btn-error btn-sm"> <span className="text-xl"><TbTrash /></span> Delete</button>
      </div>

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
