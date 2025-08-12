"use client"

import { useRouter } from "next/navigation"
import { TbArchive } from "react-icons/tb"

const ArchiveButton = () => {

  const router = useRouter()

  return (
    <button
      className="btn btn-neutral btn-soft"
      onClick={() => router.push('/purchasing/requests/archive')}
    >
      <div className="flex items-center justify-start">
        <span className="text-2xl"> <TbArchive /></span>
        <p>Archive</p>
      </div>

    </button>
  )
}

export default ArchiveButton
