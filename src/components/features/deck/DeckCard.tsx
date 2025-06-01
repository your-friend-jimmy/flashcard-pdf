"use client"

import { type Deck } from '@/lib/types/deck';
import { useState } from 'react';
import { deleteDeck } from '@/app/actions/deck';
import Link from 'next/link';

interface DeckCardProps {
  deck: Deck;
  onDelete?: () => void;
}

export function DeckCard({ deck, onDelete }: DeckCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this deck?')) {
      return;
    }

    setIsDeleting(true);
    setError(null);

    try {
      const result = await deleteDeck(deck.id);
      if (result.error) {
        setError(result.error);
      } else {
        onDelete?.();
      }
    } catch (err) {
      setError('Failed to delete deck');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {deck.title}
          </h3>
          {deck.description && (
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
              {deck.description}
            </p>
          )}
        </div>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {deck.cardCount} cards
        </span>
      </div>

      <div className="flex justify-between items-center">
        <div className="space-x-2">
          <Link
            href={`/study/${deck.id}`}
            className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Study
          </Link>
          <Link
            href={`/decks/${deck.id}/edit`}
            className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Edit
          </Link>
        </div>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="text-red-600 hover:text-red-800 text-sm font-medium disabled:opacity-50"
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500">{error}</p>
      )}
    </div>
  );
} 