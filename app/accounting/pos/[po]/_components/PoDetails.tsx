import { Panels } from "@/components/Panels"
import LabelDataPair from "@/components/Text/LabelDataPair"
import SectionTitle from "@/components/Text/SectionTitle"
import Tag from "@/components/Text/Tag"
import { toFracitonalDigits } from "@/utils/data/toFractionalDigits"

const PoDetails = ({ referenceCode, supplier, status, total }: {
    referenceCode: number, supplier: string, status: {
        name: string,
    }, total: number
}) => {
    return (
        <Panels.Root>

            <SectionTitle size="small">Purchase Order</SectionTitle>

            <LabelDataPair label="PO #" data={referenceCode} />
            <LabelDataPair label="Supplier" data={supplier} />
            <LabelDataPair label="Status" data={''}> <Tag color="default" label={status.name} /></LabelDataPair>
            <LabelDataPair label="Total" data={`$ ${toFracitonalDigits.curreny(total)}`} />


        </Panels.Root>
    )
}

export default PoDetails
