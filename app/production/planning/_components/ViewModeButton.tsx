"use client"
import React, { Dispatch, SetStateAction } from 'react'
import { BprPlanningViewMode } from './ViewMode';

interface ViewModeButtonProps {
    children: React.ReactNode;
    viewMode: BprPlanningViewMode
    onClick: Dispatch<SetStateAction<BprPlanningViewMode>>
    activeViewMode: BprPlanningViewMode
}

const classes = {
    bg: {
        active: 'bg-accent',
        inactive: '' // maywant to change from default later
    }
}

const ViewModeButton = ({ children, viewMode, onClick, activeViewMode }: ViewModeButtonProps) => {

    const bg = viewMode === activeViewMode ? 'active' : 'inactive'

    return (
        <button 
            className={`btn ${classes.bg[bg]}`}
            onClick={() => onClick(viewMode)}
        >
            {children}

        </button>
    )
}

export default ViewModeButton
