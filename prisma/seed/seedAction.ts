
import { createMany } from "../../actions/classes/createMany";

export const seedAction = async (model: string) => {
  try {
    // Dynamically import the file
    const seedDataModule = await import(`./data/${model}`);
    
    // Check if `default` is wrapped inside another `default` property
    const seedData = seedDataModule.default?.default || seedDataModule.default;

    console.log('ran', model)

    // Pass the data to createMany if it exists
    if (seedData) {
      await createMany(model, seedData);
      console.log(`Seeded ${model} successfully!`);
    } else {
      console.error(`No data found in the ${model} module.` );
    }
  } catch (error) {
    // if (model !== 'inventoryType') {
    //   return;
    // }
    console.error(`Something went wrong with the ${model} seed:`, error);
  }
};

