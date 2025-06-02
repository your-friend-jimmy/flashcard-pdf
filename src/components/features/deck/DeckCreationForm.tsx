'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/shared/Button';
import { FormField } from '@/components/shared/FormField';
import { createClient } from '@/lib/supabase/client';
import { createDeck } from '@/app/actions/deck';

interface FlashCard {
  id: string;
  question: string;
  answer: string;
}

interface DeckFormData {
  title: string;
  description: string;
  isPublic: boolean;
  cards: FlashCard[];
}

export function DeckCreationForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<DeckFormData>({
    title: '',
    description: '',
    isPublic: false,
    cards: []
  });

  const [currentCard, setCurrentCard] = useState<Partial<FlashCard>>({
    question: '',
    answer: ''
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const supabase = createClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        
        if (authError) {
          console.error('Auth error:', authError);
          throw authError;
        }
        
        if (!user) {
          throw new Error('No user found');
        }

        setUserId(user.id);
        setIsLoading(false);
      } catch (err) {
        console.error('Auth check error:', err);
        setError('Please sign in to create a deck');
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  const addCard = () => {
    if (!currentCard.question || !currentCard.answer) return;
    
    setFormData(prev => ({
      ...prev,
      cards: [...prev.cards, {
        id: crypto.randomUUID(),
        question: currentCard.question!,
        answer: currentCard.answer!
      }]
    }));

    // Reset current card inputs
    setCurrentCard({ question: '', answer: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    setError(null);
    setIsSubmitting(true);

    if (!userId) {
      setError('Please sign in to create a deck');
      setIsSubmitting(false);
      return;
    }

    try {
      // Create the deck using the server action
      const { deck, error: deckError } = await createDeck({
        title: formData.title,
        description: formData.description,
        isPublic: formData.isPublic
      });

      if (deckError || !deck) {
        throw new Error(deckError || 'Failed to create deck');
      }

      // Create cards using Supabase client
      const supabase = createClient();
      const cardData = formData.cards.map(card => ({
        deck_id: deck.id,
        question: card.question,
        answer: card.answer
      }));

      const { error: cardsError } = await supabase
        .from('cards')
        .insert(cardData);

      if (cardsError) {
        throw new Error(`Failed to create cards: ${cardsError.message}`);
      }

      // Navigate to decks page
      router.replace('/decks');
    } catch (err) {
      console.error('Error creating deck:', err);
      setError(err instanceof Error ? err.message : 'Failed to create deck. Please try again.');
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (error === 'Please sign in to create a deck') {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-600">
          Please sign in to create a deck
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create Deck Manually</h1>
      
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md text-red-600">
          {error}
        </div>
      )}
      
      {/* Deck Details Section */}
      <div className="space-y-4 mb-8">
        <FormField
          label="Deck Name"
          type="text"
          required
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
        />

        <FormField
          label="Description"
          multiline
          rows={3}
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
        />

        <div className="flex items-center">
          <input
            type="checkbox"
            id="isPublic"
            checked={formData.isPublic}
            onChange={(e) => setFormData(prev => ({ ...prev, isPublic: e.target.checked }))}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label
            htmlFor="isPublic"
            className="ml-2 block text-sm text-gray-700 dark:text-gray-200"
          >
            Make this deck public
          </label>
        </div>
      </div>

      {/* Flashcard Input Section */}
      <div className="mb-8">
        <h2 className="text-lg font-bold mb-4">Add Cards</h2>
        <div className="space-y-4">
          <FormField
            label="Question"
            value={currentCard.question || ''}
            onChange={(e) => setCurrentCard(prev => ({ ...prev, question: e.target.value }))}
            placeholder="Enter the question"
          />
          <FormField
            label="Answer"
            value={currentCard.answer || ''}
            onChange={(e) => setCurrentCard(prev => ({ ...prev, answer: e.target.value }))}
            placeholder="Enter the answer"
          />
          <div>
            <Button
              type="button"
              variant="secondary"
              onClick={addCard}
              disabled={!currentCard.question || !currentCard.answer}
              className="w-full"
            >
              Add Card
            </Button>
          </div>
        </div>
      </div>

      {/* Cards Preview Section */}
      {formData.cards.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4">Cards ({formData.cards.length})</h2>
          <div className="space-y-4">
            {formData.cards.map((card, index) => (
              <div key={card.id} className="p-4 bg-white border rounded-md">
                <div className="font-medium">Question {index + 1}</div>
                <p className="text-gray-600 mt-1">{card.question}</p>
                <div className="font-medium mt-2">Answer</div>
                <p className="text-gray-600 mt-1">{card.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        isLoading={isSubmitting}
        disabled={formData.cards.length === 0 || !formData.title}
        className="w-full"
      >
        Create Deck
      </Button>
    </form>
  );
} 