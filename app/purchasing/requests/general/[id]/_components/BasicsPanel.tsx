import { Panels } from "@/components/Panels"
import { GeneralRequest } from "../../_actions/getGeneralRequest"
import SectionTitle from "@/components/Text/SectionTitle"
import LabelDataPair from "@/components/Text/LabelDataPair"
import { DateTime } from "luxon"
import { dateFormatString } from "@/configs/data/dateFormatString"

const BasicsPanel = ({ title, user, createdAt }: { title: string, user: GeneralRequest['user'], createdAt: GeneralRequest['createdAt'] }) => {

    return (
        <Panels.Root>

            <SectionTitle size="small">Basics</SectionTitle>

            <LabelDataPair label="Title" data={title || ''} />
            <LabelDataPair label='Created At' data={DateTime.fromJSDate(createdAt).toFormat(dateFormatString)} />
            <LabelDataPair label="Requested By" data={user.name || ''} />
        </Panels.Root>
    )
}

export default BasicsPanel
