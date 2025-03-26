import { MbprFromItem } from "@/actions/production/mbpr/getAllByProducedItem"
import { useMbprWizardActions } from "@/store/mbprWizardSlice"
import { TextUtils } from "@/utils/text"

const VersionCard = ({ mbpr, }: { mbpr: MbprFromItem }) => {
    const { setSelectedMbpr, nextStep } = useMbprWizardActions()

    const handleSelect = () => {
        setSelectedMbpr(mbpr)
        nextStep();

    }
    return (
        <div
            onClick={handleSelect}
            className="grid grid-col gap-y-4 bg-lilac-100 rounded-xl p-4 hover:bg-lilac-200 hover:cursor-pointer">
            <h1 className="font-poppins text-xl text-neutral-800 font-semibold">
                {mbpr.versionLabel}
            </h1>

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
