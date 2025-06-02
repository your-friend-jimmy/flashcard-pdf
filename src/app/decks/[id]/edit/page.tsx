import { DeckForm } from '@/components/features/deck/DeckForm';
import { getDeck } from '@/app/actions/deck';
import { notFound } from 'next/navigation';

interface EditDeckPageProps {
  params: {
    id: string;
  };
}

export default async function EditDeckPage({ params }: EditDeckPageProps) {
  const { deck, error } = await getDeck(params.id);

  if (error || !deck) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Edit Deck
        </h1>
        <DeckForm deck={deck} />
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: EditDeckPageProps) {
  const { deck } = await getDeck(params.id);

  return {
    title: deck ? `Edit ${deck.title}` : 'Edit Deck',
    description: 'Edit your flashcard deck',
  };
} 