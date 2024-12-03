import { getItems } from "../_functions/getItems"
import ItemSearch from "./ItemSearch"

const InitiatePricingAudit = async () => {

    const items = await getItems()

  return (
    <div>
        <ItemSearch items={items} />
    </div>
  )
}

export default InitiatePricingAudit
