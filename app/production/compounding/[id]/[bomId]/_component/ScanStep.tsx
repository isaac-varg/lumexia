import React, { Dispatch, useEffect, useState } from 'react'
import { BsQrCodeScan } from 'react-icons/bs'
import { useWizard } from 'react-use-wizard'

const ScanStep = ({handleScan} : { handleScan: Dispatch<React.SetStateAction<string | null>>}) => {
  const [isScanComplete, setIsScanComplete] = useState(false)
  const [scannedLot, setScannedLot] = useState('')
  const { nextStep } = useWizard()


  const handleScanEnd = (scannedLot: string) => {
    handleScan(scannedLot)
    nextStep()

  }

  const handleDemoClick = () => {
    setScannedLot('f1218048-d086-46ee-aeab-eb3bc256e930')
    setIsScanComplete(true);

  }

  useEffect(() => {
    const handleScanEntry = (event: any) => {
      if (event.key === "Enter") {
        handleScanEnd(scannedLot)
        setIsScanComplete(true);

        return;
      }

      if (isScanComplete) {
        setIsScanComplete(false);
      }
      setScannedLot((prev: string) => prev + event.key);
    };

    window.addEventListener("keypress", handleScanEntry);

    return () => {
      window.removeEventListener("keypress", handleScanEntry);
    };
  }, [scannedLot, isScanComplete]);

  useEffect(() => {
    if (isScanComplete) {
      handleScanEnd(scannedLot);
    }
  }, [scannedLot, isScanComplete, handleScanEnd]);

  return (
    <div onClick={() => handleDemoClick()} className="p-10 rounded-lg bg-cutty-sark-100 flex flex-col items-center justify-center gap-y-4">
      <BsQrCodeScan className="text-[200px]" />
      <h1 className="font-poppins text-4xl font-bold">Scan Barcode</h1>
    </div>
  )
}

export default ScanStep
