import { revalidatePage } from "@/actions/app/revalidatePage";
import itemTypeActions from "@/actions/inventory/itemTypeActions";
import Form from "@/components/Form";
import useDialog from "@/hooks/useDialog";
import { createActivityLog } from "@/utils/auxiliary/createActivityLog";
import React from "react";
import { useForm } from "react-hook-form";

type Inputs = {
  name: string;
};

const ItemTypesForm = () => {
  const form = useForm<Inputs>();
  const { resetDialogContext } = useDialog();

  const handleSubmit = async (data: Inputs) => {
    const response = await itemTypeActions.createNew(data);
    await createActivityLog(
      "createItemType",
      "itemType",
      response.id,
      { context: `item type '${response.name} created` }
    );
    resetDialogContext();
    revalidatePage("/inventory/edit");
  };

  return (
    <Form.Root form={form} onSubmit={handleSubmit}>
      <Form.Text form={form} fieldName="name" label="Name" required={true} />
      <Form.ActionRow form={form} />
    </Form.Root>
  );
};

export default ItemTypesForm;
