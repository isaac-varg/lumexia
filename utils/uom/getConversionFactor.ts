import prisma from "@/lib/prisma"

export const getConversionFactor = async (uomAId: string, uomBId: string) => {
	const conversion =  await prisma.unitOfMeasurementConversion.findMany({
		where: {
			uomAId,
			uomBId,
		},
	})

	return conversion[0].conversionFactor;
}
