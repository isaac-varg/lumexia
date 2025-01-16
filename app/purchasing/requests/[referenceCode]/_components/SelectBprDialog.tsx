"use client"

import Dialog from "@/components/Dialog"
import { LinkableBatches } from "../_functions/getLinkableBprs"

const SelectBprDialog = ({ requestId, linkableBprs }: { requestId: string, linkableBprs: LinkableBatches }) => {

    return (
        <Dialog.Root identifier="actionLinkBprToPurchasingRequest">

            <Dialog.Title>Link a Bpr</Dialog.Title>

            <div className="flex flex-col gap-y-6">
            <p> These are batches on the Production docket that contain this material. Select a BPR to link to this Purchasing Request</p>


            <div className="grid grid-cols-4 gap-4 overflow-auto">
                {linkableBprs.map((bpr) => {
                    return (
                        <div key={bpr.bpr.id} className="card bg-indigo-200">
                            <div className="card-body">
                                <span className="card-title">{bpr.bpr.referenceCode} - {bpr.bpr.mbpr.producesItem.name}</span>

                                <div className="flex justify-between">

                                        <span>{bpr.bpr.batchSize.quantity} lbs batch</span>
                                        <span className="badge badge-info">{bpr.bpr.status.name}</span>
                                </div>

                            </div>
                        </div>
                    )
                })}

            </div>
</div>


        </Dialog.Root>
    )
}

export default SelectBprDialog
