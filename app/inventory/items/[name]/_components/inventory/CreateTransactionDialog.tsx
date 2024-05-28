import { revalidatePage } from "@/actions/app/revalidatePage";
import transactionActions from "@/actions/inventory/transactions";
import userActions from "@/actions/users/userAction";
import ActionButton from "@/components/ActionButton";
import Dialog from "@/components/Dialog";
import Form from "@/components/Form";
import Layout from "@/components/Layout";
import useDialog from "@/hooks/useDialog";
import { Lot } from "@/types/lot";
import { createActivityLog } from "@/utils/auxiliary/createActivityLog";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface Inputs {
  amount: number;
  userNote: string;
}

// TODO - Have this actually create transaction
// TODO - have settings section where specify default uom for transaction and transaction type then use this in a global settings context to pull defaults. or you can hard code it in. ..
interface CreateData extends Inputs {
  lotId: string;
  transactionTypeId: string;
  userId: string;
  uomId: string;
  systemNote: string;
}

const CreateTransactionDialog = ({ lot }: { lot: Lot }) => {
  const dialog = useDialog();
  const session = useSession();
  const [transactionType, setTransactionType] = useState<string>(
    "601b5e2c-3fd2-4310-9a79-5a41244cdfd8"
  );
  const form = useForm<Inputs>();

  const handleTransactionTypeClick = (buttonClicked: string) => {
    if (buttonClicked === "add") {
      setTransactionType("87c594f9-b49f-4889-9bc7-b840364a3698");
    } else {
      setTransactionType("601b5e2c-3fd2-4310-9a79-5a41244cdfd8");
    }
  };

  const handleSubmit = async (data: Inputs) => {
    if (!session.data?.user?.email) {
      return null;
    }
    const user = await userActions.getAll({ email: session.data.user.email });
    if (!user) {
      return null;
    }

    const createData: CreateData = {
      lotId: lot.id,
      transactionTypeId: transactionType,
      userId: user[0].id,
      uomId: lot.uomId,
      amount: data.amount,
      userNote: data.userNote,
      systemNote:
        "Adjustment made via Woolrus.Item.LotDetails.CreateTransaction",
    };

    const transactionResponse = await transactionActions.createNew(createData);
    console.log(lot);
    console.log(transactionResponse);

    await createActivityLog("inventoryAdjustment", "lot", lot.id, {
      context: `${lot.lotNumber} inventory adjusted by ${transactionResponse.amount} `,
      item: lot.item.name,
      lot: lot.lotNumber,
      amount: transactionResponse.amount,
      transactionTypeId: transactionResponse.transactionTypeId,
      uomId: transactionResponse.uomId,
      userNote: transactionResponse.userNote,
    });
    dialog.resetDialogContext();
    revalidatePage("/inventory/edit");
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
        />

        <div className="flex flex-col">
          <label className="font-poppins text-neutral-950 text-xl">
            Transaction Type
          </label>
          <span className="flex gap-x-6">
            <button
              type="button"
              onClick={() => handleTransactionTypeClick("add")}
              className={`px-4 py-4 w-32 border-2 border-emerald-200 bg-shutters-100 rounded-lg focus:outline-none focus:ring-0 focus:border-shutters-500 text-xl text-neutral-950 ${
                transactionType === "87c594f9-b49f-4889-9bc7-b840364a3698"
                  ? "bg-emerald-200"
                  : ""
              }`}
            >
              Add
            </button>
            <button
              type="button"
              onClick={() => handleTransactionTypeClick("remove")}
              className={`px-4 py-4 w-32 border-2 border-rose-200 bg-shutters-100 rounded-lg focus:outline-none focus:ring-0 focus:border-shutters-500 text-xl text-neutral-950 ${
                transactionType === "601b5e2c-3fd2-4310-9a79-5a41244cdfd8"
                  ? "bg-rose-200"
                  : ""
              }`}
            >
              Remove
            </button>
          </span>
        </div>

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
