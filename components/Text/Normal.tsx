import React from 'react'

const Normal = ({ children }: { children: React.ReactNode }) => {
  return (
    <p className='font-poppins text-lg text-base-content font-normal'>{children}</p>
  )
}

export default Normal
