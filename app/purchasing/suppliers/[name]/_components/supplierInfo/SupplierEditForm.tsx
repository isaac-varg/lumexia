"use client";

import { revalidatePage } from "@/actions/app/revalidatePage";
import supplierActions from "@/actions/purchasing/supplierActions";
import Dialog from "@/components/Dialog";
import Form from "@/components/Form";
import useDialog from "@/hooks/useDialog";
import { Supplier } from "@/types/supplier";
import { useForm } from "react-hook-form";

type Inputs = {
	name: string;
	addressStreet1: string;
	addressStreet2: string;
	addressCity: string;
	addressState: string;
	addressZip: string;
	phone: string;
};

const SupplierEditForm = ({supplier} : {supplier: Supplier} ) => {
	const form = useForm<Inputs>({ defaultValues: { ...supplier } });
	const {resetDialogContext } = useDialog();
	const handleSubmit = async (data: Inputs) => {
		await supplierActions.update({id: supplier.id}, data);
		
		revalidatePage("/purchasing/suppliers/[name]");
		resetDialogContext();


			
	};

	return (
		<Dialog.Root identifier="editSupplier">
			<Form.Root form={form} onSubmit={handleSubmit}>
				<Form.Text form={form} label="Name" fieldName="name" required />
				<Form.Text
					form={form}
					label="Street 1"
					fieldName="addressStreet1"
					required={false}
				/>
				<Form.Text
					form={form}
					label="Street 2"
					fieldName="addressStreet2"
					required={false}
				/>
				<Form.Text
					form={form}
					label="City"
					fieldName="addressCity"
					required={false}
				/>
				<Form.Text
					form={form}
					label="State"
					fieldName="addressState"
					required={false}
				/>
				<Form.Text
					form={form}
					label="Zipcode"
					fieldName="addressZip"
					required={false}
				/>
				<Form.Text
					form={form}
					label="Phone"
					fieldName="phone"
					required={false}
				/>

				<Form.ActionRow form={form} />
			</Form.Root>
		</Dialog.Root>
	);
};

export default SupplierEditForm;
