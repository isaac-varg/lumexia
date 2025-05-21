import { MbprFromItem } from "@/actions/production/mbpr/getAllByProducedItem"
import { useMbprWizardActions } from "@/store/mbprWizardSlice"
import { TextUtils } from "@/utils/text"
import { MouseEvent } from "react"
import { TbCopy } from "react-icons/tb"
import { duplicateMbpr } from "../../_functions/duplicateMbpr"

const VersionCard = ({ mbpr, }: { mbpr: MbprFromItem }) => {
    const { setSelectedMbpr, setProducesItem, nextStep } = useMbprWizardActions()

    const handleDuplicate = async (event: MouseEvent<HTMLDivElement>) => {
        event.stopPropagation()

        if (!mbpr) throw new Error("mbpr not found");
        const newMbpr = await duplicateMbpr(mbpr.id);

        if (!newMbpr) throw new Error('MBPR not duplicated')

        setProducesItem(newMbpr.producesItemId)
        setSelectedMbpr(newMbpr);


    }

    const handleSelect = () => {
        setSelectedMbpr(mbpr)
        nextStep();
    }
    return (
        <div
            onClick={handleSelect}
            className="grid grid-col gap-y-4 bg-lilac-100 rounded-xl p-4 hover:bg-lilac-200 hover:cursor-pointer">
            <div className="flex justify-between items-center">
                <h1 className="font-poppins text-xl text-neutral-800 font-semibold">
                    {mbpr.versionLabel}
                </h1>
                <div onClick={(event) => handleDuplicate(event)} className=" bg-lilac-100 p-4 h-8 w-8 rounded-full hover:bg-emerald-500 hover:cursor-pointer items-center justify-center flex ">
                    <span className="text-lg">
                        <TbCopy />
                    </span>
                </div>

            </div>

            <div
                className="flex items-center justify-center px-6 py-2 rounded-xl w-fit font-poppins font-semibold text-base"
                style={{ backgroundColor: mbpr.recordStatus.bgColor, color: mbpr.recordStatus.textColor }}
            >
                {TextUtils.properCase(mbpr.recordStatus.name)}
            </div>
        </div>
    )
}

export default VersionCard
