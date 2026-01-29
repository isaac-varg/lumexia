"use server";

import prisma from "@/lib/prisma";
import { getConversionFactor } from "@/utils/uom/getConversionFactor";
import { groupByMonthAndYear } from "@/utils/general/groupByMonthAndYear";
import { UnitOfMeasurement } from "@prisma/client";
import { getPricingChartData } from "./getPricingChartData";
import { ExPurchaseOrderItem } from "@/types/purchaseOrderItem";
import { DateTime } from "luxon";
import { getModeDates } from "@/utils/general/getModeDates";
//
// TODO make this configurable and then pull what the use selected as their default uom rather than hard code it. . . what if someone doesn't want to only use lb as their default.
const defaultUomId = "68171f7f-3ac0-4a3a-b197-18742ebf6b5b";

export interface SupplierFilterItems {
    totalSpent: number;
    lastPaid: { price: number, uom: UnitOfMeasurement, timestamp: Date };
    uoms: string[]
    prices: any
    purchases: ExPurchaseOrderItem[];
    pricingChartData: any;
}

export const getFilteredItems = async (itemId: string, supplierId: string, mode: "yearToDate" | "lastYear" | "all",
) => {

    const { start, end } = getModeDates(mode);


    const itemData = await prisma.purchaseOrderItem.findMany({
        where: {
            purchaseOrders: {
                supplierId,
            },
            itemId,
            createdAt: {
                lte: end.toJSDate(),
                gte: start.toJSDate(),
            }
        },
        orderBy: {
            updatedAt: "asc",
        },
        include: {
            purchaseOrders: {
                include: {
                    status: true,
                    paymentMethod: true,
                },
            },
            uom: true,
            item: true
        },
    });

    if (itemData.length === 0) {
        return {
            totalSpent: 0,
            lastPaid: { price: 0, uom: { abbreviation: '' }, timestamp: '' },
            uoms: [""],
            purchases: [],
            pricingChartData: [],
            prices: []
        }
    }

    const lastPurchaseIndex = itemData.length - 1

    const totalSpent = itemData.reduce((total, item) => {
        return total + item.quantity * item.pricePerUnit;
    }, 0);
    const lastPaid = { price: itemData[lastPurchaseIndex].pricePerUnit, uom: itemData[lastPurchaseIndex].uom, timestamp: itemData[lastPurchaseIndex].createdAt };
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

                    if (!conversionFactor) {
                        price = item.pricePerUnit;
                        return
                    }
                    const convertedPricePerUnit = item.pricePerUnit / conversionFactor;
                    price = convertedPricePerUnit;
                } else {

                    price = item.pricePerUnit;
                }

            }
            return { price: price, createdAt: item.createdAt }
        }),
    );

    const pricesGrouped = groupByMonthAndYear(prices)

    const pricingChartData = getPricingChartData(pricesGrouped)

    const data = {
        prices: pricesGrouped,
        lastPaid,
        uoms,
        totalSpent,
        purchases: itemData,
        pricingChartData,
        //   item: itemData.item

    };
    return data;
};
