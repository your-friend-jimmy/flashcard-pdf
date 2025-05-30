"use client"

import Link from 'next/link'
import { Plus } from 'lucide-react'
import Container from './Container'

export default function Header() {
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
          
          <nav className="hidden md:flex space-x-8 items-center">
            <Link 
              href="/create-deck"
              className="text-gray-700 hover:text-black"
            >
              Create Deck
            </Link>
            <Link 
              href="/study"
              className="text-gray-700 hover:text-black"
            >
              Study
            </Link>
            <Link 
              href="/create-deck-manual"
              className="text-gray-700 hover:text-black"
            >
              Create Deck Manually
            </Link>
            <Link 
              href="/create-deck-pdf"
              className="text-gray-700 hover:text-black"
            >
              Create Deck From PDF
            </Link>
          </nav>

          <Link
            href="/create-deck"
            className="inline-flex items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            <Plus className="h-5 w-5 mr-1" />
            Create Deck
          </Link>
        </div>
      </Container>
    </header>
  )
} 