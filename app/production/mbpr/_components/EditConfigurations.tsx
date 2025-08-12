"use client"
import { useRouter } from 'next/navigation'
import React from 'react'
import { TbSettings } from 'react-icons/tb'

const EditConfigurations = () => {
  const router = useRouter()
  return (
    <button
      className='btn flex gap-x-2 items-center text-base-content'
      onClick={() => router.push('/production/mbpr/configurations')}
    >

      <span className='text-2xl'><TbSettings /></span>
      <p className='text-xl font-poppins font-semibold'>Configure</p>
    </button>


  )
}

export default EditConfigurations
