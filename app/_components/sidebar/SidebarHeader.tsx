import Image from "next/image";
import logo from "@/configs/assets/logo.png"
import { TbLayoutSidebarLeftExpand } from "react-icons/tb";
import { useRouter } from "next/navigation";
import { useAppActions, useAppSelection } from "@/store/appSlice";

const SidebarHeader = () => {
    const router = useRouter()
    const { toggleSidebarCollapse } = useAppActions()
    const { isSidebarCollapsed } = useAppSelection()

    return (
        <div className="relative">

            <div className="absolute top-1 -right-10  text-xl hover:cursor-pointer btn btn-ghost">

                <TbLayoutSidebarLeftExpand />
            </div>


            <div className="w-full pb-8 flex justify-between items-center">

                <div
                    onClick={() => router.push('/')}
                    className="flex gap-x-2 items-center hover:bg-base-200 pr-2 rounded-xl hover:cursor-pointer">
                    <Image
                        src={logo}
                        alt="Lumexia Logo"
                        width={50}
                        height={50}
                        className="rounded-full p-2 hover:cursor-pointer"
                    />

                    <h1 className="font-poppins text-xl text-base-content capitalize tracking-wide font-semibold">lumexia</h1>

                </div>

            </div>
        </div>

    )
}

export default SidebarHeader
