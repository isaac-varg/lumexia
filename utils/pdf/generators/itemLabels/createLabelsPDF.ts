// main init point for label generation
import { Lot } from "@/types/lot";
import { jsPDF } from "jspdf";
import { createSingleLabel } from "./createSingleLabel";

export interface LabelData {
  lot: Lot;
  quantity: number;
  qr: string;
}

const addPage = (pdf: jsPDF, index: number, label: number) => {
  if (index === 0 && label === 0) {
    return;
  }

  pdf.addPage();
};

export const createLabelsPDF = (data: LabelData[]) => {
  // establish the pdf
  // TODO make this configurable for client
  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "in",
    format: [4, 3],
  });
  data.forEach((lot, index) => {
    let label = 0;

    while (label < lot.quantity) {
      addPage(pdf, index, label);
      createSingleLabel(pdf, lot);
      label++;
    }
  });

  pdf.save("hehe");
};
