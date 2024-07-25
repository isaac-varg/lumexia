"use client";

import ActionButton from "@/components/ActionButton";
import Text from "@/components/Text";
import useDialog from "@/hooks/useDialog";
import { SupplierContact } from "@/types/supplierContact";
import { BsPerson } from "react-icons/bs";
import { TbMail, TbNote, TbPhone, TbPlus, TbTag } from "react-icons/tb";
import AddContactNote from "./AddContactNote";
import ContactNote from "./ContactNote";
import Layout from "@/components/Layout";

const ContactCard = ({ contact }: { contact: SupplierContact }) => {
	console.log(contact);

	const { showDialog } = useDialog();

	const handleNewNote = () => {
		showDialog(`contactNote${contact.id}`);
	};
	return (
		<div className="flex flex-col  border-cararra-200 border-2 hover:bg-cararra-50  hover:cursor-pointer px-4 py-4 rounded-lg ">
			<AddContactNote contact={contact} />

			<div className="w-full flex flex-col gap-y-2">
				<h1 className="font-semibold text-2xl">
					{contact.firstName} {contact.lastName}
				</h1>
				<Text.LabelDataPair data={contact.type}>
					<Layout.Row>
						<TbTag className="text-xl" />
						Role
					</Layout.Row>
				</Text.LabelDataPair>
				<Text.LabelDataPair data={contact.phone}>
					<Layout.Row>
						<TbPhone className="text-xl" />
						Phone
					</Layout.Row>
				</Text.LabelDataPair>

				<Text.LabelDataPair data={contact.email}>
					<Layout.Row>
						<TbMail className="text-xl" />
						Email
					</Layout.Row>
				</Text.LabelDataPair>

				<div className="flex justify-between items-center">
					<Layout.Row>
						<TbNote className="text-xl" />
					<p className="font-inter font-medium text-lg text-neutral-600">Notes </p>	
					</Layout.Row>

					<ActionButton onClick={() => handleNewNote()}>
						<TbPlus className="text-sm" />
					</ActionButton>
				</div>

				<div className="flex flex-col gap-y-2">
					{contact.supplierContactNotes &&
						contact.supplierContactNotes.map((note) => (
							<ContactNote key={note.id} note={note} />
						))}
				</div>
			</div>
		</div>
	);
};

export default ContactCard;
