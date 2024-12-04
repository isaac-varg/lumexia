import { getConversionFactor } from "./getConversionFactor"


export const convertUom = async (currentUomId: string, desiredUomId: string, quantity: number) => {

    const conversionFactor = await getConversionFactor(currentUomId, desiredUomId);

    if (!conversionFactor) {
        console.error('No conversion factor found')
        return quantity;
    }

    return quantity * conversionFactor;

} 
