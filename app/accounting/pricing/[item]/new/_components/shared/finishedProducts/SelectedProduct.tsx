import SectionTitle from "@/components/Text/SectionTitle";
import { usePricingSharedSelection } from "@/store/pricingSharedSlice"
import PriceAltering from "./PriceAltering";

const SelectedProduct = () => {

  const { selectedFinishedProduct } = usePricingSharedSelection()

  if (!selectedFinishedProduct) return false;

  return (
    <div className="flex flex-col gap-6">

      <div className="flex justify-between items-center">
        <SectionTitle>{selectedFinishedProduct.name}</SectionTitle>
        <div className="flex gap-2">
          i
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 ">
        <div className="bg-red-300 col-span-1">

          <PriceAltering />
        </div>

        <div className="bg-blue-300 col-span-2">outputs</div>
      </div>


    </div>
  )
}

export default SelectedProduct
