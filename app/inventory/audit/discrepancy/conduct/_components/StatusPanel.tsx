'use client'
import { Panels } from "@/components/Panels"
import SectionTitle from "@/components/Text/SectionTitle"
import { dateFormatString } from "@/configs/data/dateFormatString"
import { useDiscrepancySelection } from "@/store/discrepancySlice"
import { DateTime } from "luxon"

const StatusPanel = () => {

    const { item } = useDiscrepancySelection()
    return (
        <Panels.Root>

            <SectionTitle size="small">Status</SectionTitle>



            <div>
                <p className="text-sm uppercase font-poppins font-semibold">working on item</p>
                <h1 className="font-poppins text-2xl font-semibold text-purple-900 animate-pulse">{item ? item?.item.name : 'Scan To Start'}</h1>
            </div>

            <div>
                <p className="text-sm uppercase font-poppins font-semibold">last audited</p>

                <h1 className="font-poppins text-2xl font-semibold text-neutral-800">
                    {(item && item.lastAudit) ? `${DateTime.fromJSDate(item.lastAudit.createdAt).toFormat(dateFormatString)} by ${item.lastAudit.user.name} ` : 'No Recorded Audit'}
                </h1>
            </div>



        </Panels.Root>
    )
}

export default StatusPanel
