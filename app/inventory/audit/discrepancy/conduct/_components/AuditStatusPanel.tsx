import { Panels } from "@/components/Panels"
import SectionTitle from "@/components/Text/SectionTitle"
import { dateFormatWithTime } from "@/configs/data/dateFormatString"
import { discrepancyAuditItemStatuses } from "@/configs/staticRecords/discrepancyAuditItemStatuses"
import { useDiscrepancySelection } from "@/store/discrepancySlice"
import { DateTime } from "luxon"
import { useEffect, useState } from "react"

const AuditStatusPanel = () => {

  const { auditItems, audit } = useDiscrepancySelection()
  const [notAudited, setNotAudited] = useState<number>(0)
  const [audited, setAudited] = useState<number>(0)

  useEffect(() => {

    if (auditItems.length === 0 || !auditItems) return;

    const completed = auditItems.filter(i => i.statusId === discrepancyAuditItemStatuses.audited);
    const incomplete = auditItems.length - completed.length;

    setNotAudited(incomplete)
    setAudited(completed.length)

  }, [auditItems])


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

      {audit && (
        <div className="flex flex-col gap-y-2 mt-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-zinc-400 font-poppins">Created</span>
            <span className="text-sm font-poppins">
              {DateTime.fromJSDate(new Date(audit.createdAt)).toFormat(dateFormatWithTime)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-zinc-400 font-poppins">Last Edited</span>
            <span className="text-sm font-poppins">
              {DateTime.fromJSDate(new Date(audit.updatedAt)).toFormat(dateFormatWithTime)}
            </span>
          </div>
        </div>
      )}

    </Panels.Root>
  )
}

export default AuditStatusPanel
