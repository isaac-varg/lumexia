import { revalidatePage } from "@/actions/app/revalidatePage";
import inventoryTypeActions from "@/actions/inventory/inventoryTypeActions";
import Form from "@/components/Form";
import useDialog from "@/hooks/useDialog";
import { createActivityLog } from "@/utils/auxiliary/createActivityLog";
import React from "react";
import { useForm } from "react-hook-form";

type Inputs = {
  name: string;
};

const ProcurementTypesForm = () => {
  const form = useForm<Inputs>();
  const { resetDialogContext} = useDialog()

  const handleSubmit = async (data: Inputs) => {
    
    const response = await inventoryTypeActions.createNew(data);
    await createActivityLog('createInventoryType', 'inventoryType', response.id, {context: `inventory type '${response.name} created`})
    resetDialogContext();
    revalidatePage("/inventory/edit") 

  };

  return (
    <Form.Root form={form} onSubmit={handleSubmit}>
      <Form.Text form={form} fieldName="name" label="Name" required={true} />
      <Form.ActionRow form={form} />
    </Form.Root>
  );
};

export default ProcurementTypesForm;
