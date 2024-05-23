"use client";

import ActionButton from "@/components/ActionButton";
import { PurchaseOrderStatus } from "@/types/purchaseOrderStatus";
import React from "react";
import { nextPOStatus } from "../_functions/nextPOStatus";

const NextStatusButton = ({
  poStatuses,
  currentStatusSequence,
  purchaseOrderId,
}: {
  poStatuses: PurchaseOrderStatus[];
  currentStatusSequence: number;
  purchaseOrderId: string;
}) => {
  const nextStatus =
    poStatuses[
      poStatuses.findIndex(
        (status: PurchaseOrderStatus) =>
          status.sequence === currentStatusSequence + 1
      )
    ];

  if (nextStatus.sequence > 4) {
    return false;
  }

  return (
    <>
      <ActionButton
        onClick={() => nextPOStatus(nextStatus.id, purchaseOrderId)}
      >
        Set to {nextStatus.name}
      </ActionButton>
    </>
  );
};

export default NextStatusButton;
