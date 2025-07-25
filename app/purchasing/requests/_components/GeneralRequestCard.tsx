import UserIcon from "@/components/UI/UserIcon"
import { GeneralRequestMinimal } from "../general/_actions/getAllGeneralRequests"
import { useRouter } from "next/navigation"

const GeneralRequestCard = ({ request }: { request: GeneralRequestMinimal }) => {
    const router = useRouter()

    const handleClick = () => {
        router.push(`/purchasing/requests/general/${request.id}?id=${request.id}`)
    }
    return (
        <div
            onClick={() => handleClick()}
            className='card bg-white bg-opacity-70 border-neutral-800/50 border-2 hover:cursor-pointer hover:bg-lilac-300' >
            <div className='card-body flex flex-col gap-y-2'>
                <div className='card-title'>{`${request.title}`}</div>

                <div className='flex flex-row gap-2  items-center'>
                    <UserIcon name={request.user.name || ''} image={request.user.image || ''} />
                    <p className='font-poppins font-semibold text-sm text-neutral-800'>{`${request.user.name}`}</p>
                </div>
            </div>
        </div>


    )
}

export default GeneralRequestCard
