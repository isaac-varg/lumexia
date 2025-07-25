'use client'
import { useRouter } from "next/navigation"

const DiscrepancyButton = () => {

    const router = useRouter()
    return (
        <button className="btn"
            onClick={() => router.push('/inventory/audit/discrepancy')}
        >Discrepancy Audit</button>
    )
}

export default DiscrepancyButton
