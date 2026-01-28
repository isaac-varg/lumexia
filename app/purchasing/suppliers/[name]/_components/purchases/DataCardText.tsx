import React from 'react'

type Props = {
  children: React.ReactNode
  size?: keyof typeof classes.size
  color?: keyof typeof classes.color
}

const classes = {
  size: {
    default: 'text-3xl',
    small: 'text-2xl',
    tiny: 'text-lg'
  },
  color: {
    default: 'text-neutral-900',
    light: 'text-neutral-500',
  }
}

const DataCardText = ({ children, size = 'default', color = 'default' }: Props) => {
  return (
    <div className={`font-poppins font-semibold ${classes.size[size]} ${classes.color[color]}`}>
      {children}
    </div>
  )
}

export default DataCardText
