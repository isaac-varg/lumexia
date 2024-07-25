"use client";

import ActionButton from "@/components/ActionButton";
import Card from "@/components/Card";
import Layout from "@/components/Layout";
import useDialog from "@/hooks/useDialog";
import { TbPlus } from "react-icons/tb";

const ContactsTitle = () => {
	const { showDialog } = useDialog();
	const handleAddNew = () => {
		showDialog("addNewContact");
	};
	return (
		<Layout.Row>
			<Card.Title size="small">Contacts</Card.Title>

			<ActionButton onClick={handleAddNew}>
				<TbPlus />
			</ActionButton>
		</Layout.Row>
	);
};

export default ContactsTitle;
