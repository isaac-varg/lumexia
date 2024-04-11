"use client";
import ActionButton from "@/components/ActionButton";
import Card from "@/components/Card";
import useDialog from "@/hooks/useDialog";
import React from "react";
import Layout from "@/components/Layout";
import { AliasType } from "@/types/aliasType";
import AliasTypesDialog from "./Dialog";

interface AliasTypePanelProps {
  aliasTypes: AliasType[];
}

const AliasTypesPanel: React.FC<AliasTypePanelProps> = ({
  aliasTypes,
}) => {
  const { showDialog } = useDialog();

  const handleAddClick = () => {
    showDialog("aliasTypes");
  };
  return (
    <>
      <AliasTypesDialog />
      <Card.Root>
        <Layout.Row>
          <Card.Title>Alias Types</Card.Title>
          <ActionButton label="Add" onClick={handleAddClick} />
        </Layout.Row>
        <div className="flex flex-col gap-y-2 pt-6">

        {aliasTypes.map((type) => (
          <button className="bg-limed-spruce-100 p-4 rounded-lg" key={type.id}>{type.name}</button>
        ))}
        </div>
      </Card.Root>
    </>
  );
};

export default AliasTypesPanel;
