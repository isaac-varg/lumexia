"use client"
import React from 'react'

const ReadOnly = ({isReadOnly } : { isReadOnly: string}) => {

    if (isReadOnly === 'false') {return null}
  return (
             <div className='flex flex-row items-center justify-center text-4xl bg-pink-300 px-8 py-4 rounded-lg'><p className=' text-pink-100'>READ ONLY MODE</p></div>
  )
}

export default ReadOnly
