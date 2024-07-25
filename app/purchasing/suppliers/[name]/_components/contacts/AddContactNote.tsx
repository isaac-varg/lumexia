"use client"

import { revalidatePage } from "@/actions/app/revalidatePage";
import supplierContactNoteActions from "@/actions/purchasing/supplierContactNoteActions";
import Dialog from "@/components/Dialog"
import Form from "@/components/Form";
import useDialog from "@/hooks/useDialog";
import { SupplierContact } from "@/types/supplierContact"
import { SupplierContactNote } from "@/types/supplierContactNote";
import { createActivityLog } from "@/utils/auxiliary/createActivityLog";
import { useForm } from "react-hook-form";

interface Inputs {
	content: string;
}
const AddContactNote = ({contact} : { contact: SupplierContact } ) => {
	const form = useForm<Inputs>();
	const {resetDialogContext} = useDialog();

	const handleSubmit = async (data: Inputs) => {
	
		const createData = {
			supplierContactId: contact.id,
			content: data.content,
		}

		const noteAddResponse = await supplierContactNoteActions.createNew(createData);
		
		createActivityLog('addSupplierContactNote', 'supplier', contact.supplierId, {context: `Added note: ${data.content}`, supplierContactNoteId: noteAddResponse.id});
		revalidatePage("/purchasing/suppliers/[name]");
		resetDialogContext();

	}

  return (
  	<Dialog.Root identifier={`contactNote${contact.id}`}>
		<Form.Root form={form} onSubmit={handleSubmit}>
			<Form.TextArea form={form} label="Note Content" fieldName="content" required />
			<Form.ActionRow form={form} />
		</Form.Root>
	</Dialog.Root>
  )
}

export default AddContactNote
