'use client';

import { useEffect, useState } from 'react';
import FlashcardContainer from '@/components/features/study/FlashcardContainer';
import { createClient } from '@/lib/supabase/client';

interface Card {
  id: string;
  question: string;
  answer: string;
}

interface StudyPageClientProps {
  deckId: string;
}

export default function StudyPageClient({ deckId }: StudyPageClientProps) {
  const [cards, setCards] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const supabase = createClient();
        
        // First verify the deck exists and user has access
        const { data: deck, error: deckError } = await supabase
          .from('decks')
          .select('id, name')
          .eq('id', deckId)
          .single();

        if (deckError) {
          throw new Error('Failed to fetch deck');
        }

        if (!deck) {
          throw new Error('Deck not found');
        }

        // Then fetch the cards
        const { data: cardsData, error: cardsError } = await supabase
          .from('cards')
          .select('id, question, answer')
          .eq('deck_id', deckId);

        if (cardsError) {
          throw new Error('Failed to fetch cards');
        }

        setCards(cardsData || []);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching cards:', err);
        setError(err instanceof Error ? err.message : 'Failed to load cards');
        setIsLoading(false);
      }
    };

    fetchCards();
  }, [deckId]);

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">Loading cards...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-600">
          {error}
        </div>
      </div>
    );
  }

  if (!cards.length) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">No cards found in this deck.</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <FlashcardContainer 
        deckId={deckId}
        cards={cards}
      />
    </div>
  );
} 