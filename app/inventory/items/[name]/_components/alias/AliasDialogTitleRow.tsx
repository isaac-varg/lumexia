"use client";
import React from "react";
import AliasDialog from "./AliasDialog";
import ActionButton from "@/components/ActionButton";
import Card from "@/components/Card";
import Layout from "@/components/Layout";
import { TbPlus } from "react-icons/tb";
import useDialog from "@/hooks/useDialog";
import { Item } from "@/types/item";
import { AliasType } from "@/types/aliasType";

const AliasDialogTitleRow = ({
  item,
  aliasTypes,
}: {
  item: Item;
  aliasTypes: AliasType[];
}) => {
  const dialog = useDialog();
  return (
    <>
      <AliasDialog item={item} aliasTypes={aliasTypes} />
      <Layout.Row>
        <Card.Title>Aliases</Card.Title>
        <ActionButton onClick={() => dialog.showDialog("aliasDialog")}>
          <TbPlus />
        </ActionButton>
      </Layout.Row>
    </>
  );
};

export default AliasDialogTitleRow;
