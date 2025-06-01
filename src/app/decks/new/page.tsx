import { DeckForm } from '@/components/features/deck/DeckForm';

export const metadata = {
  title: 'Create New Deck',
  description: 'Create a new flashcard deck',
};

export default function NewDeckPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Create New Deck
        </h1>
        <DeckForm />
      </div>
    </div>
  );
} 