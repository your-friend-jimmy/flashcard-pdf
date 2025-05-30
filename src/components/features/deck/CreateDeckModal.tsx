"use client"

import { FileText, Plus } from 'lucide-react'
import Modal from '@/components/shared/Modal'
import Link from 'next/link'

interface CreateDeckModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function CreateDeckModal({ isOpen, onClose }: CreateDeckModalProps) {
  const options = [
    {
      title: 'Create Manually',
      description: 'Create flashcards one by one with custom content',
      icon: Plus,
      href: '/create-deck-manual'
    },
    {
      title: 'Create from PDF',
      description: 'Upload a PDF to automatically generate flashcards',
      icon: FileText,
      href: '/create-deck-pdf'
    }
  ]

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Deck">
      <div className="space-y-4">
        {options.map((option) => (
          <Link
            key={option.title}
            href={option.href}
            className="block w-full"
            onClick={onClose}
          >
            <div className="flex items-start gap-4 rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50">
              <div className="rounded-full bg-black p-2">
                <option.icon className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-medium">{option.title}</h3>
                <p className="text-sm text-gray-500">{option.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Modal>
  )
} 