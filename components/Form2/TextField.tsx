import { useFieldContext } from "."

type TextFieldProps = {
  label: string,
  description?: string,
}

const TextField = ({ label, description }: TextFieldProps) => {

  const field = useFieldContext<string>()

  return (
    <div className="flex flex-col gap-2">
      <label className="font-medium text-xl text-base-content">{label}</label>
      {description && <p className="font-light text-lg text-base-content/80">{description}</p>}
      <input
        value={field.state.value}
        className="input w-full input-lg"
        onChange={(e) => field.handleChange(e.target.value)}
      />
    </div>
  )
}

export default TextField


