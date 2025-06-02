import StudyPageClient from './StudyPageClient'

interface StudyPageProps {
  params: {
    deckId: string
  }
}

export default function StudyPage({ params }: StudyPageProps) {
  return <StudyPageClient deckId={params.deckId} />
} 