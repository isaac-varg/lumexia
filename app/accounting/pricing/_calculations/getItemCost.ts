// item cost is defined as 
// last purchase price of the material or upcoming price + 
// arrival costs
// unforeseen diffulties cost

export const getItemCost = (price: number, arrivalCost: number, unforeseenDifficultiesCost: number) => {
    
    return price + arrivalCost + unforeseenDifficultiesCost;

}
