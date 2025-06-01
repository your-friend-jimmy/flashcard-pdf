"use client"

import { DeckCard } from './DeckCard';
import Link from 'next/link';

interface Deck {
  id: string;
  title: string;
  description?: string;
  cardCount: number;
}

interface DeckListProps {
  decks: Deck[];
  onDeleteDeck: (id: string) => void;
}

export default function DeckList({ decks, onDeleteDeck }: DeckListProps) {
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
          <Link
            href="/decks/new"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Create a deck
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {decks.map((deck) => (
        <DeckCard key={deck.id} deck={deck} onDelete={() => onDeleteDeck(deck.id)} />
      ))}
    </div>
  );
} 