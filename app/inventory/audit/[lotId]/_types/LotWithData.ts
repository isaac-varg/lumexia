import { Lot } from "@/types/lot";

export interface LotWithData extends Lot {
	totalQuantityOnHand: number;
	totalTransactionAmount: number;
}
