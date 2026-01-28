import Card from "@/components/Card";
import Text from "@/components/Text";
import { Supplier } from "@/types/supplier";
import React from "react";
import CardTitle from "./CardTitle";

const SupplierInfoPanel = ({
  supplier,
}: {
  supplier: Supplier;
}) => {
  return (
    <Card.Root>
      <div className="flex flex-col gap-y-8">
        <CardTitle supplier={supplier} />

        <div className="flex flex-col gap-y-4">
          <Text.LabelDataPair label="Name" data={supplier.name} />
        </div>
      </div>
    </Card.Root>
  );
};

export default SupplierInfoPanel;
