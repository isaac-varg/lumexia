"use client";
import ActionButton from "@/components/ActionButton";
import Card from "@/components/Card";
import useDialog from "@/hooks/useDialog";
import { ProcurementType } from "@prisma/client";
import React from "react";
import Layout from "@/components/Layout";
import ProcurementTypesDialog from "./Dialog";

interface ProcurementTypesPanelProps {
  procurementTypes: ProcurementType[];
}

const ProcurementTypesPanel: React.FC<ProcurementTypesPanelProps> = ({
  procurementTypes,
}) => {
  const { showDialog } = useDialog();

  const handleAddClick = () => {
    showDialog("procurementTypes");
  };
  return (
    <>
      <ProcurementTypesDialog />
      <Card.Root>
        <Layout.Row>
          <Card.Title>Procurement Types</Card.Title>
          <ActionButton label="Add" onClick={handleAddClick} />
        </Layout.Row>
        <div className="flex flex-col gap-y-2 pt-6">

        {procurementTypes.map((type) => (
          <button className="bg-limed-spruce-100 p-4 rounded-lg" key={type.id}>{type.name}</button>
        ))}
        </div>
      </Card.Root>
    </>
  );
};

export default ProcurementTypesPanel;
