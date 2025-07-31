import { PoViewModes } from "./ViewMode";

type ModeSelectorProps = {
    onClick: (viewMode: PoViewModes) => void 
    activeMode:  PoViewModes
}

const ModeSelector = ({ onClick, activeMode }: ModeSelectorProps) => {
    return (
        <div className="flex justify-start items-center gap-x-4">
            <h1 className="text-xl font-poppins font-bold">View Mode</h1>

            <button
                className={`btn ${activeMode === 'planning' ? 'btn-success' : ''}`}
                onClick={() => onClick('planning')}
            >
                Planning
            </button>

            <button
                className={`btn ${activeMode === 'table' ? 'btn-success' : ''}`}
                onClick={() => onClick('table')}
            >
                Table
            </button>


        </div>
    )
}

export default ModeSelector
