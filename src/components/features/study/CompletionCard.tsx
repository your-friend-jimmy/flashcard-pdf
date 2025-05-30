"use client"

import { PartyPopper } from 'lucide-react'

interface CompletionCardProps {
  totalCards: number
  onStudyAgain: () => void
  onBack: () => void
}

export default function CompletionCard({ 
  totalCards,
  onStudyAgain,
  onBack
}: CompletionCardProps) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          <PartyPopper className="h-12 w-12 text-black" />
        </div>
        
        <h2 className="text-2xl font-bold mb-2">
          Congratulations!
        </h2>
        
        <p className="text-gray-600 mb-8">
          You've completed all {totalCards} cards in this deck.
        </p>

        <div className="flex gap-4 justify-center">
          <button
            onClick={onStudyAgain}
            className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
          >
            Study Again
          </button>
          <button
            onClick={onBack}
            className="px-6 py-2 text-gray-600 hover:text-black transition-colors"
          >
            Back to Decks
          </button>
        </div>
      </div>
    </div>
  )
} 