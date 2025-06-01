import Link from 'next/link';

export default function DeckNotFound() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Deck Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          The deck you're looking for doesn't exist or you don't have permission to view it.
        </p>
        <Link
          href="/decks"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Back to Decks
        </Link>
      </div>
    </div>
  );
} 