import { Panels } from "@/components/Panels"
import SectionTitle from "@/components/Text/SectionTitle"
import { AccountingLog } from "../../_actions/getAccountingAuditLogsByPo"
import { MdClass } from "react-icons/md"
import { DateTime } from "luxon"
import { dateFormatString } from "@/configs/data/dateFormatString"



const AccountingAuditLogs = ({ logs }: { logs: AccountingLog[] }) => {
    return (
        <Panels.Root span={3}>
            <SectionTitle size="small">Audit Logs</SectionTitle>

            <div className="max-h-[600px] overflow-auto grid grid-cols-3 gap-6">

                {logs.map((log, i) => <AuditLog key={log.id} log={log} index={i} />)}

            </div>
        </Panels.Root>

    )
}

const AuditLog = ({ log, index }: { log: AccountingLog, index: number }) => {

    const isEven = index % 2 === 0;

    return (
        <div className={`${isEven ? 'bg-lilac-200' : 'bg-blue-200'} p-6 rounded-xl flex flex-col gap-y-4`}>

            <div className="flex justify-between">
                <div className="flex items-center gap-x-4">
                    <img className="w-12 h-12 rounded-full" src={log.user.image || ''} />
                    <h3 className='font-poppins font-medium text-sm'>{log.user.name}</h3>
                </div>

                <h2 className="font-poppins font-medium text-sm uppercase">
                    {DateTime.fromJSDate(log.createdAt).toFormat(dateFormatString)}
                </h2>

            </div>


            <h2 className="font-poppins font-medium text-sm uppercase">
                {log.action}
            </h2>

            <p>{log.context}</p>



        </div>
    )
}

export default AccountingAuditLogs
