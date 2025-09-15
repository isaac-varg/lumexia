
import { generateQR } from "@/actions/qr/generateQR";
import { Lot } from "@/types/lot";
import { LabelData, createLabelsPDF } from "@/utils/pdf/generators/itemLabels/createLabelsPDF";

export const printLotLabel = async (lot: Lot) => {
  const qr = await generateQR(lot.id)

  const labelData: LabelData[] = [{
    lot,
    quantity: 1,
    qr,
  }]

  createLabelsPDF(labelData)

}
