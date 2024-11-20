import { getConversionFactor } from "./getConversionFactor"


export const convertUom = async (currentUomId: string, desiredUomId: string, quantity: number) => {

    const conversionFactor = await getConversionFactor(currentUomId, desiredUomId);

    return quantity * conversionFactor;

} 
