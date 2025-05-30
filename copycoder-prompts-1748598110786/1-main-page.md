Set up the frontend according to the following prompt:
  <frontend-prompt>
  Create detailed components with these requirements:
  1. Use 'use client' directive for client-side components
  2. Make sure to concatenate strings correctly using backslash
  3. Style with Tailwind CSS utility classes for responsive design
  4. Use Lucide React for icons (from lucide-react package). Do NOT use other UI libraries unless requested
  5. Use stock photos from picsum.photos where appropriate, only valid URLs you know exist
  6. Configure next.config.js image remotePatterns to enable stock photos from picsum.photos
  7. Create root layout.tsx page that wraps necessary navigation items to all pages
  8. MUST implement the navigation elements items in their rightful place i.e. Left sidebar, Top header
  9. Accurately implement necessary grid layouts
  10. Follow proper import practices:
     - Use @/ path aliases
     - Keep component imports organized
     - Update current src/app/page.tsx with new comprehensive code
     - Don't forget root route (page.tsx) handling
     - You MUST complete the entire prompt before stopping
  </frontend-prompt>

  <summary_title>
AI-Powered Flashcard Creation and Study Platform
</summary_title>

<image_analysis>
1. Navigation Elements:
- Primary navigation: Create Deck, Study, Create Deck Manually, Create Deck From PDF
- Header height: 64px
- Logo: "My Flashcard Decks" in left corner
- Create Deck button (+) in top right corner
- Subtitle text below logo: "Create and study flashcards from PDFs using AI"

2. Layout Components:
- Main container: max-width 1200px, centered
- Header section: full width, padding 16px
- Card containers: ~320px width, rounded corners
- Consistent 16px padding around content blocks

3. Content Sections:
- Deck list area with individual deck cards
- Sample deck card showing:
  - Deck title ("Sample")
  - Description ("test")
  - Card count ("1 cards")
  - Delete icon
  - Study button

4. Interactive Controls:
- Create Deck button: Black background, white text
- Study button: Black background, white text
- Delete icon: Gray, clickable
- Card containers: Hoverable, clickable

5. Colors:
- Primary: #000000 (buttons, text)
- Secondary: #6B7280 (subtitle text)
- Background: #FFFFFF
- Accent: #E5E7EB (card borders)

6. Grid/Layout Structure:
- Single column layout for header
- Grid layout for deck cards
- Responsive grid with auto-fit columns
- 16px gap between grid items
</image_analysis>

<development_planning>
1. Project Structure:
```
src/
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Navigation.tsx
│   │   └── Container.tsx
│   ├── features/
│   │   ├── deck/
│   │   │   ├── DeckCard.tsx
│   │   │   ├── DeckList.tsx
│   │   │   └── CreateDeckButton.tsx
│   │   └── study/
│   └── shared/
│       ├── Button.tsx
│       └── Icons.tsx
├── assets/
├── styles/
├── hooks/
└── utils/
```

2. Key Features:
- Deck creation (PDF and manual)
- Deck management (CRUD operations)
- Study mode
- AI-powered flashcard generation
- Responsive layout system

3. State Management:
```typescript
interface AppState {
  decks: {
    items: Deck[]
    loading: boolean
    error: string | null
  }
  study: {
    currentDeck: Deck | null
    currentCard: number
    progress: number
  }
  creation: {
    method: 'pdf' | 'manual' | null
    progress: number
    error: string | null
  }
}
```

4. Component Architecture:
- App (root)
  - Header
    - Navigation
    - CreateDeckButton
  - DeckList
    - DeckCard
  - StudyMode
  - CreateDeckModal

5. Responsive Breakpoints:
```scss
$breakpoints: (
  'mobile': 320px,
  'tablet': 768px,
  'desktop': 1024px,
  'wide': 1200px
);
```
</development_planning>