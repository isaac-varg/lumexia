import { Panels } from "@/components/Panels"
import LabelDataPair from "@/components/Text/LabelDataPair"
import SectionTitle from "@/components/Text/SectionTitle"
import Tag from "@/components/Text/Tag"
import { dateFormatWithTime } from "@/configs/data/dateFormatString"
import { toFracitonalDigits } from "@/utils/data/toFractionalDigits"
import { DateTime } from "luxon"

const PoDetails = ({ referenceCode, supplier, status, total, poCreatedAt }: {
  referenceCode: number, supplier: string, status: {
    name: string,
  }, total: number, poCreatedAt: Date
}) => {
  return (
    <Panels.Root>

      <SectionTitle size="small">Purchase Order</SectionTitle>

      <LabelDataPair label="PO #" data={referenceCode} />
      <LabelDataPair label="PO Created On" data={DateTime.fromJSDate(poCreatedAt).toFormat(dateFormatWithTime)} />
      <LabelDataPair label="Supplier" data={supplier} />
      <LabelDataPair label="Status" data={''}> <Tag color="default" label={status.name} /></LabelDataPair>
      <LabelDataPair label="Total" data={`$ ${toFracitonalDigits.curreny(total)}`} />


    </Panels.Root>
  )
}

export default PoDetails
