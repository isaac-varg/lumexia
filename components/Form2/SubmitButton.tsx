import { useStore } from "@tanstack/react-form";
import { useFormContext } from ".";

type SubmitButtonProps = {
  children?: React.ReactNode;
  isAlwaysSubmittable?: boolean;
}

const SubmitButton = ({ children, isAlwaysSubmittable = false }: SubmitButtonProps) => {

  const form = useFormContext();
  const [isSubmitting, isDirty] = useStore(form.store, (state) => [
    state.isSubmitting,
    state.isDirty,
  ])

  const isDisabled = isSubmitting || (!isAlwaysSubmittable && !isDirty);

  return (
    <button
      type="submit"
      className={`btn ${isDisabled ? 'btn-disabled' : 'btn-success'}`}
      disabled={isDisabled}
    >
      {children ? children : 'Save'}
    </button>
  )
}

export default SubmitButton
