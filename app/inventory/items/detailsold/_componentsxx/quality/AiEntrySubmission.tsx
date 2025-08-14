import { useFieldArray, useForm } from "react-hook-form";
import { RecognizedCoaData } from "./AiEntry";
import { useItemDashboardActions, useItemDashboardSelection } from "@/store/itemDashboardSlice";
import { submitPdfParameters } from "../../_functions/quality/submitPdfParameters";

type Inputs = {
  coa: RecognizedCoaData[];
};

// needed because sometimes the llm returns the data in a nested array
// and something a flat array, despite the structured output.
const isNestedArray = (arr: any[]) => {
  return arr.some(Array.isArray);
}

const AiEntrySubmission = ({ data }: { data: RecognizedCoaData[] }) => {

  const flatData = isNestedArray(data) ? data.flatMap(d => d) : data;
  const { item } = useItemDashboardSelection()
  const { setIsItemParametersFetched, setItemParametersPanelMode } = useItemDashboardActions()


  const { control, register, handleSubmit } = useForm<Inputs>({
    defaultValues: {
      coa: flatData,
    }
  });

  const { fields } = useFieldArray({
    control,
    name: "coa"
  });

  const onSubmit = async (data: Inputs) => {
    if (!item) {
      throw new Error("Cannot create parameter link without item.")
    }
    await submitPdfParameters(data.coa, item.id)
    setIsItemParametersFetched(false)
    setItemParametersPanelMode('view')

  }



  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>

        <div className="grid grid-cols-4 gap-2 text-xl font-semibold font-poppins">
          <p>Name</p>
          <p>Specification</p>
          <p>Unit of Measurement</p>
        </div>
        {fields.map((field, index) => (
          <div key={field.id} className="grid grid-cols-4 gap-2">

            <input
              className="font-poppins text-lg px-2 py-1 rounded-xl "
              type="text"
              {...register(`coa.${index}.name` as const)}
            />


            <input
              type="text"
              className="font-poppins text-lg px-2 py-1 rounded-xl "
              {...register(`coa.${index}.specification` as const)}
            />



            <input
              type="text"
              className="font-poppins text-lg px-2 py-1 rounded-xl "
              {...register(`coa.${index}.unitOfMeasurement` as const)}
            />



          </div>
        ))}
        <button className="btn btn-neutral btn-soft" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AiEntrySubmission;

