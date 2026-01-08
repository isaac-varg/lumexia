import React, { Dispatch, SetStateAction } from 'react'

export type AlterMode = 'consumerPrice' | 'markup' | 'profit' | 'profitPercentage';

type Props = {
  alterModeId: AlterMode
  label: string
  currentMode: AlterMode
  onSelect: Dispatch<SetStateAction<AlterMode>>
}

const AlterModeButton = ({ alterModeId, currentMode, label, onSelect }: Props) => {

  const isActive = alterModeId === currentMode;
  return (
    <button
      className={`btn ${isActive ? 'bg-primary' : ''}`}
      onClick={() => onSelect(alterModeId)}
    >
      {label}
    </button>
  )
}

export default AlterModeButton
