import { PaymentMethod } from "./paymentMethod";
import { PurchaseOrderItem } from "./purchaseOrderItem";
import { PurchaseOrderStatus } from "./purchaseOrderStatus";
import { Supplier } from "./supplier";
import { User } from "./user";

export interface PurchaseOrder {
	id: string;
	referenceCode: number;
	submittingUserId: string;
	supplierId: string;
	paymentMethodId: string;
	statusId: string;
	createdAt: Date;
	updatedAt: Date;
	user: User;
	supplier: Supplier;
	status: PurchaseOrderStatus;
	paymentMethod: PaymentMethod;
	purchaseOrderItems?: PurchaseOrderItem[]
}
