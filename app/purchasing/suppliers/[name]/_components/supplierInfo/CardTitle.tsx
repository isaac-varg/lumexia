"use client"

import ActionButton from "@/components/ActionButton";
import Card from "@/components/Card";
import Layout from "@/components/Layout";
import { Supplier } from "@/types/supplier";
import React from "react";
import { TbEdit } from "react-icons/tb";
import SupplierEditForm from "./SupplierEditForm";
import useDialog from "@/hooks/useDialog";

const CardTitle = ({ supplier }: { supplier: Supplier }) => {
	const {showDialog} = useDialog();
	const handleEdit = () => {
		showDialog("editSupplier");	
	};

	return (
		<>
			<SupplierEditForm supplier={supplier} />
			<Layout.Row>
				<Card.Title size="small">Supplier Info</Card.Title>

				<ActionButton color="cararra" onClick={() => handleEdit()}>
					<TbEdit />
				</ActionButton>
			</Layout.Row>
		</>
	);
};

export default CardTitle;
