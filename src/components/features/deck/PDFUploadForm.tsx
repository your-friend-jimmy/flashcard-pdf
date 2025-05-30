'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/shared/Button'
import { FormField } from '@/components/shared/FormField'
import { FileDropzone } from '@/components/shared/FileDropzone'
import { createClient } from '@/lib/supabase/client'

interface PDFUploadFormData {
  name: string
  description: string
  file: File | null
}

export function PDFUploadForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [userId, setUserId] = useState<string | null>(null)
  
  const [formData, setFormData] = useState<PDFUploadFormData>({
    name: '',
    description: '',
    file: null
  })

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const supabase = createClient()
        const { data: { user }, error: authError } = await supabase.auth.getUser()
        
        if (authError) {
          console.error('Auth error:', authError)
          throw authError
        }
        
        if (!user) {
          throw new Error('No user found')
        }

        setUserId(user.id)
        setIsLoading(false)
      } catch (err) {
        console.error('Auth check error:', err)
        setError('Please sign in to create a deck')
        setIsLoading(false)
      }
    }
    
    checkAuth()
  }, [])

  const handleFileSelect = (file: File) => {
    setFormData(prev => ({
      ...prev,
      file,
      // Auto-fill name from filename if not already set
      name: prev.name || file.name.replace('.pdf', '')
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (isSubmitting) return
    
    setError(null)
    setIsSubmitting(true)

    if (!userId) {
      setError('Please sign in to create a deck')
      setIsSubmitting(false)
      return
    }

    if (!formData.file) {
      setError('Please select a PDF file')
      setIsSubmitting(false)
      return
    }

    try {
      // TODO: Implement PDF processing and deck creation
      console.log('Processing PDF:', formData)
      
      // Navigate to home page after success
      router.replace('/')
    } catch (err) {
      console.error('Error creating deck:', err)
      setError(err instanceof Error ? err.message : 'Failed to create deck. Please try again.')
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="text-center">Loading...</div>
      </div>
    )
  }

  if (error === 'Please sign in to create a deck') {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-600">
          Please sign in to create a deck
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 sm:p-8">
      <h1 className="text-xl sm:text-2xl font-bold mb-2">Create Deck from PDF</h1>
      <p className="text-sm sm:text-base text-gray-600 mb-6">Upload a PDF and let AI generate flashcards from the content</p>
      
      {error && (
        <div className="mb-6 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-md text-sm text-red-600">
          {error}
        </div>
      )}

      {/* File Upload Section */}
      <div className="mb-6 sm:mb-8">
        <FileDropzone
          onFileSelect={handleFileSelect}
          accept=".pdf"
          maxSize={10 * 1024 * 1024} // 10MB
        />
      </div>
      
      {/* Deck Details Section */}
      <div className="space-y-4 mb-6 sm:mb-8">
        <FormField
          label="Deck Name"
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
        />

        <FormField
          label="Description"
          multiline
          rows={3}
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
        />
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        isLoading={isSubmitting}
        disabled={!formData.file || !formData.name}
        className="w-full"
        size="lg"
      >
        Generate Flashcards
      </Button>
    </form>
  )
} 