import { PDFUploadForm } from '@/components/features/deck/PDFUploadForm'

export const metadata = {
  title: 'Create Deck from PDF - Flashcard App',
  description: 'Upload a PDF and let AI generate flashcards from the content'
}

export default function CreateDeckFromPDFPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-4 sm:py-8 px-4 sm:px-6">
      <PDFUploadForm />
    </main>
  )
} 