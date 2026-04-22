import { PricingBomItemCost } from "./getBomItemCost";
import { BatchSummations } from "./getBomPricingSummations";

export type ZeroCostField =
  | 'sourcePrice'
  | 'totalItemCost'
  | 'itemCostPerLb'
  | 'itemCostInBatch';

const zeroCostFieldLabels: Record<ZeroCostField, string> = {
  sourcePrice: 'Source Price ($/lb)',
  totalItemCost: 'Total Item Cost ($/lb)',
  itemCostPerLb: 'Cost Per Lb Contribution',
  itemCostInBatch: 'Cost Per Batch',
};

export type ZeroCostBomItem = {
  name: string;
  fields: { key: ZeroCostField; label: string }[];
};

export type ZeroCostBomDetectionResult = {
  hasZeroCost: boolean;
  affectedItems: ZeroCostBomItem[];
};

const isZeroOrNull = (value: number | null | undefined): boolean =>
  value === null || value === undefined || value === 0;

const checkBomItem = (bomItem: PricingBomItemCost): ZeroCostBomItem | null => {
  const flaggedFields: { key: ZeroCostField; label: string }[] = [];

  // Source price (the converted price before supplemental costs)
  if (isZeroOrNull(bomItem.itemCost)) {
    flaggedFields.push({ key: 'sourcePrice', label: zeroCostFieldLabels.sourcePrice });
  }

  // Calculated cost fields shown in the BOM table
  if (isZeroOrNull(bomItem.totalItemCost)) {
    flaggedFields.push({ key: 'totalItemCost', label: zeroCostFieldLabels.totalItemCost });
  }
  if (isZeroOrNull(bomItem.itemCostPerLb)) {
    flaggedFields.push({ key: 'itemCostPerLb', label: zeroCostFieldLabels.itemCostPerLb });
  }
  if (isZeroOrNull(bomItem.itemCostInBatch)) {
    flaggedFields.push({ key: 'itemCostInBatch', label: zeroCostFieldLabels.itemCostInBatch });
  }

  if (flaggedFields.length === 0) return null;

  return {
    name: bomItem.item.name,
    fields: flaggedFields,
  };
};

export const detectZeroCostBomItems = (
  pricingData: BatchSummations
): ZeroCostBomDetectionResult => {
  const affectedItems: ZeroCostBomItem[] = [];

  for (const bomItem of pricingData.bomWithCost) {
    const result = checkBomItem(bomItem);
    if (result) {
      affectedItems.push(result);
    }
  }

  return {
    hasZeroCost: affectedItems.length > 0,
    affectedItems,
  };
};
