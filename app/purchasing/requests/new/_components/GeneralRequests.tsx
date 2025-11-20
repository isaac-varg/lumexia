import Text from "@/components/Text"
import { useRouter } from "next/navigation"
import { TbPlus } from "react-icons/tb"
import { FaRegFaceGrinBeamSweat } from "react-icons/fa6";

const GeneralRequests = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-y-6 ">
      <span className="text-xl font-poppins text-base-content">Can't Find An Item?</span>

      <div className="flex gap-4 items-center">

        <FaRegFaceGrinBeamSweat className="size-12" />
        <button onClick={() => router.push('/purchasing/requests/general/new')} className="btn btn-lg flex gap-x-2 items-center">
          <span className="text-2xl"><TbPlus /></span>

          <p>Request Item</p>

        </button>
      </div>


      <Text.Normal>Can't find the item you are looking for in the system? Use the button below to request an item by providing an image, link and description. Purchasing will handle sourcing and adding it to Lumexia.</Text.Normal>
    </div>
  )
}

export default GeneralRequests 
