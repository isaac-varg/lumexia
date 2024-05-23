import Card from "@/components/Card";
import LabelDataPair from "@/components/Text/LabelDataPair";
import { PurchaseOrderItem } from "@/types/purchaseOrderItem";
import React from "react";
import { calculateGrandTotal } from "../_functions/calculateTotal";

type TotalsProps = {
  purchaseOrderItems: PurchaseOrderItem[];
};

const Totals = ({ purchaseOrderItems }: TotalsProps) => {

    const total = calculateGrandTotal(purchaseOrderItems);

  return <Card.Root>
    <LabelDataPair label="Total" data={total} />
  </Card.Root>
};

export default Totals;
