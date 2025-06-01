import { DeckList } from '@/components/features/deck/DeckList';
import Link from 'next/link';
import { Suspense } from 'react';

export const metadata = {
  title: 'My Decks',
  description: 'Manage your flashcard decks',
};

export default function DecksPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          My Decks
        </h1>
        <Link
          href="/decks/new"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Create a deck
        </Link>
      </div>

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
        <DeckList />
      </Suspense>
    </div>
  );
} 