"use client"

interface ProgressTrackerProps {
  currentCard: number
  totalCards: number
}

export default function ProgressTracker({ currentCard, totalCards }: ProgressTrackerProps) {
  const progress = (currentCard / totalCards) * 100

  return (
    <div className="w-full max-w-2xl mx-auto mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-600">
          Card {currentCard} of {totalCards}
        </span>
        <span className="text-sm font-medium">{Math.round(progress)}% Complete</span>
      </div>
      
      {/* Progress Bar */}
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-black transition-all duration-300 ease-in-out rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
} 