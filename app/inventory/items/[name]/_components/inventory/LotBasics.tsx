import Card from "@/components/Card"
import LabelDataPair from "@/components/Text/LabelDataPair"
import { dateFormatWithTime } from "@/configs/data/dateFormatString"
import { useItemSelection } from "@/store/itemSlice"
import { toFracitonalDigits } from "@/utils/data/toFractionalDigits"
import { DateTime } from "luxon"
import { useEffect, useState } from "react"

const LotBasics = () => {

  const { selectedLot } = useItemSelection()
  const [originLabel, setOriginLabel] = useState<string>('')

  useEffect(() => {
    if (!selectedLot || !selectedLot.lotOrigin) return;

    switch (selectedLot.lotOrigin.originType) {
      case 'purchaseOrderReceiving':
        setOriginLabel(`PO #${selectedLot.lotOrigin.purchaseOrder?.referenceCode}`)
        break;
      case 'bprProduction':
        setOriginLabel(`BPR #${selectedLot.lotOrigin.bpr?.referenceCode}`)
        break;
      default:
        setOriginLabel(`Unknown`)
        break;
    }
  }, [selectedLot])

  if (!selectedLot) return;
  return (
    <Card.Root>

      <Card.Title>Lot Info</Card.Title>

      <div className="grid grid-cols-1 gap-y-1">

        <LabelDataPair
          data={DateTime.fromJSDate(selectedLot.createdAt).toFormat(dateFormatWithTime)}
          label="Created at"
        />

        <LabelDataPair
          label="Origin"
          data={originLabel}
        />

        <LabelDataPair
          label="Initial Quantity"
          data={`${toFracitonalDigits.weight(selectedLot.initialQuantity)} ${selectedLot.uom.abbreviation}`}
        />

      </div>
    </Card.Root>
  )
}

export default LotBasics
