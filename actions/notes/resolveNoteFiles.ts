"use server"

import { getFileUrl } from "@/actions/files/getUrl"

type NoteWithFiles = {
  files: {
    id: string
    file: {
      id: string
      name: string
      objectName: string
      bucketName: string
      thumbnailObjectName: string | null
      thumbnailBucketName: string | null
      mimeType: string
      size: number
    }
  }[]
  [key: string]: any
}

export const resolveNoteFiles = async <T extends NoteWithFiles>(notes: T[]) => {
  return Promise.all(
    notes.map(async (note) => ({
      ...note,
      files: await Promise.all(
        note.files.map(async (nf) => {
          const url = await getFileUrl(nf.file.bucketName, nf.file.objectName)
          let thumbnailUrl: string | undefined
          if (nf.file.thumbnailObjectName && nf.file.thumbnailBucketName) {
            thumbnailUrl = await getFileUrl(nf.file.thumbnailBucketName, nf.file.thumbnailObjectName)
          }
          return { ...nf, url, thumbnailUrl }
        })
      ),
    }))
  )
}
