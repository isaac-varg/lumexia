'use client'
import { useRouter } from "next/navigation"

const NavigationPanels = () => {
    const router = useRouter()

    return (
        <div className="grid grid-cols-3 ">
            <button className="btn h-40" onClick={() => router.push('/quality/qc/parameters/')}>Parameters</button>

            <button className="btn h-40" onClick={() => router.push('/')}>Products</button>
        </div>
    )
}

export default NavigationPanels
