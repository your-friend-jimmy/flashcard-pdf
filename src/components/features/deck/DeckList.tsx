"use client"

import DeckCard from './DeckCard'

interface Deck {
  id: string
  title: string
  description: string
  cardCount: number
}

interface DeckListProps {
  decks: Deck[]
  onDeleteDeck: (id: string) => void
}

export default function DeckList({ decks, onDeleteDeck }: DeckListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {decks.map((deck) => (
        <DeckCard
          key={deck.id}
          id={deck.id}
          title={deck.title}
          description={deck.description}
          cardCount={deck.cardCount}
          onDelete={onDeleteDeck}
        />
      ))}
    </div>
  )
} 