import Text from "@/components/Text"
import { useRouter } from "next/navigation"
import { TbPlus } from "react-icons/tb"

const GeneralRequests = () => {
    const router = useRouter();

    return (
        <div className="flex flex-col gap-y-6 ">
            <div className="flex flex-col gap-y-4">
                <span className="text-xl font-poppins text-neutral-600">General Request</span>

                <Text.Normal>Use this option to request items that are not yet in Lumexia</Text.Normal>
            </div>

            <div>
                <button onClick={() => router.push('/purchasing/requests/general/new')} className="btn btn-lg flex gap-x-2 items-center">
                    <span className="text-2xl"><TbPlus /></span>

                    <p>General Request</p>

                </button>
            </div>
        </div>
    )
}

export default GeneralRequests 
