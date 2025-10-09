import { useProductionActions, useProductionSelection } from "@/store/productionSlice"
import { LuBadgeCheck } from "react-icons/lu";
import { handleCompleteVerification } from "../../_actions/quality/handleCompleteVerification";
import { useRouter } from "next/navigation";

const ButtonCompleteVerification = () => {
  const { selectedBomItem, stagings, qualityMode, bpr } = useProductionSelection()
  const { setQualityMode, setQualityDetailsViewMode } = useProductionActions();
  const router = useRouter();
  const isCompletable = (qualityMode === 'primary' && stagings.every(s => s.isPrimaryVerified)) ||
    (qualityMode === 'secondary' && stagings.every(s => s.isSecondaryVerified));

  const handleComplete = async () => {
    if (!bpr || !selectedBomItem) return;

    handleCompleteVerification(qualityMode, selectedBomItem.id, selectedBomItem.bom.item.name, bpr.id)
    router.refresh();
    setQualityMode(qualityMode)
    setQualityDetailsViewMode('view')
  }


  if (!isCompletable) return false

  return (
    <button onClick={handleComplete} className="btn btn-success capitalize btn-xl min-h-20">
      <LuBadgeCheck className="size-8" />
      {`Complete ${qualityMode} Verification`}
    </button>

  )
}

export default ButtonCompleteVerification
