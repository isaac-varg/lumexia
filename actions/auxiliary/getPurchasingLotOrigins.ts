
import prisma from "@/lib/prisma";
import { generateQR } from "../qr/generateQR";

export const getPurchasingLotOrigins = async (purchaseOrderId: string) => {
	const results = await prisma.lotOrigin.findMany({
		where: {
			purchaseOrderId,
		},
		include: {
			lot: {
				include: {
					containers: true,
					item: true,
				},
			},
		},
	});

	console.log(results);


	const originsWithQR = await Promise.all(
		results.map(async (origin) => {
			const qr = await generateQR(origin.lot.id);
			return {
				...origin,
				qr,
			};
		})
	);

	return originsWithQR;
};

