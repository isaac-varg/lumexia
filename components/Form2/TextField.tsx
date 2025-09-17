import { useFieldContext } from "."

type TextFieldProps = {
  label: string,
}

const TextField = ({ label }: TextFieldProps) => {

  const field = useFieldContext<string>()

  return (
    <div className="flex flex-col gap-2">
      <label className="font-medium text-xl text-base-content">{label}</label>
      <input
        value={field.state.value}
        className="input w-full input-lg"
        onChange={(e) => field.handleChange(e.target.value)}
      />
    </div>
  )
}

export default TextField


