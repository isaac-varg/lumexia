'use client'
import Panel from "../Panel";
import RequestOption from "./RequestOption";
import { usesPurchasingRequestsPollingQuery } from "@/hooks/appQuery/usePurchasingRequestsQuery";



const Requests = () => {

    const { data: requests, isLoading } = usesPurchasingRequestsPollingQuery();

    const isComplete = requests?.length === 0;


    if (!requests) {
        return (
            <Panel title="New Requests">
                <div className="grid grid-cols-1 gap-1">
                    <div className="skeleton h-4 w-full" />
                    <div className="skeleton h-4 w-full" />
                    <div className="skeleton h-4 w-full" />
                    <div className="skeleton h-4 w-full" />
                    <div className="skeleton h-4 w-full" />
                </div>
            </Panel>
        )
    }

    return (
        <Panel title="New Requests">

            {isComplete && <p className="font-poppins text-lg font-medium text-neutral-800">All done 👍🏽👍🏽🫰🏽🫰🏽</p>}

            {!isComplete && <div className="grid grid-cols-1 gap-1 max-h-[250px] overflow-auto">
                {requests.map((req) => {
                    return (
                        <RequestOption key={req.id} req={req} />
                    )
                })}
            </div>}
        </Panel>
    )
}



export default Requests
