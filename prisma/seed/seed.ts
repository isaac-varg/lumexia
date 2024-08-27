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
  await seedAction("aliasType");
  await seedAction("alias");
  await seedAction("supplier");
  await seedAction("purchaseOrderStatus");
  await seedAction("purchaseOrder");
  await seedAction("purchaseOrderItem");
  await seedAction("supplierAlias");
  await seedAction("paymentMethod");
  await seedAction("recordStatus")
  await seedAction("stepAddendumType")
  await seedAction("userRole")
};

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    console.log("Seeding complete!");
  });
