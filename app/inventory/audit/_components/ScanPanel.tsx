"use client";

import React, {  useState } from "react";
import ScanListener from "./ScanListener";

const ScanPanel = () => {
  const [lotId, setLotId] = useState("");

  return (
    <div className="w-full flex flex-col items-center justify-center">
      {!lotId && <ScanListener />}


    </div>
  );
};

export default ScanPanel;
