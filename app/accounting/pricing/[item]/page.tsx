import { getItem } from "./_functions/getItem"

interface ItemPricingDashboardProps {
    searchParams: {
        id: string
    }
}

const ItemPricingDashboard = async ( { searchParams } : ItemPricingDashboardProps ) => {

    const item = await getItem(searchParams.id);

    console.log(item)
     

  return (
    <div> 
        <ul>
            <li>basics panel with last checked, last x y z</li>
            <li>commits /history</li>
            <li>pricing trigger origins e.g., if added to pricing due to treshold trigger or production</li>
            <li>pricing trends for competitor</li>
            <li>report print out modal for pdfs for reports/summaries</li>
            <li>add new pricing button that takes you to form/dashboard for starting new pricing verification</li>
        </ul>
    </div>
  )
}

export default ItemPricingDashboard 
