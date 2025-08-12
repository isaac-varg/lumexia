import Alert from "@/components/Alert";
import React from "react";
import { LotWithData } from "../_types/LotWithData";
import { getUserId } from "@/actions/users/getUserId";
import transactionActions from "@/actions/inventory/transactions";
import { createActivityLog } from "@/utils/auxiliary/createActivityLog";
import { revalidatePage } from "@/actions/app/revalidatePage";

const ConfirmDepletion = ({ lot }: { lot: LotWithData }) => {
  const handleConfirmDepletion = async () => {
    const userId = await getUserId();
    const depletionData = {
      lotId: lot.id,
      transactionTypeId: "601b5e2c-3fd2-4310-9a79-5a41244cdfd8",
      userId,
      uomId: "68171f7f-3ac0-4a3a-b197-18742ebf6b5b",
      amount: lot.totalQuantityOnHand,
      systemNote: "Inventory Audit Depletion",
      userNote: "",
    };

    await transactionActions.createNew(depletionData)
    await createActivityLog('inventoryAuditDepletion', 'lotId', lot.id, { context: `${lot.lotNumber} inventory was depleted`, item: lot.item.name, lotNumber: lot.lotNumber, depletionAmount: lot.totalQuantityOnHand })
    revalidatePage('/inventory/audit');
  };

  return (
    <Alert.Root identifier={`confirmDepletion${lot.id}`}>
      <Alert.Content
        title="Are You Sure?"
        action={() => handleConfirmDepletion()}
        actionLabel="Confirm"
        actionColor="warning"
        cancelAction={() => console.log("clicked confirm")}

      >
        Depletion will remove the quantity on hand of this lot and its containers from inventory.
      </Alert.Content>
    </Alert.Root>
  );
};

export default ConfirmDepletion;
