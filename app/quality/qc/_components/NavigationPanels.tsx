'use client'
import { useRouter } from "next/navigation"
import { TbPlus } from "react-icons/tb"

const NavigationPanels = () => {
    const router = useRouter()

    return (
        <div className="grid grid-cols-3 gap-6 ">

            {/* TODO Make tehse prettier*/}
            <button className="btn h-40" onClick={() => router.push('/quality/qc/examination/new')}>
                <span className="4xl"><TbPlus /></span>
                New 
            </button>
            <button className="btn h-40" onClick={() => router.push('/quality/qc/examination/')}>Examinations</button>
            <button className="btn h-40" onClick={() => router.push('/quality/qc/parameters/')}>Parameters</button>

        </div>
    )
}

export default NavigationPanels
