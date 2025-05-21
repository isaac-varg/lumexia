import React from 'react'

const Heading = ({children} : {children: React.ReactNode}) => {
  return (
    <div className='font-poppins font-semibold text-md'>{children}</div>
  )
}

export default Heading
