'use client'

import { useCallback, useState } from 'react'
import { Upload } from 'lucide-react'

interface FileDropzoneProps {
  onFileSelect: (file: File) => void
  accept?: string
  maxSize?: number // in bytes
}

export function FileDropzone({
  onFileSelect,
  accept = '.pdf',
  maxSize = 10 * 1024 * 1024, // 10MB default
}: FileDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const validateFile = (file: File): boolean => {
    setError(null)

    if (!file.type.includes('pdf')) {
      setError('Please upload a PDF file')
      return false
    }

    if (file.size > maxSize) {
      setError(`File size must be less than ${maxSize / (1024 * 1024)}MB`)
      return false
    }

    return true
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const file = e.dataTransfer.files[0]
    if (file && validateFile(file)) {
      onFileSelect(file)
    }
  }, [onFileSelect, maxSize])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && validateFile(file)) {
      onFileSelect(file)
    }
  }, [onFileSelect, maxSize])

  return (
    <div className="w-full">
      <div
        className={`relative border-2 border-dashed rounded-lg p-4 sm:p-6 flex flex-col items-center justify-center cursor-pointer transition-colors min-h-[160px]
          ${isDragging ? 'border-black bg-gray-50' : 'border-gray-300 hover:border-gray-400'}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept={accept}
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          aria-label="File upload"
        />
        
        <Upload className="h-8 w-8 sm:h-10 sm:w-10 text-gray-400 mb-2 sm:mb-3" />
        
        <div className="text-center">
          <p className="text-xs sm:text-sm text-gray-600">
            Drag and drop your PDF here, or{' '}
            <span className="text-black font-semibold">browse</span>
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Maximum file size: {maxSize / (1024 * 1024)}MB
          </p>
        </div>
      </div>

      {error && (
        <p className="mt-2 text-xs sm:text-sm text-red-600">{error}</p>
      )}
    </div>
  )
} 