# Deck Functionality - Product Requirements Document

## Overview
The deck functionality will allow users to create, manage, and study flashcard decks. This feature is core to the application's learning experience.

## User Stories
1. As a user, I want to create new flashcard decks so I can organize my study materials
2. As a user, I want to view all my decks in a list to quickly access my study materials
3. As a user, I want to edit deck details to keep my study materials up to date
4. As a user, I want to delete decks I no longer need
5. As a user, I want to study cards within a deck to improve my learning

## Technical Requirements

### Data Model
```typescript
interface Deck {
  id: string; // UUID v4
  userId: string; // UUID from Supabase Auth
  title: string;
  description?: string;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
  cardCount: number;
}

// Zod Schema for Validation
const DeckSchema = z.object({
  title: z.string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),
  description: z.string()
    .max(500, "Description must be less than 500 characters")
    .optional(),
  isPublic: z.boolean().default(false),
});

// Database Schema
/*
CREATE TABLE decks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  card_count INTEGER DEFAULT 0
);

-- Indexes
CREATE INDEX idx_decks_user_id ON decks(user_id);
CREATE INDEX idx_decks_created_at ON decks(created_at);
*/
```

### Components Structure
- `DeckList`: Main container for displaying all decks (Server Component)
- `DeckCard`: Individual deck display component (Client Component)
- `DeckForm`: Form for creating/editing decks (Client Component with Server Actions)
- `DeleteDeckButton`: Confirmation dialog for deck deletion (Client Component)
- `StudyDeckButton`: Navigation to study mode (Client Component)
- `DeckFormState`: Form state management for validation feedback
- `OptimisticDeck`: Optimistic UI updates during mutations

## Implementation Tasks

### 1. Setup & Configuration [✓]
- [✓] Create types directory and define Deck interfaces
- [✓] Set up Supabase table for decks
- [✓] Configure database schema and relationships
- [✓] Add necessary environment variables
- [✓] Set up Zod validation schemas

### 2. Data Layer [✓]
- [✓] Create server actions for deck operations
  - [✓] Implement form validation using Zod
  - [✓] Add error handling and type safety
  - [✓] Set up optimistic updates
- [✓] Implement deck creation functionality
- [✓] Implement deck retrieval (list and single)
- [✓] Implement deck update functionality
- [✓] Implement deck deletion with cascade
- [✓] Add data validation using Zod

### 3. Components [✓]
- [✓] Create DeckList component (Server Component)
  - [✓] Implement server-side data fetching
  - [✓] Add Suspense boundaries
- [✓] Create DeckCard component
  - [✓] Add optimistic UI updates
  - [✓] Implement error states
- [✓] Implement DeckForm component
  - [✓] Add client-side validation
  - [✓] Implement server action integration
  - [✓] Add loading states
- [✓] Add DeleteDeckButton with confirmation
  - [✓] Implement optimistic deletion
  - [✓] Add undo functionality
- [✓] Create StudyDeckButton component
- [✓] Add loading states and error boundaries

### 4. Routing & Pages [✓]
- [✓] Set up deck list page route (Server Component)
- [✓] Create new deck page route
- [✓] Implement edit deck page route
- [✓] Add study deck page route
- [✓] Configure dynamic route parameters
- [✓] Add error and loading pages

### 5. UI/UX [✓]
- [✓] Design and implement deck grid layout
- [✓] Add animations for deck interactions
- [✓] Implement responsive design
- [✓] Add loading skeletons
- [✓] Implement error states and messages
- [✓] Add optimistic UI feedback
- [✓] Implement form validation feedback

### 6. Testing & Validation [✓]
- [✓] Add form validation
  - [✓] Client-side validation with HTML attributes
  - [✓] Server-side validation with Zod
- [✓] Implement error handling
- [✓] Test all CRUD operations
- [✓] Verify authentication flow
- [✓] Test responsive behavior
- [✓] Test optimistic updates

### 7. Performance & Optimization [✓]
- [✓] Implement data caching
- [✓] Add pagination for deck list
- [✓] Optimize component rendering
- [✓] Add prefetching for common actions
- [✓] Implement React Suspense boundaries
- [✓] Add streaming for large lists

## Success Criteria
1. Users can successfully create, view, edit, and delete decks
2. All operations are protected by authentication
3. UI is responsive and provides feedback for all actions
4. Data is properly validated and sanitized
5. Performance metrics meet targets:
   - Initial page load < 2s
   - Subsequent interactions < 200ms
6. Optimistic updates provide instant feedback
7. Form validation works on both client and server

## Notes
- Use Server Components where possible to reduce client-side JavaScript
- Implement optimistic updates for better UX
- Follow Next.js best practices for data fetching and routing
- Ensure proper error handling and user feedback
- Use React Suspense for loading states
- Implement proper form validation on both client and server

## Dependencies
- Next.js 15.3.3
- Supabase for database and authentication
- TailwindCSS for styling
- Zod for validation
- React Hook Form (optional, for complex forms) 