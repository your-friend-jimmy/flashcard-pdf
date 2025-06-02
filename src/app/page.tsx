import Container from '@/components/layout/Container'
import DeckList from '@/components/features/deck/DeckList'
import { createClient } from '@/lib/supabase/server'

export default async function Home() {
  const supabase = createClient()
  
  const { data: decks } = await supabase
    .from('decks')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <main className="py-8">
      <Container>
        <div className="space-y-8">
          <DeckList decks={decks || []} />
        </div>
      </Container>
    </main>
  )
}
