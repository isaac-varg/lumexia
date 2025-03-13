import { PricingExamination } from "@/actions/accounting/examinations/getAllByItem"
import Card from "@/components/Card"
import { dateFormatString } from "@/configs/data/dateFormatString"
import { DateTime } from "luxon"

const LastExaminedPanel = ({ lastExamination }: { lastExamination?: PricingExamination }) => {
    return (
        <Card.Root>
            <Card.Title>Last Examination</Card.Title>

            {!lastExamination && <p>This item has yet to be examined</p>}

            {lastExamination && (
                <div>
                    <h1 className="font-poppins text-xl font-semibold">{DateTime.fromJSDate(lastExamination.createdAt).toFormat(dateFormatString)} </h1>

                    <div className="px-4 py-2 bg-lilac-400 rounded-xl">{lastExamination.user.name}</div>
                </div>
            )}
        </Card.Root>
    )
}

export default LastExaminedPanel
