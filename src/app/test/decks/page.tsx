'use client';

import { useState, useEffect } from 'react';
import { createDeck, getDecks, deleteDeck } from '@/app/actions/deck';

export default function TestDecksPage() {
  const [deckCount, setDeckCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDeckCount = async () => {
    console.log('Fetching deck count...');
    setIsLoading(true);
    setError(null);
    try {
      const { decks, error } = await getDecks();
      if (error) {
        console.error('Error fetching decks:', error);
        setError(error);
        return;
      }
      console.log('Decks fetched successfully:', decks?.length);
      setDeckCount(decks?.length || 0);
    } catch (err) {
      console.error('Failed to fetch decks:', err);
      setError('Failed to fetch decks');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log('Component mounted, fetching initial deck count');
    fetchDeckCount();
  }, []);

  const handleCreateDeck = async () => {
    console.log('Creating test deck...');
    setError(null);
    try {
      const result = await createDeck({
        title: `Test Deck ${Date.now()}`,
        description: 'This is a test deck',
        is_public: false,
      });

      if (result.error) {
        console.error('Error creating deck:', result.error);
        setError(result.error);
        return;
      }

      console.log('Deck created successfully:', result.deck);
      // Refresh the count
      fetchDeckCount();
    } catch (err) {
      console.error('Failed to create deck:', err);
      setError('Failed to create deck');
    }
  };

  const handleDeleteLastDeck = async () => {
    setError(null);
    try {
      const { decks, error } = await getDecks();
      if (error) {
        setError(error);
        return;
      }

      if (!decks?.length) {
        setError('No decks to delete');
        return;
      }

      const lastDeck = decks[0]; // Gets the most recent deck since we sort by created_at DESC
      const result = await deleteDeck(lastDeck.id);

      if (result.error) {
        setError(result.error);
        return;
      }

      // Refresh the count
      fetchDeckCount();
    } catch (err) {
      setError('Failed to delete deck');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Deck Operations Test</h1>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Current State</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <p className="text-3xl font-bold">
            Total Decks: <span className="text-blue-600">{deckCount}</span>
          </p>
        )}
      </div>

      <div className="space-y-4">
        <button
          onClick={handleCreateDeck}
          className="block w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
        >
          Create Test Deck
        </button>

        <button
          onClick={handleDeleteLastDeck}
          className="block w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
        >
          Delete Most Recent Deck
        </button>

        <button
          onClick={fetchDeckCount}
          className="block w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Refresh Count
        </button>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
    </div>
  );
} 