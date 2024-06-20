"use client";

import React, { useEffect, useState } from "react";
import AuditPanel from "./AuditPanel";

const ScanPanel = () => {
	const [scanData, setScanData] = useState("");
	const [lotId, setLotId] = useState("");
	const [isScanCompleted, setIsScanCompleted] = useState(false);

	const handleScanEnd = (scanData: string) => {
		setLotId(scanData);
		setScanData('');
		setIsScanCompleted(true);
	};

	useEffect(() => {
		const handleScanEntry = (event: any) => {
			if (event.key === "Enter") {
				handleScanEnd(scanData);
				return;
			}

			if (isScanCompleted) {
				setIsScanCompleted(false);
			}
			setScanData((prev: string) => prev + event.key);
		};

		window.addEventListener("keypress", handleScanEntry);

		return () => {
			window.removeEventListener("keypress", handleScanEntry);
		};
	}, [scanData, isScanCompleted]);

	return (
		<div className="w-full flex flex-col items-center justify-center">
			<div className="bg-cutty-sark-300 rounded-lg p-12">
				Sorry no scan data
			</div>

			{isScanCompleted && <AuditPanel lotId={lotId} />}
		</div>
	);
};

export default ScanPanel;
