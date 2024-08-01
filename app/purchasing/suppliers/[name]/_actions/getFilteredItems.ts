"use server";

import purchaseOrderItemActions from "@/actions/purchasing/purchaseOrderItemActions";
import prisma from "@/lib/prisma";
import { converUom } from "@/utils/data/convertUom";
import { getConversionFactor } from "@/utils/uom/getConversionFactor";

// TODO make this configurable and then pull what the use selected as their default uom rather than hard code it. . . what if someone doesn't want to only use lb as their default.
const defaultUomId = "68171f7f-3ac0-4a3a-b197-18742ebf6b5b";

export const getFilteredItems = async (itemId: string, supplierId: string) => {
	const itemData = await prisma.purchaseOrderItem.findMany({
		where: {
			purchaseOrders: {
				supplierId,
			},
			itemId,
		},
		orderBy: {
			updatedAt: "desc",
		},
		include: {
			purchaseOrders: true,
			uom: true,
		},
	});

	const totalSpent = itemData.reduce((total, item) => {
		return total + item.quantity * item.pricePerUnit;
	}, 0);
	const lastPaid = { price: itemData[0].pricePerUnit, uom: itemData[0].uom };
	const uomIds = itemData
		.map((item) => item.uom.id)
		.filter((value, index, self) => self.indexOf(value) === index);

	const uoms = itemData
		.map((item) => item.uom.abbreviation)
		.filter((value, index, self) => self.indexOf(value) === index);

	const isPurchasedInMultipleUom = uomIds.length > 1;

	const prices = await Promise.all(
		itemData.map(async (item) => {
			let price = item.pricePerUnit;

			if (isPurchasedInMultipleUom) {
				const isDefaultUom = item.uomId === defaultUomId;

				if (!isDefaultUom) {
					const conversionFactor = await getConversionFactor(
						item.uomId,
						defaultUomId,
					);

					const convertedPricePerUnit = item.pricePerUnit * conversionFactor;
					price = convertedPricePerUnit;
				}

				price = item.pricePerUnit;
			}

			return price;
		}),
	);

	return {
		prices,
		lastPaid,
		uoms,
		totalSpent,
	};
};
