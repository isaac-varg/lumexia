"use client";
import ActionButton from "@/components/ActionButton";
import { LotOrigin } from "@/types/lotOrigin";
import {
  createLabelsPDF,
} from "@/utils/pdf/generators/itemLabels/createLabelsPDF";
import { getLabelData } from "@/utils/pdf/generators/itemLabels/getLabelData";
import React from "react";
import { TbCloudDownload } from "react-icons/tb";

const PrintLabelsButton = ({ lotOrigins }: { lotOrigins: LotOrigin[] }) => {


  const handleClick = () => {
    const labelData = getLabelData(lotOrigins);
    createLabelsPDF(labelData);
  };


  if (lotOrigins.length === 0) {
    return false;
  }
  return <ActionButton onClick={() => handleClick()}><span className="flex flex-row gap-x-2"><TbCloudDownload className="text-2xl" />Labels</span></ActionButton>;
};

export default PrintLabelsButton;
