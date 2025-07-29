import { useState } from "react";

interface ConfirmationButtonProps {
    label: string;
    onConfirmation: () => void;
}
const ConfirmationButton = ({ label, onConfirmation }: ConfirmationButtonProps) => {

    const [isClicked, setIsClicked] = useState(false);

    return (
        <div className="w-full">
            {!isClicked && <button onClick={() => setIsClicked(true)} className="btn btn-warning w-full">{label}</button>}

            {isClicked && (
                <div className="grid grid-cols-2 gap-4">
                    <button
                        className="btn btn-accent w-full"
                        onClick={() => setIsClicked(false)}
                    >
                        Cancel
                    </button>

                    <button
                        className="btn btn-warning w-full"
                        onClick={() => onConfirmation()}
                    >
                        Continue
                    </button>


                </div>
            )}

        </div>
    )
}

export default ConfirmationButton
