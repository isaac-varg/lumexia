import Card from "@/components/Card";
import React from "react";
import { SupplierTotals } from "../../_functions/getPurchasesTotals";
import LabelDataPair from "@/components/Text/LabelDataPair";

const TotalCards = ({
  filteredPurchases,
  quantityTotal,
  countTotal,
}: {
  filteredPurchases: SupplierTotals[];
  quantityTotal: number;
  countTotal: number;
}) => {

  return (
    <div className="h-full flex flex-col gap-y-4">
      <Card.Root bg="elevated" shadow="none" >
        <h2 className="font-semibold text-base font-poppins uppercase">
          PO Count
        </h2>
        {filteredPurchases.map((po: any) => {
          const { supplierId, name, countTotal } = po;

          return (
            <LabelDataPair key={supplierId} label={name} data={countTotal} />
          );
        })}
        <LabelDataPair label="Total" data={countTotal} />
      </Card.Root>
      <Card.Root bg="elevated" shadow="none" >
        <h2 className="font-semibold text-base font-poppins uppercase">
          Quantity Ordered
        </h2>
        {filteredPurchases.map((po: any) => {
          const { supplierId, name, quantityTotal } = po;

          return (
            <LabelDataPair
              key={supplierId}
              label={name}
              data={`${quantityTotal} lbs`}
            />
          );
        })}
        <LabelDataPair label="Total" data={`${quantityTotal} lbs`} />
      </Card.Root>
    </div>
  );
};

export default TotalCards;
