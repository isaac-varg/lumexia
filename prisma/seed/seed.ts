"use server";
import { seedAction } from "./seedAction";

const main = async () => {
  await seedAction("inventoryType");
  await seedAction("procurementType");
  await seedAction("user");
  await seedAction("itemType");
  await seedAction("item");
  await seedAction("containerType");
  await seedAction("transactionType");
  await seedAction("unitOfMeasurement");
  await seedAction("unitOfMeasurementConversion");
  await seedAction("lot");
  await seedAction("container");
  await seedAction("transaction");
};

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    console.log("Seeding complete!");
  });
