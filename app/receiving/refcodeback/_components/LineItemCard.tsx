"use client";

import ActionButton from "@/components/ActionButton";
import Card from "@/components/Card";
import Layout from "@/components/Layout";
import LabelDataPair from "@/components/Text/LabelDataPair";
import { ExPurchaseOrderItem } from "@/types/purchaseOrderItem";
import React from "react";
import ReceiveDialog from "./ReceiveDialog";
import useDialog from "@/hooks/useDialog";
import { ContainerType } from "@/types/containerType";
import PartialDialog from "./PartialDialog";
type LineItemCardProps = {
  item: ExPurchaseOrderItem;
  containerTypes: ContainerType[];
};
const LineItemCard = ({ item, containerTypes }: LineItemCardProps) => {
  const { showDialog } = useDialog();
  const isReceivable = item.purchaseOrderStatus.sequence !== 4;

  const handleReceiveButton = () => {
    showDialog(`receiveDialog${item.id}`);
  };

  const handlePartialButton = () => {
    showDialog(`partialDialog${item.id}`);
  };

  return (
    <>
      <ReceiveDialog item={item} containerTypes={containerTypes} />
      <PartialDialog item={item} containerTypes={containerTypes} />
      <Card.Root shadow="none">
        <Card.Title>{item.item.name}</Card.Title>

        <LabelDataPair
          label="Quantity"
          data={`${item.quantity} ${item.uom.abbreviation}`}
        />

        {isReceivable && (
          <Layout.Row justify="start">
            <ActionButton
              label="Receive"
              onClick={() => handleReceiveButton()}
            />
            <ActionButton onClick={() => handlePartialButton()} color="secondarySoft">
              Partial
            </ActionButton>
          </Layout.Row>
        )}
      </Card.Root>
    </>
  );
};

export default LineItemCard;
