'use client'

import { SinglePricingExaminationCombined } from "@/actions/accounting/examinations/getOne"
import Card from "@/components/Card"
import Text from "@/components/Text"
import LabelDataPair from "@/components/Text/LabelDataPair"
import { dateFormatString } from "@/configs/data/dateFormatString"
import { DateTime } from "luxon"

const BasicsPanel = ({ exam }: { exam: SinglePricingExaminationCombined }) => {

    return (
        <Card.Root>
            <Card.Title>Item Info</Card.Title>

            <LabelDataPair label="Examined On" data={DateTime.fromJSDate(exam.createdAt).toFormat(dateFormatString)} />
            <LabelDataPair label="Examined By" data={exam.user.name || ''} />
            <LabelDataPair label="Procurement Type" data={exam.examinedItem.procurementType.name} />

        </Card.Root >
    )
}

export default BasicsPanel
