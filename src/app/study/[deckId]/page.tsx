"use client"

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
  params: {
    deckId: string
  }
}

export default function StudyPage({ params }: StudyPageProps) {
  return (
    <FlashcardContainer 
      deckId={params.deckId}
      cards={sampleCards}
    />
  )
} 