import { useFieldContext } from "."

type SelectFieldProps = {
  label: string,
  options: { label: string, value: string }[]
}

const SelectField = ({ label, options }: SelectFieldProps) => {

  const field = useFieldContext<string>()

  return (
    <div className="flex flex-col gap-2">
      <label className="font-medium text-xl text-base-content">{label}</label>
      <select
        value={field.state.value}
        className="select"
        onChange={(e) => field.handleChange(e.target.value)}
      >
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  )
}

export default SelectField


