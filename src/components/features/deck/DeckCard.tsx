"use client"

import { Trash2 } from 'lucide-react'
import Link from 'next/link'

interface DeckCardProps {
  id: string
  title: string
  description: string
  cardCount: number
  onDelete: (id: string) => void
}

export default function DeckCard({
  id,
  title,
  description,
  cardCount,
  onDelete
}: DeckCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <p className="mt-1 text-sm text-gray-500">{description}</p>
          </div>
          <button
            onClick={() => onDelete(id)}
            className="text-gray-400 hover:text-gray-500"
            aria-label="Delete deck"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm text-gray-500">{cardCount} cards</span>
          <Link
            href={`/study/${id}`}
            className="inline-flex items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Study
          </Link>
        </div>
      </div>
    </div>
  )
} 