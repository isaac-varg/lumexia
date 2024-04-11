import { createMany } from "../../actions/classes/createMany";

export const seedAction = async (model: string) => {
  try {
    const seedData = await import(`./data/${model}`);

    await createMany(model, seedData.default);
    console.log(`Seeded ${model} successfully!`);
  } catch (error) {
    console.error(`Something went wrong with the ${model} seed: ${error}`);
  } finally {
  }
};
