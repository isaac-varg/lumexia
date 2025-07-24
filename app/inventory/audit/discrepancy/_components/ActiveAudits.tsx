'use client'
import { Panels } from "@/components/Panels"
import SectionTitle from "@/components/Text/SectionTitle"
import { ActiveDiscrepancyAudit } from "../_actions/getActiveDiscrepancyAudits"
import { DateTime } from "luxon"
import { dateFormatString } from "@/configs/data/dateFormatString"
import { useRouter } from "next/navigation"

const ActiveAudits = ({ actives }: { actives: ActiveDiscrepancyAudit[] }) => {

    const router = useRouter()

    return (
        <Panels.Root>

            <SectionTitle size="small">Active Audits</SectionTitle>

            {actives.map(active => {
                return (
                    <div
                        key={active.id}
                        onClick={() => router.push(`/inventory/audit/discrepancy/conduct?id=${active.id}`)}
                        className="bg-lilac-100 p-8 rounded-xl hover:cursor-pointer hover:bg-lilac-200">

                        <h1 className="font-poppins text-2xl font-semibold">{active.itemType ? active.itemType.name : 'All Items'}</h1>

                        <p className="text-lg font-poppins font-semibold uppercase">Includes {active._count.items} items</p>

                        <p className="text-lg font-poppins font-semibold uppercase">Started on {DateTime.fromJSDate(active.createdAt).toFormat(dateFormatString)}</p>

                    </div>
                )
            })}


        </Panels.Root>
    )
}

export default ActiveAudits
