"use client"

import { useState } from 'react'
import Container from '@/components/layout/Container'
import DeckList from '@/components/features/deck/DeckList'
import CreateDeckModal from '@/components/features/deck/CreateDeckModal'
import { type Deck } from '@/lib/types/deck'

export default function Home() {
  const [decks, setDecks] = useState<Deck[]>([])
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const handleDeleteDeck = (id: string) => {
    setDecks(decks.filter(deck => deck.id !== id))
  }

  return (
    <main className="py-8">
      <Container>
        <div className="space-y-8">
          <DeckList 
            decks={decks} 
            onDeleteDeck={handleDeleteDeck} 
            onCreateClick={() => setIsCreateModalOpen(true)}
          />
        </div>
      </Container>

      <CreateDeckModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </main>
  )
}
