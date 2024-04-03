import React from 'react';

interface ActionButtonProps {
    label: string;
    onClick: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ label, onClick }) => {
    return (
        <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={onClick}
        >
            {label}
        </button>
    );
};

export default ActionButton;