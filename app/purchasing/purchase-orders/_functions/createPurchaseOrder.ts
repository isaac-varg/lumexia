import purchaseOrderActions from "@/actions/purchasing/purchaseOrderActions";
import purchaseOrderStatusActions from "@/actions/purchasing/purchaseOrderStatusActions";
import userActions from "@/actions/users/userAction";
import { Supplier } from "@/types/supplier";
import { createActivityLog } from "@/utils/auxiliary/createActivityLog";
import { Session } from "next-auth";

export const createPurchaseOrder = async (supplier: Supplier, session: any) => {
    const user = await userActions.getOne(undefined, { email: session.data.user.email });
    if (!user) {
        throw new Error("User not found");
    }

    const defaultStatus = await purchaseOrderStatusActions.getOne(undefined, { name: "Draft" });


    const poData = {
        supplierId: supplier.id,
        submittingUserId: user.id,
        statusId: defaultStatus.id,
    }
    const po = await purchaseOrderActions.createNew(poData);

    await createActivityLog('createPurchaseOrder', 'purchaseOrder', po.id, {
        context: `PO #${po.referenceCode} created`
    })

    return po;

}
