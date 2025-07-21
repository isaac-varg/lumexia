import { Panels } from "@/components/Panels"
import SectionTitle from "@/components/Text/SectionTitle"
import { updateGeneralRequest } from "../_actions/updateGeneralRequest"
import { useRouter } from "next/navigation"

const ActionsPanel = ({ requestId, title }: { requestId: string, title: string }) => {

    const router = useRouter();

    const handleCommit = async () => {
        await updateGeneralRequest(requestId, title);
        router.back()
    }

    return (
        <Panels.Root>

            <SectionTitle size="small">Actions</SectionTitle>

            <div className="grid grid-cols-1 gap-4">

                <button onClick={() => handleCommit()} className="btn btn-success">Commit</button>
            </div>
        </Panels.Root>
    )

}

export default ActionsPanel
