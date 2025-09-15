"use client";
import ActionButton from "@/components/ActionButton";
import Alert from "@/components/Alert";
import Layout from "@/components/Layout";
import useDialog from "@/hooks/useDialog";
import { useRouter } from "next/navigation";
import { TbTruck } from "react-icons/tb";
import { PurchaseOrderDetails } from "../../_functions/getPurchaseOrder";

const GoToReceivingButton = ({
  purchaseOrder,
}: {
  purchaseOrder: PurchaseOrderDetails;
}) => {
  const router = useRouter();
  const { showDialog } = useDialog();

  const handleButtonClick = () => {
    if (purchaseOrder.status.sequence < 3) {
      showDialog("poStatusWarning");

      return;
    }

    router.push(
      `/receiving/${purchaseOrder.referenceCode}?id=${purchaseOrder.id}`,
    );
  };

  return (
    <>
      <Alert.Root identifier="poStatusWarning">
        <Alert.Content
          title="Status Error"
          action={() => handleButtonClick()}
          actionLabel="Ok"
          actionColor="secondarySoft"
        >
          There are no receivables. To add this purchase order to the receiving
          dashboard ensure that the status is set to Awaiting Delivery.
        </Alert.Content>
      </Alert.Root>
      <ActionButton color="secondarySoft" onClick={() => handleButtonClick()}>
        <Layout.Row>
          <TbTruck className="text-2xl" />
          <p>Receiving</p>
        </Layout.Row>
      </ActionButton>
    </>
  );
};

export default GoToReceivingButton;
