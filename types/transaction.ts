import { TransactionType } from "./transactionType"
import { Uom } from "./uom"
import { User } from "./user"

export interface Transaction {
    id: string
    lotId: string
    transactionTypeId: string
    userId: string
    unitOfMeasurementId: string
    amount: number
    systemNote: string
    userNote: string
    user: User
    transactionType: TransactionType
    unitOfMeasurement: Uom
}