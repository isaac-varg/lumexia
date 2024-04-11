"use server"
import { seedAction } from "./seedAction";



const main = async () => {
    await seedAction("inventoryType");
    await seedAction("procurementType");
    await seedAction("itemType");
    await seedAction("item");
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    console.log('Seeding complete!')
  });