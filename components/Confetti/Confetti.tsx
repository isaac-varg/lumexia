"use client"
import React, { useState, useEffect } from 'react'
import useWindowSize from 'react-use/lib/useWindowSize'
import ReactConfetti from 'react-confetti'
import { getRandomIntBetween } from '@/utils/general/getRandomIntBetween'

type ConfettiProps = {
  remarksCount?: number
}

const Confetti = ({ remarksCount = 4 }: ConfettiProps) => {
  const [isClient, setIsClient] = useState(false) // Track if we're in the client
  const [randonumber, setRandomNumber] = useState(0)

  const remarks = [
    "You're all done!",
    "Nothing to see here!",
    "Let's go home!!",
    "Felicidades a completar!!",
    "Bien Trabajo!!",
    "Asombroso!!",
    "Finished!!",
    "Completado!!",
    "All done! YOU ROCK!",
    "GG"
  ]

  useEffect(() => {
    setIsClient(true) // Set to true when the component is mounted
    setRandomNumber(getRandomIntBetween(0, remarks.length - 1)) // Generate random number on mount
  }, [remarks.length])

  const { width, height } = useWindowSize()

  if (!isClient) {
    return null // Render nothing during SSR to avoid mismatch
  }

  return (
    <div className='flex flex-col gap-8 justify-center items-center w-full h-full'>
      <ReactConfetti width={width} height={height} />
      {Array.from({ length: remarksCount }).map((_, index) => (
        <h1 key={index} className='font-poppins font-black text-8xl animate-pulse text-purple-500'>
          {remarks[randonumber]}
        </h1>
      ))}
    </div>
  )
}

export default Confetti

