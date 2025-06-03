import { useFieldArray, useForm } from "react-hook-form";
import { RecognizedCoaData } from "./AiEntry"





type Inputs = {
    data: RecognizedCoaData[]
}

const AiEntrySubmission = ({ data }: { data: RecognizedCoaData[] }) => {

    const 

    const { control, register, handleSubmit } = useForm<Inputs>({
        defaultValues: {
            data: [...data]
        }
    });
    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        control,
        name: "data",
    });


    const onSubmit = (data: Inputs) => {
        console.log(data)
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                {fields.map((field, index) => (
                    <input
                        type="text"
                        key={field.id}
                        {...register(`data.${index}.name` as const)}
                    />
                ))}


                <button className="btn" type="submit">Submit</button>

            </form>



        </div>
    )
}

export default AiEntrySubmission
