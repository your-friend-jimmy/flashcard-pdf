"use client"

import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

interface QuestionCardProps {
  question: string
  answer: string
  isLast: boolean
  onNext: () => void
  onPrevious: () => void
}

export default function QuestionCard({ 
  question, 
  answer,
  isLast,
  onNext,
  onPrevious 
}: QuestionCardProps) {
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false)

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Card */}
      <div className="bg-white rounded-lg shadow-lg p-6 min-h-[300px] flex flex-col">
        {/* Question */}
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-4">Question:</h2>
          <p className="text-lg">{question}</p>
        </div>

        {/* Answer Section */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Answer:</h3>
            <button
              onClick={() => setIsAnswerRevealed(!isAnswerRevealed)}
              className="flex items-center gap-2 text-gray-600 hover:text-black"
            >
              {isAnswerRevealed ? (
                <>
                  <EyeOff className="h-5 w-5" />
                  <span>Hide Answer</span>
                </>
              ) : (
                <>
                  <Eye className="h-5 w-5" />
                  <span>Show Answer</span>
                </>
              )}
            </button>
          </div>

          <div className={`transition-opacity duration-200 ${isAnswerRevealed ? 'opacity-100' : 'opacity-0'}`}>
            <p className="text-lg">{answer}</p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-8 pt-4 border-t">
          <button
            onClick={onPrevious}
            className="px-4 py-2 text-gray-600 hover:text-black transition-colors"
          >
            Previous
          </button>
          <button
            onClick={onNext}
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
          >
            {isLast ? 'Complete' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  )
} 