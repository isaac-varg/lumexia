'use server'

import { inventoryActions } from "@/actions/inventory";
import { ItemForGenericUnits, getItemsForGenericUnits } from "./getItems";
import { GenericUnitConversionFactor } from "@/actions/inventory/genericUnitConversionFactors/getByItemSupplierUnique";

type ConversionInfo = {
    associatedSupplier: string
    purchaseOrderItemId: string
    supplierId: string
    genericUnitConversion: GenericUnitConversionFactor
}

export type ItemWithGenericUnits = ConversionInfo & ItemForGenericUnits


export const getItemsWithUnits = async (): Promise<ItemWithGenericUnits[]> => {

    const items = await getItemsForGenericUnits()


    // flatMap to create a new array from item -> purchaseOrderItem combinations
    const allCombinations = items.flatMap(item =>
        item.purchaseOrderItem.map(poItem => ({
            ...item,
            purchaseOrderItem: poItem,
            supplier: poItem.purchaseOrders.supplier,
        }))
    );

    // hashmap to filter for unique combinations of itemId and supplierId
    const uniqueCombinationsMap = new Map();
    allCombinations.forEach(combo => {
        const uniqueKey = `${combo.id}-${combo.supplier.id}`;
        if (!uniqueCombinationsMap.has(uniqueKey)) {
            uniqueCombinationsMap.set(uniqueKey, combo);
        }
    });

    // convert the map values back to an array
    const uniqueCombinations = Array.from(uniqueCombinationsMap.values());


    const withConversion = await Promise.all(uniqueCombinations.map(async (combo) => {
        const conversion = await inventoryActions.genericUnitsConversion.getBySupplierItemUnique(combo.id, combo.supplier.id);

        const { purchaseOrderItem, supplier, ...restOfCombo } = combo;

        return {
            ...restOfCombo,
            associatedSupplier: combo.supplier.name,
            purchaseOrderItemId: combo.purchaseOrderItem.id,
            supplierId: combo.supplier.id,
            genericUnitConversion: conversion ? { ...conversion } : null,
        }
    }));

    return withConversion;
}

//export type ItemWithGenericUnits = Awaited<ReturnType<typeof getItemsWithUnits>>[number];
