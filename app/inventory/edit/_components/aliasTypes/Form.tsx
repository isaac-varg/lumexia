import { revalidatePage } from "@/actions/app/revalidatePage";
import aliasTypeActions from "@/actions/inventory/aliasTypes";
import Form from "@/components/Form";
import useDialog from "@/hooks/useDialog";
import React from "react";
import { useForm } from "react-hook-form";

type Inputs = {
  name: string;
};

const AliasTypeForm = () => {
  const form = useForm<Inputs>();
  const { resetDialogContext } = useDialog();

  const handleSubmit = async (data: Inputs) => {
    await aliasTypeActions.createNew(data);
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

export default AliasTypeForm;
