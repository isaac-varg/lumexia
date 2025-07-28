"use client";
import { useRouter } from "next/navigation";
import ScanListener from "@/components/Scan/ScanListener";

const InventoryAuditScanListener = () => {
	const router = useRouter();

	const handleScanComplete = (scannedLot: string) => {
		router.push(`/inventory/audit/${scannedLot}`);
	};

	return <ScanListener onScanComplete={handleScanComplete} />;
};

export default InventoryAuditScanListener;
