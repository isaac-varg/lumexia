"use client";
import ActionButton from "@/components/ActionButton";
import { LotOrigin } from "@/types/lotOrigin";
import {
  createLabelsPDF,
} from "@/utils/pdf/generators/itemLabels/createLabelsPDF";
import { getLabelData } from "@/utils/pdf/generators/itemLabels/getLabelData";
import React from "react";

const PrintLabelsButton = ({ lotOrigins }: { lotOrigins: LotOrigin[] }) => {
	console.log(lotOrigins);
  const handleClick = () => {
    const labelData = getLabelData(lotOrigins); 
	console.log(labelData);
    createLabelsPDF(labelData);
  };
  return <ActionButton onClick={() => handleClick()}>click me</ActionButton>;
};

export default PrintLabelsButton;
