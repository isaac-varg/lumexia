import { revalidatePage } from "@/actions/app/revalidatePage";
import supplierNoteActions from "@/actions/purchasing/supplierNoteActions";
import ActionButton from "@/components/ActionButton";
import Dialog from "@/components/Dialog";
import Form from "@/components/Form";
import Layout from "@/components/Layout";
import useDialog from "@/hooks/useDialog";
import { SupplierNote } from "@/types/SupplierNote";
import { Supplier } from "@/types/supplier";
import { createActivityLog } from "@/utils/auxiliary/createActivityLog";
import React from "react";
import { useForm } from "react-hook-form";
import { TbDeviceFloppy, TbEdit, TbTrashX, TbX } from "react-icons/tb";

type Inputs = {
	content: string;
};

const NoteEditForm = ({
	supplier,
	note,
}: {
	supplier: Supplier;
	note?: SupplierNote;
}) => {
	const oldContent = note ? note.content : "heythere";
	const form = useForm<Inputs>({ defaultValues: { content: oldContent } });
	const { resetDialogContext } = useDialog();

	const handleDelete = async () => {
		if (!note) {
			return;
		}

		await supplierNoteActions.deleteOne({ id: note.id });
		await createActivityLog("deleteSupplierNote", "supplier", supplier.id, {
			context: `Delete Note: ${note.content}`,
		});
		resetDialogContext();
		revalidatePage("/purchasing/supplier/[name]");
	};

	const handleSubmit = async (data: Inputs) => {
		if (!note) {
			return;
		}
		const supplierNote = await supplierNoteActions.update(
			{ id: note.id },
			{ ...data },
		);
		await createActivityLog("modifySupplierNote", "supplier", supplier.id, {
			context: `Note '${supplierNote.content} was modified.`,
			oldContent: note.content,
			newContent: data.content,
		});
		revalidatePage("/purchasing/supplier/[name]");
		resetDialogContext();
	};

	if (!note) {
		return false;
	}

	return (
		<Dialog.Root identifier={`updateNote${note.id}`}>
			<Layout.Row>
				<Dialog.Title>Edit Note</Dialog.Title>
				<ActionButton color="warning" onClick={() => handleDelete()}>
					<TbTrashX className="text-xl" />
				</ActionButton>
			</Layout.Row>
			<Form.Root form={form} onSubmit={handleSubmit}>
				<Form.Text form={form} fieldName="content" label="Content" required />

				<div className="flex justify-end">
					<ActionButton buttonType="submit">
						<TbDeviceFloppy className="text-xl" />{" "}
					</ActionButton>
				</div>
			</Form.Root>
		</Dialog.Root>
	);
};

export default NoteEditForm;
