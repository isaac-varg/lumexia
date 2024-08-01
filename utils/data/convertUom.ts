import prisma from "@/lib/prisma"

export const converUom = async(uomAId: string, uomBId: string, quantity: number) => {
	const conversion =  await prisma.unitOfMeasurementConversion.findMany({
		where: {
			uomAId,
			uomBId,
		},
	})

	console.log(conversion);
}
