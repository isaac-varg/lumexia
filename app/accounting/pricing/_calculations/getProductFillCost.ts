// keeping this separate even though basic and can be done in line, but
// explaining this to other will be easier

export const getProductFillCost = (fillQuantity: number | undefined, itemCost: number) => {
    if (!fillQuantity || itemCost) {
        throw new Error('Insufficient data to get product fill cost')
    }
    return itemCost * fillQuantity
}
