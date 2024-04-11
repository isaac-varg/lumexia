import { createMany } from "../actions/classes/createMany"

// export default class PrismaSeed {
//   model: any;
//   seedFile: string;

//   constructor(model: any, seedFile: string) {
//     this.model = model;
//     this.seedFile = seedFile;
//   }

//   seed = async (data: any[]) => {
//     const seedData = await import(`@/seeds/${this.seedFile}`);

//     await createMany(this.model, seedData);
//   };
// }

export const seedAction = async (model: string, seedFile: string) => {
  try {
    const seedData = await import(`./data/${seedFile}`);
    await createMany(model, seedData);
  } catch (error) {
    console.error(`Something went wrong with the ${model} seed: ${error}`);
  } finally {
    console.log(`Seeded ${model} successfully!`);
  }
};
