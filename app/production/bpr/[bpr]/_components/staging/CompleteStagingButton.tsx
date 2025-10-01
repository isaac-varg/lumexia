import { useTranslation } from "@/hooks/useTranslation"
import { translations } from "../../_configs/translations"
import { useEffect, useState } from "react"
import { useProductionSelection } from "@/store/productionSlice"
import { handleStagingComplete } from "../../_actions/stagings/handleCompleteStaging";
import { useRouter } from "next/navigation";
import { staticRecords } from "@/configs/staticRecords";
import { bprStagingStatuses } from "@/configs/staticRecords/bprStagingStatuses";

const ALLOWANCE_TRESHOLD = 0.005;

const CompleteStagingButton = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const [isCompletable, setIsCompletable] = useState(false);
  const { selectedBomItem, stagings } = useProductionSelection()
  const handleClick = async () => {
    if (!selectedBomItem) return;
    handleStagingComplete(selectedBomItem);
    router.refresh()

  }
  useEffect(() => {
    if (!selectedBomItem) {
      setIsCompletable(false);
      return;
    }
    const required = selectedBomItem.quantity;
    const stagedAmount = stagings.reduce((acc, curr) => curr.quantity + acc, 0);
    const lowerBound = required + required * (-1 * ALLOWANCE_TRESHOLD);
    const upperBound = required + required * (ALLOWANCE_TRESHOLD);
    const isWithinAllowance = stagedAmount >= lowerBound && stagedAmount <= upperBound;
    setIsCompletable(isWithinAllowance);
  }, [stagings, setIsCompletable, selectedBomItem])


  if (!isCompletable || selectedBomItem?.statusId !== bprStagingStatuses.notStarted) return false

  return (
    <button
      className="btn btn-lg btn-success min-h-20"
      onClick={handleClick}
    >
      {t(translations, 'completeStagingButton')}
    </button>
  )
}

export default CompleteStagingButton
