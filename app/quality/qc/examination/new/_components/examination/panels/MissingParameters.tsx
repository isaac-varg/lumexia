
import { useQcExaminationSelection } from "@/store/qcExaminationSlice"
import { useRouter } from "next/navigation"
const MissingParameters = () => {
    const { lot } = useQcExaminationSelection()
    const router = useRouter()


    return (
        <div className="flex flex-col gap-y-4 items-center justify-center">
            <p>There are no parameters set for this item</p>
            <button className="btn" onClick={() => router.push(`/inventory/items/${lot?.item.referenceCode}/?id=${lot?.item.id}`)}>Set Parameters in Item Page</button>
        </div>
    )
}

export default MissingParameters
