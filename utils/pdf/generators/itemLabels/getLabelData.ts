import { LotOrigin } from "@/types/lotOrigin";
import { LabelData } from "./createLabelsPDF";

export const getLabelData = (lotOrigins: LotOrigin[]) => {
  const labelData: LabelData[] = [];

  lotOrigins.forEach((lot) => {
    const quantity =
      Math.round(
        lot.lot.initialQuantity / lot.lot.containers[0].containerWeight,
      ) || 1;

    console.log('qqqt', quantity);
    labelData.push({
      lot: lot.lot,
      quantity,
      qr: lot.qr,
    });
  });

  return labelData;
};
