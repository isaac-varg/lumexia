import { revalidatePage } from "@/actions/app/revalidatePage";
import ActionButton from "@/components/ActionButton";
import Dialog from "@/components/Dialog";
import Form from "@/components/Form";
import Layout from "@/components/Layout";
import useDialog from "@/hooks/useDialog";
import React from "react";
import { useForm } from "react-hook-form";

interface Inputs  {
  amount: number;
  userNote: string;
};


// TODO - Have this actually create transaction
// TODO - have settings section where specify default uom for transaction and transaction type then use this in a global settings context to pull defaults. or you can hard code it in. .. 
interface CreateData extends Inputs {
    lotId: string
    transactionTypeId: string

  }

const CreateTransactionDialog = () => {
  const dialog = useDialog();
  const form = useForm<Inputs>();

  const handleSubmit = async (data: Inputs) => {
    console.log(data);
    // resetDialogContext();
    // revalidatePage("/inventory/edit");
  };

  return (
    <Dialog.Root identifier="createTransaction">
      <Layout.Row>
        <Dialog.Title title="Create Transaction" />
        <ActionButton
          label="Back"
          onClick={() => dialog.showDialog("lotDetails")}
        />
      </Layout.Row>

      <Form.Root form={form} onSubmit={handleSubmit}>
        <Form.Number
          form={form}
          label="Amount (lbs)"
          fieldName="amount"
          required={true}
          validation={{
            value: (value) => {
              if (!isNaN(value)) {
                return undefined;
              }
              return "Please enter a valid amount (numbers with optional decimal point)";
            },
          }}
        />
        <Form.Text
          form={form}
          label="User Note"
          fieldName="userNote"
          required={false}
        />
        <Form.ActionRow form={form} />
      </Form.Root>
    </Dialog.Root>
  );
};

export default CreateTransactionDialog;
