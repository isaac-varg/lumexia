import { revalidatePage } from "@/actions/app/revalidatePage";
import aliasActions from "@/actions/inventory/aliases";
import Dialog from "@/components/Dialog";
import Form from "@/components/Form";
import useDialog from "@/hooks/useDialog";
import { AliasType } from "@/types/aliasType";
import { Item } from "@/types/item";
import { SelectOption } from "@/types/selectOption";
import { restructureData } from "@/utils/data/restructureData";
import { useForm } from "react-hook-form";

interface Inputs {
  name: string;
  aliasTypeId: string;
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
}: {
  item: Item;
  aliasTypes: AliasType[];
}) => {
  const form = useForm<Inputs>();
  const { resetDialogContext } = useDialog();

  const handleSubmit = async (data: Inputs) => {
    const createData: CreateData = { ...data, itemId: "" };

    createData.itemId = item.id;

    await aliasActions.createNew(createData);
    resetDialogContext();
    revalidatePage("/inventory/items/[name]");
  };

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
        <Form.ActionRow form={form} />
      </Form.Root>
    </Dialog.Root>
  );
};

export default AliasDialog;
