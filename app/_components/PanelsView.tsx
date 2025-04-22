import Pricing from "./panels/pricing/Pricing"
import Receivables from "./panels/receivables/Receivables"
import Requests from "./panels/requests/Requests"
import Welcome from "./panels/welcome/Welcome"

const PanelsView = async () => {

    return (
        <div className="grid grid-cols-3 gap-8">
            <Requests />
            <Pricing /> 
            <Welcome />
            <Receivables />

        </div>
    )
}

export default PanelsView
