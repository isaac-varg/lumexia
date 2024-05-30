import { PaymentMethod } from "./paymentMethod"

export interface SupplierPaymentMethod {
    id: string
    supplierId: string
    paymentMethodId: string
    paymentMethod: PaymentMethod
}