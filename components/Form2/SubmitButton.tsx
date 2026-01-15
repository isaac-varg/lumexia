
import { useStore } from "@tanstack/react-form";
import { useFormContext } from ".";

type SubmitButtonProps = {
  children?: React.ReactNode;
  allowPristine?: boolean;
};

const SubmitButton = ({
  children,
  allowPristine = false,
}: SubmitButtonProps) => {
  const form = useFormContext();

  const [isSubmitting, isDirty] = useStore(form.store, (state) => [
    state.isSubmitting,
    state.isDirty,
  ]);

  const disabled =
    isSubmitting || (!allowPristine && !isDirty);

  return (
    <button
      type="submit"
      className={`btn ${disabled ? "btn-disabled" : "btn-success"}`}
      disabled={disabled}
    >
      {children ?? "Save"}
    </button>
  );
};

export default SubmitButton;

