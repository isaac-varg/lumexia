import Card from "@/components/Card";
import LabelDataPair from "@/components/Text/LabelDataPair";
import { PurchaseOrderItem } from "@/types/purchaseOrderItem";
import React from "react";
import { calculateGrandTotal } from "../_functions/calculateTotal";
import { toFracitonalDigits } from "@/utils/data/toFractionalDigits";

type TotalsProps = {
    purchaseOrderItems: PurchaseOrderItem[];
};

const Totals = ({ purchaseOrderItems }: TotalsProps) => {

    const total = calculateGrandTotal(purchaseOrderItems);

    return <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
            <div className="card-title">Total</div>
            <LabelDataPair label="Total" data={toFracitonalDigits.curreny(total)} />
        </div>
    </div>
};

export default Totals;
