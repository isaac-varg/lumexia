import Dialog from '@/components/Dialog'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { MaterialsBom } from './MaterialSufficiency'
import Form from '@/components/Form'
import { useForm } from 'react-hook-form'
import { getPurchasingPriorities } from '../_functions/getPurchasingPriorities'
import { RequestPriority } from '@/types/requestPriority'
import { createRequest } from '../_functions/createRequest'


type RequestFormProps = {
    setMode: Dispatch<SetStateAction<"default" | "request">>
    material: MaterialsBom
}

type Inputs = {
    priorityId: string;
}

const RequestForm = ({
    setMode,
    material,
}: RequestFormProps
) => {

    const form = useForm<Inputs>()

    const [requestPriorities, setRequestPriorities] = useState<RequestPriority[]>();
    const [isLoading, setIsLoading] = useState(false)



    const handleSubmit = async (data: Inputs) => {


        try {
            await createRequest(material, data.priorityId);
        } catch (error) {
            throw new Error("Error in creating request.")
        } finally {
             location.reload()            
        }
    }

    const handleCancel = () => {
        setMode("default")
    }

    useEffect(() => {
        const getter = async () => {

            try {
                setIsLoading(true)
                const priorities = await getPurchasingPriorities();
                setRequestPriorities(priorities)
            } catch (error) {
                throw new Error("Priorities could not be loaded.")
            } finally {
                setIsLoading(false)
            }
        }

        getter()
    }, [])

    if (isLoading) {
        return (
            <div className="flex w-52 flex-col gap-4">
                <div className="skeleton h-32 w-full"></div>
                <div className="skeleton h-4 w-28"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
            </div>
        )
    }


    return (
        <div>
            <Dialog.Title>{material.bom.item.name} Request</Dialog.Title>

            <Form.Root form={form} onSubmit={handleSubmit}>

                {requestPriorities && <Form.Select
                    form={form}
                    label="Priority"
                    fieldName='priorityId'
                    options={requestPriorities.map((priority) => ({ value: priority.id, label: priority.name }))}
                />}

                <div className='flex flex-row gap-x-2 justify-end'>
                    <button className="btn" onClick={handleCancel}>Back</button>
                    <button className='btn bg-success' type='submit'>Submit</button>
                </div>

            </Form.Root>




        </div>
    )
}

export default RequestForm
