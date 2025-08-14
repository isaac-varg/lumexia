import { Transaction } from "@/types/transaction";

export interface FlattenedTransactions extends Transaction {
  transactionTypeName: string;
  uomName: string;
  uomAbbreviation: string;
  userName: string;
}

export const flattenTransactions = (
  transactions: Transaction[]
): FlattenedTransactions[] => {
  return transactions.map((transaction) => {
    const {
      transactionType: { name: transactionTypeName },
      unitOfMeasurement: { name: uomName, abbreviation: uomAbbreviation },
      user: { name: userName },
    } = transaction;

    return {
      ...transaction,
      transactionTypeName,
      uomName,
      uomAbbreviation,
      userName,
    } as any;
  });
};
