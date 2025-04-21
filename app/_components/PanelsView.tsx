import Requests from "./panels/requests/Requests"

const PanelsView = async () => {

    return (
        <div className="grid grid-cols-3 gap-8">
            <Requests />

        </div>
    )
}

export default PanelsView
