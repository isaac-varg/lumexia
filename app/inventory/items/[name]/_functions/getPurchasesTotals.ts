import { Item } from "@prisma/client";

export const getPurchasesTotals = (data: any[], item: Item) => {
  const supplierTotals = data.reduce((acc, curr) => {
    //const supplierId = curr.supplierId;
    const poItem =
      curr.purchaseOrderItems[
        curr.purchaseOrderItems.findIndex(
          (lineItem: any) => lineItem.itemId === item.id,
        )
      ];
    const { createdAt, supplierName, referenceCode, id } = curr; // current is a purchase order

    if (acc[supplierName]) {
      acc[supplierName].count = acc[supplierName].count + 1;
      acc[supplierName].totalQuantity += poItem.quantity;
      acc[supplierName].purchaseOrders.push([
        id,
        referenceCode,
        createdAt,
        poItem.pricePerUnit,
        poItem.quantity,
      ]);
    } else {
      acc[supplierName] = {};
	acc[supplierName].supplierId = curr.supplierId
      acc[supplierName].count = 1;
      acc[supplierName].totalQuantity = poItem.quantity;
      acc[supplierName].name = supplierName;
      acc[supplierName].purchaseOrders = [];
      acc[supplierName].purchaseOrders.push([
        id,
        referenceCode,
        createdAt,
        poItem.pricePerUnit,
        poItem.quantity,
      ]);
    }

    return acc;
  }, {});


 return Object.entries(supplierTotals).map(([, value]) => {
  return value
});


};
