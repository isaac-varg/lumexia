
import stagingTransactions from "../../input/staging";
import prisma from "@/lib/prisma";

// Define the interface matching the structure of each transaction
interface ImportTransaction {
  transactionTypeId: string;
  userId: string;
  amount: number;
  systemNote: string;
  userNote: string;
  createdAt: string; // or Date if you want to parse this later
  uomId: string;
  lotId: string;
}

// Explicitly type the import as an array of `ImportTransaction`
const typedTransactions = stagingTransactions as ImportTransaction[];

export const createTransactions = async () => {
  try {
    await prisma.transaction.createMany({
      data: typedTransactions, // Type assertion to the correct interface array
    });
    console.log("Successfully imported staged scans as transactions.");
  } catch (error) {
    console.error("Something went wrong.", error);
  }
};

export const createTransactionsIndividually = async () => {
  // Use `typedTransactions` here instead of `stagingTransactions`
  typedTransactions.forEach(async (transaction) => {
    try {
      await prisma.transaction.create({
        data: transaction,
      });
      console.log(`Success importing <${transaction.amount}> of '${transaction.lotId}'`);
    } catch (error) {
      console.error(`FAILED --> <${transaction.amount}> of '${transaction.lotId}'`, error);
    }
  });

  console.log("Finished.");
};
