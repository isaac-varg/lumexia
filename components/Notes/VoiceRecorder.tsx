'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { TbMicrophone, TbPlayerStop, TbUpload, TbTrash } from 'react-icons/tb'
import { FileResponseData } from '@/app/api/upload/route'

interface VoiceRecorderProps {
  pathPrefix?: string
  onRecorded: (fileData: FileResponseData) => void
}

const VoiceRecorder = ({ pathPrefix = 'notes/voice', onRecorded }: VoiceRecorderProps) => {
  const [isRecording, setIsRecording] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [duration, setDuration] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [audioLevel, setAudioLevel] = useState(0)
  const [reviewBlob, setReviewBlob] = useState<{ blob: Blob; mimeType: string; url: string } | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const animationFrameRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
      if (audioContextRef.current) audioContextRef.current.close()
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop()
      }
      if (reviewBlob) URL.revokeObjectURL(reviewBlob.url)
    }
  }, [])

  const getSupportedMimeType = () => {
    const types = ['audio/webm', 'audio/mp4', 'audio/ogg']
    for (const type of types) {
      if (MediaRecorder.isTypeSupported(type)) return type
    }
    return 'audio/webm'
  }

  const uploadBlob = useCallback(async (blob: Blob, mimeType: string) => {
    setIsUploading(true)
    setError(null)

    const ext = mimeType.includes('mp4') ? '.mp4' : mimeType.includes('ogg') ? '.ogg' : '.webm'
    const file = new File([blob], `voice-note${ext}`, { type: mimeType })
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
      onRecorded(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsUploading(false)
    }
  }, [pathPrefix, onRecorded])

  const updateAudioLevel = useCallback(() => {
    if (!analyserRef.current) return
    const dataArray = new Uint8Array(analyserRef.current.fftSize)
    analyserRef.current.getByteTimeDomainData(dataArray)

    let sum = 0
    for (let i = 0; i < dataArray.length; i++) {
      const v = (dataArray[i] - 128) / 128
      sum += v * v
    }
    const rms = Math.sqrt(sum / dataArray.length)
    setAudioLevel(Math.min(1, rms * 3))

    animationFrameRef.current = requestAnimationFrame(updateAudioLevel)
  }, [])

  const startRecording = async () => {
    try {
      setError(null)
      if (reviewBlob) {
        URL.revokeObjectURL(reviewBlob.url)
        setReviewBlob(null)
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mimeType = getSupportedMimeType()
      const mediaRecorder = new MediaRecorder(stream, { mimeType })
      mediaRecorderRef.current = mediaRecorder
      chunksRef.current = []

      // Set up audio analyser
      const audioContext = new AudioContext()
      const source = audioContext.createMediaStreamSource(stream)
      const analyser = audioContext.createAnalyser()
      analyser.fftSize = 256
      source.connect(analyser)
      audioContextRef.current = audioContext
      analyserRef.current = analyser

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data)
      }

      mediaRecorder.onstop = () => {
        stream.getTracks().forEach(track => track.stop())
        if (timerRef.current) clearInterval(timerRef.current)
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
        audioContext.close()
        audioContextRef.current = null
        analyserRef.current = null
        setAudioLevel(0)

        const blob = new Blob(chunksRef.current, { type: mimeType })
        if (blob.size > 0) {
          const url = URL.createObjectURL(blob)
          setReviewBlob({ blob, mimeType, url })
        }
      }

      mediaRecorder.start()
      setIsRecording(true)
      setDuration(0)
      timerRef.current = setInterval(() => setDuration(d => d + 1), 1000)
      animationFrameRef.current = requestAnimationFrame(updateAudioLevel)
    } catch (err: any) {
      setError('Microphone access denied. Please allow microphone permissions.')
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  const handleUpload = () => {
    if (!reviewBlob) return
    uploadBlob(reviewBlob.blob, reviewBlob.mimeType)
    URL.revokeObjectURL(reviewBlob.url)
    setReviewBlob(null)
  }

  const handleDiscard = () => {
    if (!reviewBlob) return
    URL.revokeObjectURL(reviewBlob.url)
    setReviewBlob(null)
  }

  const formatDuration = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0')
    const s = (seconds % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }

  return (
    <div className="flex flex-col gap-y-2">
      {isRecording ? (
        <div className="flex items-center gap-x-3 bg-error/10 rounded-xl px-4 py-3">
          <span className="inline-block w-3 h-3 rounded-full bg-error animate-pulse" />
          <span className="font-poppins font-medium text-sm">{formatDuration(duration)}</span>
          <div className="flex-1 h-4 bg-base-300 rounded-full overflow-hidden mx-2">
            <div
              className="h-full bg-error rounded-full transition-[width] duration-75"
              style={{ width: `${audioLevel * 100}%` }}
            />
          </div>
          <button
            type="button"
            className="btn btn-error btn-sm ml-auto"
            onClick={stopRecording}
          >
            <TbPlayerStop className="text-lg" /> Stop
          </button>
        </div>
      ) : reviewBlob ? (
        <div className="flex flex-col gap-y-2 bg-base-200 rounded-xl px-4 py-3">
          <audio controls className="w-full h-8" src={reviewBlob.url} preload="metadata" />
          <div className="flex gap-x-2 justify-end">
            <button
              type="button"
              className="btn btn-error btn-soft btn-sm"
              onClick={handleDiscard}
            >
              <TbTrash className="text-lg" /> Discard
            </button>
            <button
              type="button"
              className="btn btn-success btn-soft btn-sm"
              onClick={handleUpload}
              disabled={isUploading}
            >
              <TbUpload className="text-lg" /> {isUploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          className="btn btn-neutral btn-soft btn-sm"
          onClick={startRecording}
          disabled={isUploading}
        >
          <TbMicrophone className="text-lg" />
          {isUploading ? 'Uploading...' : 'Record Voice Note'}
        </button>
      )}

      {error && (
        <div className="text-error text-sm">{error}</div>
      )}
    </div>
  )
}

export default VoiceRecorder
