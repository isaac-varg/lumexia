import { jsPDF } from "jspdf";
import { Lot } from "@/types/lot";
import { generateQR } from "@/actions/qr/generateQR";
import { DateTime } from "luxon";

// assets & data
import "../assets/fonts/Lato-Black-normal";
import "../assets/fonts/Lato-Regular-normal";
import "../assets/fonts/Lato-Bold-normal";



export const createSingleLabel = async (pdf: jsPDF, lot: Lot) => {
  const timestamp = DateTime.now().toFormat("DD @t");
  const qrCode = await generateQR(lot.id);

  pdf.setFontSize(25);
  pdf.text(lot.lotNumber, 2, 0.5, { align: "center" });
  pdf.setFontSize(15);
  pdf.text(lot.item.name, 2, 1, { align: "center" });
  pdf.addImage(qrCode, "PNG", 1.35, 1.25, 1.25, 1.25);
  pdf.setFontSize(5);
  pdf.text(timestamp, 2, 2.85, { align: "center" });
};
