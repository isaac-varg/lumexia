import { Alias } from "./alias"
import { Supplier } from "./supplier"

export interface SupplierAlias {
    id: string
    aliasId: string
    supplierId: string
    alias: Alias
}

export interface IExSupplierAlias extends SupplierAlias {
    supplier: Supplier
}
