// this action is to import user previous sytems scans from the bpr staging system 
// and import the data as lumexia transactions to deplete stock
//
// this was necessary when transitioning form the old system to lumexia

import { createTransactions, createTransactionsIndividually } from "./createTransactions";


const main = async () => {
//  await createTransactions()
  await createTransactionsIndividually();
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    console.log("Seeding complete!");
  });
