import StudyPageClient from './StudyPageClient'

interface StudyPageProps {
  params: {
    deckId: string
  }
}

export default async function StudyPage({ params }: StudyPageProps) {
  const deckId = await Promise.resolve(params.deckId)
  return <StudyPageClient deckId={deckId} />
} 