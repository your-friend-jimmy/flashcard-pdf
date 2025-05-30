"use client"

import { useState } from 'react'
import Container from '@/components/layout/Container'
import DeckList from '@/components/features/deck/DeckList'

// Sample data - in a real app this would come from an API
const initialDecks = [
  {
    id: '1',
    title: 'Sample Deck',
    description: 'A sample flashcard deck',
    cardCount: 10
  },
  {
    id: '2',
    title: 'JavaScript Basics',
    description: 'Core concepts of JavaScript',
    cardCount: 15
  },
  {
    id: '3',
    title: 'React Fundamentals',
    description: 'Essential React concepts',
    cardCount: 20
  }
]

export default function Home() {
  const [decks, setDecks] = useState(initialDecks)

  const handleDeleteDeck = (id: string) => {
    setDecks(decks.filter(deck => deck.id !== id))
  }

  return (
    <main className="py-8">
      <Container>
        <div className="space-y-8">
          <DeckList decks={decks} onDeleteDeck={handleDeleteDeck} />
        </div>
      </Container>
    </main>
  )
}
