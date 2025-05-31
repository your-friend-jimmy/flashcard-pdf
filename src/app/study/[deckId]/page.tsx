"use client"

import { use } from 'react';
import FlashcardContainer from '@/components/features/study/FlashcardContainer'

// This is temporary sample data - will be replaced with actual data from API
const sampleCards = [
  {
    id: '1',
    question: 'What is 2 + 2?',
    answer: '4'
  },
  {
    id: '2',
    question: 'What is the capital of France?',
    answer: 'Paris'
  },
  {
    id: '3',
    question: 'What is the largest planet in our solar system?',
    answer: 'Jupiter'
  }
]

interface StudyPageProps {
  params: Promise<{
    deckId: string
  }>
}

export default function StudyPage({ params }: StudyPageProps) {
  const { deckId } = use(params);

  if (!deckId) {
    return (
      <div className="container mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-600">
          Deck ID not found
        </div>
      </div>
    );
  }

  return (
    <FlashcardContainer 
      deckId={deckId}
      cards={sampleCards}
    />
  )
} 