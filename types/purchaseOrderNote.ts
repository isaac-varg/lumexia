import { User } from "./user";

export interface PurchaseOrderNote {
  id: string;
  purchaseOrderId: string;
  userId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  user: User
}
