import ScanListener from "@/components/Scan/ScanListener";

const ScanStep = ({ currentStep, onLotScan }: { currentStep: number, onLotScan: (lot: string) => void }) => {
  if (currentStep !== 0) return false;

  return (
    <div>
      <ScanListener
        onScanComplete={onLotScan}
      />
    </div>
  )
}

export default ScanStep
