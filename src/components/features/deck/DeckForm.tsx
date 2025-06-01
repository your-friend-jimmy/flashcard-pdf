'use client';

import { type Deck, type CreateDeckInput } from '@/lib/types/deck';
import { createDeck, updateDeck } from '@/app/actions/deck';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface DeckFormProps {
  deck?: Deck;
  onSuccess?: () => void;
}

export function DeckForm({ deck, onSuccess }: DeckFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const input: CreateDeckInput = {
      title: formData.get('title') as string,
      description: formData.get('description') as string || undefined,
      isPublic: formData.get('isPublic') === 'true',
    };

    try {
      if (deck) {
        const result = await updateDeck(deck.id, input);
        if (result.error) {
          setError(result.error);
          return;
        }
      } else {
        const result = await createDeck(input);
        if (result.error) {
          setError(result.error);
          return;
        }
      }

      onSuccess?.();
      router.push('/decks');
    } catch (err) {
      setError('Failed to save deck');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          defaultValue={deck?.title}
          required
          maxLength={100}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          Description
        </label>
        <textarea
          name="description"
          id="description"
          defaultValue={deck?.description}
          maxLength={500}
          rows={3}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
        />
      </div>

      <div>
        <div className="flex items-center">
          <input
            type="checkbox"
            name="isPublic"
            id="isPublic"
            value="true"
            defaultChecked={deck?.isPublic}
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

      {error && (
        <p className="text-sm text-red-600 dark:text-red-500">{error}</p>
      )}

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isSubmitting ? 'Saving...' : deck ? 'Update Deck' : 'Create Deck'}
        </button>
      </div>
    </form>
  );
} 