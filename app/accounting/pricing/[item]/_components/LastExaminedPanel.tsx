'use client'
import { PricingExamination } from "@/actions/accounting/examinations/getAllByItem"
import Card from "@/components/Card"
import { dateFormatString } from "@/configs/data/dateFormatString"
import { DateTime } from "luxon"
import { useRouter } from "next/navigation"
import { TbGhost2 } from "react-icons/tb"

const LastExaminedPanel = ({ lastExamination }: { lastExamination?: PricingExamination }) => {

    const router = useRouter();


    return (
        <Card.Root>
            <Card.Title>Last Examination</Card.Title>

            {!lastExamination && <p>This item has yet to be examined</p>}

            {lastExamination && (
                <div className="flex flex-col p-6 rounded-xl bg-indigo-100 hover:bg-indigo-200 hover:cursor-pointer" onClick={() => router.push(`/accounting/pricing/details?id=${lastExamination.id}`)}>

                    <div className="flex gap-x-2 justify-start items-center text-neutral-800">
                        <span className="text-2xl"><TbGhost2 /></span>
                        <p className="font-poppins text-xl font-semibold">
                            {lastExamination.user.name}
                        </p>
                    </div>
                    <h1 className="font-poppins text-xl font-semibold">{DateTime.fromJSDate(lastExamination.createdAt).toFormat(dateFormatString)} </h1>

                </div>
            )}
        </Card.Root>
    )
}

export default LastExaminedPanel
