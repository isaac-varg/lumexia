'use client'

import Panel from "../Panel"
import { BsBox2Heart } from "react-icons/bs"
import { useRouter } from "next/navigation"

const LinkButton = ({ icon, title, path }: { icon: JSX.Element, title: string, path: string }) => {

    const router = useRouter()

    return (
        <button className="btn btn-lg h-32">
            <div
                className="flex flex-col gap-y-2 items-center justify-center"
                onClick={() => router.push(path)}
            >
                <span className="text-4xl">{icon}</span>
                <p className="text-2xl">{title}</p>
            </div>
        </button>

    )
}

const Links = () => {
    return (
        <Panel title="Quick Links">
            <div className="grid grid-cols-2 gap-4">
                <LinkButton icon={<BsBox2Heart />} title='Request Item' path="/purchasing/requests/new" />
            </div>
        </Panel>
    )
}

export default Links
