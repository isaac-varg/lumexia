import jsPDF from "jspdf";

export const getAutoTableEnd = (pdf: jsPDF) => {
     return (pdf as any).lastAutoTable.finalY;
}

