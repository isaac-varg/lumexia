import { useFieldContext } from "."

type ToggleFieldProps = {
  label: string,
}

const ToggleField = ({ label }: ToggleFieldProps) => {

  const field = useFieldContext<boolean>()

  return (
    <div className="flex flex-col gap-2">
      <label className="font-medium text-xl text-base-content">{label}</label>

      <input
        type="checkbox"
        className="toggle"
        checked={field.state.value}
        onChange={(e) => field.handleChange(e.target.checked)}
      />
    </div>
  )
}

export default ToggleField


