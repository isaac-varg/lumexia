import { LotOrigin } from "@/types/lotOrigin";
import { LabelData } from "./createLabelsPDF";
import { error } from "console";

export const getLabelData = (lotOrigins: LotOrigin[]) => {
    const labelData: LabelData[] = [];



    lotOrigins.forEach((lot) => {

        if (!lot.lot) { throw new Error("No lot") }

        const quantity =
            Math.round(
                lot.lot.initialQuantity / lot.lot.containers[0].containerWeight,
            ) || 1;

        labelData.push({
            lot: lot.lot,
            quantity,
            qr: lot.qr,
        });
    });

    return labelData;
};
