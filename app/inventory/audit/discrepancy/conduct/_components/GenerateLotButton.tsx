import lotActions from "@/actions/inventory/lotActions";
import { useDiscrepancyActions, useDiscrepancySelection } from "@/store/discrepancySlice"
import { generateLotNumber } from "@/utils/lot/generateLotNumber";
import { useRouter } from "next/navigation";
import { createNote } from "../_actions/createNote";
import { discrepancyAuditItemNoteTypes } from "@/configs/staticRecords/discrepancyAuditItemNoteTypes";
import { getUserId } from "@/actions/users/getUserId";

const GenerateLotButton = () => {

  const { item } = useDiscrepancySelection()
  const { setSelectedItem, clearSelectedItem } = useDiscrepancyActions()


  const handleGeneration = async () => {
    if (!item) return;

    const tempItemId = item.item.id;
    const userId = await getUserId();

    try {
      clearSelectedItem()
      const lot = generateLotNumber(item.item.referenceCode, new Date());
      await lotActions.createNew({
        itemId: item.item.id,
        lotNumber: lot,
        initialQuantity: 999999,
        uomId: item.item.inventoryUomId,
      });

      await createNote({
        auditItemId: item.id,
        noteTypeId: discrepancyAuditItemNoteTypes.automated,
        userId,
        content: `Lot ${lot} was generated during discrepenacy audit.`
      })

    } catch (error) {
      throw new Error("Generation failed.")
    } finally {
      setSelectedItem(tempItemId, false);
    }
  }

  if (!item) return false;

  return (
    <button onClick={handleGeneration} className="btn btn-secondary w-full">Generate Lot</button>
  )
}

export default GenerateLotButton
