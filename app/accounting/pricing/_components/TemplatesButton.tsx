'use client'

import { useRouter } from "next/navigation"

const TemplatesButton = () => {
    const router = useRouter()
    return (
        <button className='btn' onClick={() => router.push('/accounting/pricing/templates')}>
            Configure Templates
        </button>
    )
}

export default TemplatesButton
