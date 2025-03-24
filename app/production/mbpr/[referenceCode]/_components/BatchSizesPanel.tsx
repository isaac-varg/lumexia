"use client"

import { Mbpr } from "@/actions/production/mbpr/getOneMbpr"
import Card from "@/components/Card"
import { TextUtils } from "@/utils/text"
import SetActiveSizeDialog from "./SetActiveSizeDialog"
import useDialog from "@/hooks/useDialog"

const BatchSizesPanel = ({ sizes }: { sizes: Mbpr['BatchSize'] }) => {

    const { showDialog } = useDialog()

    return (
        <Card.Root>
            <SetActiveSizeDialog sizes={sizes} />
            <div className="flex justify-between items-center">

                <Card.Title>Batch Sizes</Card.Title>
                <button onClick={() => showDialog("selectActiveBatchSize")} className="btn btn-accent">Set Active Size</button>

            </div>

            <div className="grid grid-cols-2 gap-6">
                {sizes.map((size) => {

                    return (
                        <div key={size.id} className="flex flex-col gap-y-4 hover:bg-lilac-200 hover:cursor-pointer bg-lilac-100 p-8 rounded-xl ">

                            <h1 className="font-poppins font-semibold text-xl">

                                {size.quantity} lbs
                            </h1>



                            <div style={{ backgroundColor: size.recordStatus.bgColor, color: size.recordStatus.textColor }} className=" font-semibold rounded-xl px-4 py-2 w-fit">
                                {TextUtils.properCase(size.recordStatus.name)}

                            </div>


                        </div>
                    )
                })}
            </div>

        </Card.Root>
    )
}

export default BatchSizesPanel
