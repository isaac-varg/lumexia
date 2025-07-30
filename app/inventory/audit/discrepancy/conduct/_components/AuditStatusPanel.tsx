import { Panels } from "@/components/Panels"
import SectionTitle from "@/components/Text/SectionTitle"
import { staticRecords } from "@/configs/staticRecords"
import { useDiscrepancySelection } from "@/store/discrepancySlice"
import { useEffect, useState } from "react"

const AuditStatusPanel = () => {

    const { auditItems } = useDiscrepancySelection()
    const [notAudited, setNotAudited] = useState<number>(0)
    const [audited, setAudited] = useState<number>(0)

    useEffect(() => {

        if (auditItems.length === 0 || !auditItems) return;

        const completed = auditItems.filter(i => i.statusId === staticRecords.inventory.discrepancyAudits.items.statuses.audited);
        const incomplete = auditItems.length - completed.length;

        setNotAudited(incomplete)
        setAudited(completed.length)

    })


    return (
        <Panels.Root>
            <SectionTitle size="small">Status</SectionTitle>

            <div className="flex flex-col gap-y-6">

                <div className="bg-lime-200 py-4 px-6 rounded-xl flex justify-between">
                    <p className="font-poppins font-semibold text-xl text-neutral-700">
                        Audited
                    </p>


                    <p className="font-sans font-semibold text-xl text-neutral-700">
                        {audited}
                    </p>

                </div>

                <div className="bg-rose-300 py-4 px-6 rounded-xl flex justify-between">
                    <p className="font-poppins font-semibold text-xl text-neutral-700">
                        Incomplete
                    </p>


                    <p className="font-sans font-semibold text-xl text-neutral-700">
                        {notAudited}
                    </p>

                </div>
            </div>


        </Panels.Root>
    )
}

export default AuditStatusPanel
