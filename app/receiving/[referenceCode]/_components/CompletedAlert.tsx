"use client"

import { revalidatePage } from "@/actions/app/revalidatePage";
import purchaseOrderActions from "@/actions/purchasing/purchaseOrderActions";
import Alert from "@/components/Alert"
import useDialog from "@/hooks/useDialog";
import useToast from "@/hooks/useToast";
import { PurchaseOrder } from "@/types/purchaseOrder";
import { createActivityLog } from "@/utils/auxiliary/createActivityLog";
import { Jockey_One } from "next/font/google";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CompletedAlert = ({
    isAwaitingItems,
    purchaseOrder,
}: {
    isAwaitingItems: boolean;
    purchaseOrder: PurchaseOrder;
}) => {

    const [showAlert, setShowAlert] = useState(false)
    const { showDialog } = useDialog()
    const router = useRouter()
    const { toast } = useToast()

    const handleCompletion = async () => {

        await purchaseOrderActions.update(
            { id: purchaseOrder.id },
            { statusId: "db907b0f-4aac-42d7-9118-ee35e178d9b3" },
        );

        await createActivityLog('modifyPurchaseOrder', 'purchaseOrder', purchaseOrder.id, { context: `Purchase Order completed and received` })
        revalidatePage('/receiving/');
        router.push('/receiving/');
        toast('Received!', `Successfully finished receiving PO# ${purchaseOrder.referenceCode}`, 'success');

    }


    useEffect(() => {
        if (!isAwaitingItems && purchaseOrder.status.sequence !== 4) {
            setShowAlert(true)
        }
    }, [purchaseOrder, isAwaitingItems])

    useEffect(() => {
        if (!showAlert) {
            return;
        }

        //instead just doing it automatically
        //

        handleCompletion()


    }, [showAlert])



    return (
        <Alert.Root identifier="completedDialog">
            <Alert.Content
                title="Receiving Completed"
                actionLabel="Complete"
                action={() => handleCompletion()}
                actionColor="bayLeaf"
                cancelAction={() => console.log('Cancelled')}

            >
                It looks like everything on this PO was received, so it is being automatically marked as Received.

            </Alert.Content>

        </Alert.Root>
    )
}

export default CompletedAlert
