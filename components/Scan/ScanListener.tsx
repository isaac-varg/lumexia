"use client";
import { useCallback, useEffect, useState } from "react";
import { BsQrCodeScan } from "react-icons/bs";

interface ScanListenerProps {
	onScanComplete: (scannedData: string) => void;
	children?: React.ReactNode;
}

const ScanListener: React.FC<ScanListenerProps> = ({
	onScanComplete,
	children,
}) => {
	const [scannedData, setScannedData] = useState("");

	const handleScan = useCallback(
		(event: KeyboardEvent) => {
			if (event.key === "Enter") {
				if (scannedData.trim() !== "") {
					onScanComplete(scannedData);
				}
				setScannedData(""); // Reset for the next scan
				return;
			}

			if (event.key.length === 1) {
				setScannedData((prev) => prev + event.key);
			}
		},
		[scannedData, onScanComplete],
	);

	useEffect(() => {
		window.addEventListener("keypress", handleScan);

		return () => {
			window.removeEventListener("keypress", handleScan);
		};
	}, [handleScan]);

	const defaultContent = (
		<div className="p-8 rounded-lg bg-cutty-sark-100 flex flex-col items-center justify-center gap-y-4">
			<BsQrCodeScan className="text-[100px]" />
			<h1 className="font-poppins text-4xl font-bold">Scan Barcode</h1>
		</div>
	);

	return <>{children || defaultContent}</>;
};

export default ScanListener;
