"use client";

import ActionButton from "@/components/ActionButton";
import { PurchaseOrderStatus } from "@/types/purchaseOrderStatus";
import React from "react";
import { nextPOStatus } from "../_functions/nextPOStatus";
import { createActivityLog } from "@/utils/auxiliary/createActivityLog";

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

  const handleClick = async () => {
    await nextPOStatus(nextStatus.id, purchaseOrderId);

    await createActivityLog(
      "modifyPurchaseOrderStatus",
      "purchaseOrder",
      purchaseOrderId,
      {
        context: `PO Status changed to ${nextStatus.name}`,
      }
    );
  };

  return (
    <>
      <ActionButton onClick={() => handleClick()}>
        Set to {nextStatus.name}
      </ActionButton>
    </>
  );
};

export default NextStatusButton;
