"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import Container from './Container'
import CreateDeckModal from '@/components/features/deck/CreateDeckModal'

export default function Header() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm h-16">
      <Container>
        <div className="flex justify-between items-center h-16">
          <div className="flex flex-col">
            <Link href="/" className="text-xl font-bold text-black">
              My Flashcard Decks
            </Link>
            <p className="text-sm text-gray-500">
              Create and study flashcards from PDFs using AI
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link 
              href="/study"
              className="hidden md:inline-block text-gray-700 hover:text-black"
            >
              Study
            </Link>
            
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="inline-flex items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              aria-label="Create New Deck"
            >
              <Plus className="h-5 w-5 md:mr-1" />
              <span className="hidden md:inline">Create Deck</span>
            </button>
          </div>
        </div>
      </Container>

      <CreateDeckModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </header>
  )
} 