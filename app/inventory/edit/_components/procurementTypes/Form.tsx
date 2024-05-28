import { revalidatePage } from "@/actions/app/revalidatePage";
import procurementTypeActions  from "@/actions/inventory/procurementTypeActions";
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
    const response = await procurementTypeActions.createNew(data);
    await createActivityLog('createProcurementType', 'procurementType', response.id, {context: `procurement type '${response.name} created`})

    revalidatePage("/inventory/edit")
    resetDialogContext();

  };

  return (
    <Form.Root form={form} onSubmit={handleSubmit}>
      <Form.Text form={form} fieldName="name" label="Name" required={true} />
      <Form.ActionRow form={form} />
    </Form.Root>
  );
};

export default ProcurementTypesForm;
