"use client"

import { useMbprWizardActions, useMbprWizardSelection } from "@/store/mbprWizardSlice"
import { useEffect, useState } from "react"
import VersionCard from "./VersionCard"
import SectionTitle from "@/components/Text/SectionTitle"
import Text from '@/components/Text'
import { TbPlus } from "react-icons/tb"
import useDialog from "@/hooks/useDialog"
import MbprForm from "./MbprForm"

const VersionStep = () => {
    const { producesItem, step, isLoading, mbprs, selectedMbpr, isRevalidating } = useMbprWizardSelection()
    const [dialogMode, setDialogMode] = useState<"edit" | "create">('create');
    const { getMbprs  } = useMbprWizardActions()
    const { showDialog } = useDialog()

    useEffect(() => {
        if (producesItem) {
            getMbprs(producesItem.id)
        }
    }, [producesItem, isRevalidating])

    if (!producesItem) return null

    if (step !== 1) return false


    return (
        <div className="flex flex-col gap-y-6">

            <MbprForm mode={dialogMode} mbpr={selectedMbpr} />

            <div className='text-center'>
                <SectionTitle >MBPR Versions</SectionTitle>

                <Text.Normal>A version is a set of instructions, materials, batch sizes, and other parameters.There can only be one active MBPR for an item at a time.</Text.Normal>
                <Text.Normal>Select which version you wish to modify or create a new version.</Text.Normal>



            </div>


            {isLoading && <div className="skeleton h-32 w-32"></div>}

            <div className="grid grid-cols-3 gap-4">

                <div onClick={() => { showDialog('mbprNew'); setDialogMode('create') }} className="flex gap-x-4  items-center justify-center text-center gap-y-4 bg-lilac-100 rounded-xl p-4 hover:bg-lilac-200 hover:cursor-pointer">
                    <span className="text-3xl "><TbPlus /></span>
                    <h1 className="font-poppins text-xl text-neutral-800 font-semibold">
                        Add New
                    </h1>

                </div>

                {mbprs.length !== 0 && (
                    mbprs.map((mbpr) => <VersionCard key={mbpr.id} mbpr={mbpr} />)
                )}
            </div>

        </div>
    )
}

export default VersionStep
