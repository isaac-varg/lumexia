import { BatchProductionRecord } from "@/types/batchProductionRecord";

type BprCardProps = {
  bpr: BatchProductionRecord
}

const BprCard = ({ bpr }: BprCardProps) => {
 const handleClick = () => {
   console.log('clicked')
 } 
  
  return (
    <div onClick={() => handleClick()} className="border border-neutral-800 rounded-lg flex py-4 px-2 flex-col gap-y-4">
      <h1 className="font-bold font-poppins text-xl"># {bpr.referenceCode} </h1>

      <h1 className="font-bold font-poppins text-xl">{bpr.mbpr.producesItem.name} </h1>
    </div>
  )
}

export default BprCard
