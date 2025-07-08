import { Panels } from "@/components/Panels"
import SectionTitle from "@/components/Text/SectionTitle"

const AccountingStatus = () => {
    return (
        <Panels.Root >
            <SectionTitle size="small">Accounting Status</SectionTitle>

            <div className="w-full h-full p-6 flex items-center justify-center bg-green-200 rounded-xl">
                <p className="font-poppins text-2xl font-semibold">
                    Status
                </p>
            </div>

        </Panels.Root>

    )
}

export default AccountingStatus
