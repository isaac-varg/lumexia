'use client'

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { TbPhoto, TbTrash, TbMicrophone, TbFile, TbFileTypePdf } from 'react-icons/tb'
import { FileResponseData } from '@/app/api/upload/route'
import VoiceRecorder from './VoiceRecorder'

interface NoteAttachmentsProps {
  pathPrefix?: string
  attachments: FileResponseData[]
  onAdd: (file: FileResponseData) => void
  onRemove: (index: number) => void
}

const NoteAttachments = ({ pathPrefix = 'notes', attachments, onAdd, onRemove }: NoteAttachmentsProps) => {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showVoiceRecorder, setShowVoiceRecorder] = useState(false)

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    for (const file of acceptedFiles) {
      setIsUploading(true)
      setError(null)

      const formData = new FormData()
      formData.append('file', file)
      formData.append('pathPrefix', pathPrefix)

      try {
        const response = await fetch('/api/upload', { method: 'POST', body: formData })
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Upload failed')
        }
        const data: FileResponseData = await response.json()
        onAdd(data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setIsUploading(false)
      }
    }
  }, [pathPrefix, onAdd])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'], 'application/pdf': ['.pdf'] },
    multiple: true,
  })

  const handleVoiceRecorded = (fileData: FileResponseData) => {
    onAdd(fileData)
    setShowVoiceRecorder(false)
  }

  return (
    <div className="flex flex-col gap-y-3">
      <div className="flex flex-row gap-x-2">
        <div
          {...getRootProps()}
          className={`flex-1 border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
            isDragActive ? 'border-blue-500 bg-blue-50' : 'border-base-300 hover:border-base-content/30'
          }`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-y-1">
            <TbPhoto className="text-2xl text-base-content/50" />
            <span className="text-sm text-base-content/60">
              {isUploading ? 'Uploading...' : 'Drop images or PDFs, or click to add'}
            </span>
          </div>
        </div>

        <button
          type="button"
          className={`btn ${showVoiceRecorder ? 'btn-error' : 'btn-neutral'} btn-soft`}
          onClick={() => setShowVoiceRecorder(!showVoiceRecorder)}
        >
          <TbMicrophone className="text-xl" />
        </button>
      </div>

      {showVoiceRecorder && (
        <VoiceRecorder pathPrefix={`${pathPrefix}/voice`} onRecorded={handleVoiceRecorded} />
      )}

      {error && <div className="text-error text-sm">{error}</div>}

      {attachments.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {attachments.map((attachment, index) => (
            <div key={attachment.fileId} className="flex items-center gap-x-2 bg-base-200 rounded-lg px-3 py-2">
              {attachment.mimetype.startsWith('image/') ? (
                <TbPhoto className="text-base-content/60" />
              ) : attachment.mimetype === 'application/pdf' ? (
                <TbFileTypePdf className="text-base-content/60" />
              ) : attachment.mimetype.startsWith('audio/') ? (
                <TbMicrophone className="text-base-content/60" />
              ) : (
                <TbFile className="text-base-content/60" />
              )}
              <span className="text-sm font-poppins truncate max-w-32">{attachment.name}</span>
              <button
                type="button"
                className="btn btn-ghost btn-xs"
                onClick={() => onRemove(index)}
              >
                <TbTrash className="text-error" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default NoteAttachments
