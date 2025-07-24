"use client";
import { useRouter } from "next/navigation";
import { BsQrCodeScan } from "react-icons/bs";
import ScanListener from "@/components/Scan/ScanListener";

const InventoryAuditScanListener = () => {
	const router = useRouter();

	const handleScanComplete = (scannedLot: string) => {
		router.push(`/inventory/audit/${scannedLot}`);
	};

	return (
		<ScanListener onScanComplete={handleScanComplete}>
			<div className="p-10 rounded-lg bg-cutty-sark-100 flex flex-col items-center justify-center gap-y-4">
				<BsQrCodeScan className="text-[200px]" />
				<h1 className="font-poppins text-4xl font-bold">Scan Barcode</h1>
			</div>
		</ScanListener>
	);
};

export default InventoryAuditScanListener;