"use client"

import DeckList from '@/components/features/deck/DeckList';
import CreateDeckModal from '@/components/features/deck/CreateDeckModal';
import { Suspense, useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { type Deck } from '@/lib/types/deck';

export default function DecksPage() {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    const fetchDecks = async () => {
      const supabase = createClient();
      const { data: decksData, error } = await supabase
        .from('decks')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && decksData) {
        setDecks(decksData);
      }
    };

    fetchDecks();
  }, []);

  const handleDeleteDeck = (id: string) => {
    setDecks(decks.filter(deck => deck.id !== id));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        My Decks
      </h1>

      <Suspense
        fallback={
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-pulse"
              >
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-6"></div>
                <div className="flex justify-between items-center">
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                </div>
              </div>
            ))}
          </div>
        }
      >
        <DeckList 
          decks={decks} 
          onDeleteDeck={handleDeleteDeck} 
          onCreateClick={() => setIsCreateModalOpen(true)}
        />
      </Suspense>

      <CreateDeckModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
} 