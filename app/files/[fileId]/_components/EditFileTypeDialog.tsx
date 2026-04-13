'use client'
import Dialog from "@/components/Dialog"
import Form from "@/components/Form"
import useDialog from "@/hooks/useDialog"
import { useForm } from "react-hook-form"
import { updateFileType } from "../_actions/updateFileType"
import { FileModule } from "../../_actions/getAllFiles"
import { FileTypeOption } from "../_actions/getFileDetails"

type Inputs = { fileTypeId: string };

type Props = {
  fileId: string;
  module: FileModule;
  junctionId: string;
  currentFileTypeId: string;
  availableFileTypes: FileTypeOption[];
};

const EditFileTypeDialog = ({ fileId, module, junctionId, currentFileTypeId, availableFileTypes }: Props) => {
  const { resetDialogContext } = useDialog();
  const form = useForm<Inputs>({ defaultValues: { fileTypeId: currentFileTypeId } });

  const handleSubmit = async (data: Inputs) => {
    await updateFileType({ fileId, module, junctionId, fileTypeId: data.fileTypeId });
    resetDialogContext();
  };

  return (
    <Dialog.Root identifier="editFileType">
      <Dialog.Title>Change File Type</Dialog.Title>
      <Form.Root form={form} onSubmit={handleSubmit}>
        <Form.Select
          form={form}
          fieldName="fileTypeId"
          label="File Type"
          options={availableFileTypes.map((ft) => ({ value: ft.id, label: ft.name }))}
        />
        <Form.ActionRow form={form} />
      </Form.Root>
    </Dialog.Root>
  );
};

export default EditFileTypeDialog;
