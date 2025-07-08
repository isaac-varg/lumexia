import { Panels } from "@/components/Panels"
import SectionTitle from "@/components/Text/SectionTitle"
import { PoWithAccounting } from "../../_actions/getPoWithAccountingDetails"

const AccountingDetails = ({ po }: { po: PoWithAccounting }) => {
    return (
        <Panels.Root>
            <SectionTitle size="small">Accounting</SectionTitle>


            <div className="grid grid-cols-1 gap-4">

                <DetailRow label="Paid" value={po.poAccountingDetail[0]?.paid || false} />
            </div>


        </Panels.Root>
    )
}

const DetailRow = ({ label, value }: { label: string, value: boolean }) => {

    const buttonBase = 'flex p-6 w-40 items-center justify-center rounded-xl font-poppins text-lg font-semibold';
    const unseletedButton = 'bg-neutral-200 hover:bg-neutral-300 hover:cursor-pointer'

    return (
        <div className="flex justify-between items-center p-6 rounded-xl">

            <div className="font-poppins text-2xl font-semibold">
                {label}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className={`${buttonBase} ${value ? 'bg-green-200 hover:cursor-not-allowed ' : unseletedButton}`}>Yes</div>

                <div className={`${buttonBase} ${!value ? 'bg-rose-300 hover:cursor-not-allowed' : unseletedButton}`}>No</div>
            </div>

        </div>
    )
}




export default AccountingDetails
