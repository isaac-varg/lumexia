import { PricingBom } from "./getBomWithPricing";

export const getOverallBomCost = async (batchSize: number, bom: PricingBom[]) => {

    const costPerBatch = bom.reduce((total, current) => {

        if (!current) {
            throw new Error("Bom item is missing data.")
        }

        const quantity = (current.concentration / 100) * batchSize
        const costPerBatch = quantity * current.itemCost;
        return costPerBatch + total;

    }, 0)


const costPerPound = bom.reduce((total, current) => {

        if (!current) {
            throw new Error("Bom item is missing data.")
        }

        const quantity = (current.concentration / 100) * batchSize
        const costPerBatch = quantity * current.itemCost;
        const costPerPound = costPerBatch / batchSize;
        return costPerBatch + total;


    }, 0)




};

