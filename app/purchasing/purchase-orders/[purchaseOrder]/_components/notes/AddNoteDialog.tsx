import { revalidatePage } from "@/actions/app/revalidatePage";
import purchaseOrderNoteActions from "@/actions/purchasing/purchaseOrderNoteActions";
import { getUserId } from "@/actions/users/getUserId";
import Dialog from "@/components/Dialog";
import Form from "@/components/Form";
import useDialog from "@/hooks/useDialog";
import { createActivityLog } from "@/utils/auxiliary/createActivityLog";
import { useForm } from "react-hook-form";

type Input = {
  content: string;
};

const AddNoteDialog = ({ poId }: { poId: string }) => {
  const form = useForm<Input>();
  const { resetDialogContext } = useDialog();

  const handleSubmit = async (data: Input) => {
    const userId = await getUserId();

    const noteData = {
      purchaseOrderId: poId,
      userId,
      content: data.content,
    };
    const response = await purchaseOrderNoteActions.createNew(noteData);

    await createActivityLog("createPurchaseOrderNote", "purchaseOrder", poId, {
      note: response.content,
    });

    revalidatePage("/purchasing/purchase-orders/[purchaseOrder]");
    resetDialogContext();
  };

  return (
    <Dialog.Root identifier="createNoteDialog">
      <Form.Root form={form} onSubmit={handleSubmit}>
        <Form.Text form={form} label="Note" fieldName="content" required />

        <Form.ActionRow form={form} />
      </Form.Root>
    </Dialog.Root>
  );
};

export default AddNoteDialog;
