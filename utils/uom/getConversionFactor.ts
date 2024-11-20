"use server"
import prisma from "@/lib/prisma"

export const getConversionFactor = async (uomAId: string, uomBId: string) => {
	const conversion =  await prisma.unitOfMeasurementConversion.findMany({
		where: {
			uomAId,
			uomBId,
		},
	})
    
    if (conversion.length === 0) { throw new Error("Conversion not found.")}

	return conversion[0].conversionFactor;
}
