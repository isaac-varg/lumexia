import { SupplierContactNote } from "./supplierContactNote";

export interface SupplierContact {
	id: string;
	supplierId: string;
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	type: string;
	supplierContactNotes?: SupplierContactNote[]
}
