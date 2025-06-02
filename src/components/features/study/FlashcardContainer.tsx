"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import QuestionCard from './QuestionCard'
import ProgressTracker from './ProgressTracker'
import CompletionCard from './CompletionCard'

interface Flashcard {
  id: string
  question: string
  answer: string
}

interface FlashcardContainerProps {
  deckId: string
  cards: Flashcard[]
}

export default function FlashcardContainer({ deckId, cards }: FlashcardContainerProps) {
  const router = useRouter()
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  const handleNext = () => {
    if (currentCardIndex === cards.length - 1) {
      setIsComplete(true)
    } else {
      setCurrentCardIndex(prev => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(prev => prev - 1)
    }
  }

  const handleStudyAgain = () => {
    setCurrentCardIndex(0)
    setIsComplete(false)
  }

  const handleBack = () => {
    router.refresh()
    router.push('/')
  }

  // Handle keyboard navigation
  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'ArrowRight' || event.key === 'Space') {
      handleNext()
    } else if (event.key === 'ArrowLeft') {
      handlePrevious()
    }
  }

  // Add keyboard event listeners
  useState(() => {
    window.addEventListener('keydown', handleKeyPress)
    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [currentCardIndex, isComplete])

  if (isComplete) {
    return (
      <CompletionCard
        totalCards={cards.length}
        onStudyAgain={handleStudyAgain}
        onBack={handleBack}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto">
        <ProgressTracker
          currentCard={currentCardIndex + 1}
          totalCards={cards.length}
        />

        <QuestionCard
          question={cards[currentCardIndex].question}
          answer={cards[currentCardIndex].answer}
          isLast={currentCardIndex === cards.length - 1}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      </div>
    </div>
  )
} 