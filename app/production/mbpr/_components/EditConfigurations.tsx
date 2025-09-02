"use client"
import { useRouter } from 'next/navigation'
import React from 'react'
import { TbSettings } from 'react-icons/tb'

const EditConfigurations = () => {
  const router = useRouter()
  return (
    <button
      className='btn btn-secondary'
      onClick={() => router.push('/production/mbpr/configurations')}
    >
      <span className='text-2xl'><TbSettings /></span>
      Configure
    </button>


  )
}

export default EditConfigurations
