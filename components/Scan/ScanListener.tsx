"use client";
import { useCallback, useEffect, useState } from "react";

interface ScanListenerProps {
    onScanComplete: (scannedData: string) => void;
    children: React.ReactNode;
}

const ScanListener = ({
    onScanComplete,
    children,
}: ScanListenerProps) => {
    const [scannedData, setScannedData] = useState("");

    const handleScan = useCallback(
        (event: KeyboardEvent) => {
            if (event.key === "Enter") {
                onScanComplete(scannedData);
                setScannedData(""); 
            } else {
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

    return <>{children}</>;
};

export default ScanListener;
