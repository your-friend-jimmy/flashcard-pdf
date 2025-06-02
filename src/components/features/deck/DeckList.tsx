"use client"

import { useState } from 'react';
import { DeckCard } from './DeckCard';
import { type Deck } from '@/lib/types/deck';
import CreateDeckModal from './CreateDeckModal';
import { useRouter } from 'next/navigation';

interface DeckListProps {
  decks: Deck[];
}

export default function DeckList({ decks }: DeckListProps) {
  const router = useRouter();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleDeleteDeck = async (id: string) => {
    // The actual deletion is handled in DeckCard component
    router.refresh(); // This will trigger a re-fetch of the decks
  };

  if (!decks?.length) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          No decks yet
        </h3>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Get started by creating your first deck.
        </p>
        <div className="mt-6">
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Create a deck
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {decks.map((deck) => (
          <DeckCard 
            key={deck.id} 
            deck={deck} 
            onDelete={() => handleDeleteDeck(deck.id)} 
          />
        ))}
      </div>

      <CreateDeckModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </>
  );
} 