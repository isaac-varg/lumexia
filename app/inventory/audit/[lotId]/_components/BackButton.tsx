"use client"
import ActionButton from '@/components/ActionButton';
import { useRouter } from 'next/navigation'
import React from 'react'

const BackButton = () => {
	const router = useRouter();

	const handleBack = () => {router.back()}

  return (
  <ActionButton onClick={handleBack}>Scan New</ActionButton>
  )
}

export default BackButton
