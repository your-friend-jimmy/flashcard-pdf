# Flashcard Deck Management Implementation Plan

## Phase 1: Database Updates
1. Update Existing Tables
   ```sql
   -- Add updated_at to decks if not exists
   alter table decks add column if not exists updated_at timestamp with time zone default now();

   -- Add trigger to update updated_at
   create or replace function update_updated_at_column()
   returns trigger as $$
   begin
     new.updated_at = now();
     return new;
   end;
   $$ language plpgsql;

   create trigger update_decks_updated_at
       before update on decks
       for each row
       execute function update_updated_at_column();

   -- Verify RLS policies
   create policy if not exists "Users can view their own decks"
     on decks for select
     using (auth.uid() = user_id);

   create policy if not exists "Users can create their own decks"
     on decks for insert
     with check (auth.uid() = user_id);

   create policy if not exists "Users can update their own decks"
     on decks for update
     using (auth.uid() = user_id);

   create policy if not exists "Users can delete their own decks"
     on decks for delete
     using (auth.uid() = user_id);

   -- Add RLS to cards table if not exists
   alter table cards enable row level security;

   create policy if not exists "Users can view their deck's cards"
     on cards for select
     using (
       exists (
         select 1 from decks
         where decks.id = cards.deck_id
         and decks.user_id = auth.uid()
       )
     );

   create policy if not exists "Users can create cards in their decks"
     on cards for insert
     with check (
       exists (
         select 1 from decks
         where decks.id = cards.deck_id
         and decks.user_id = auth.uid()
       )
     );

   create policy if not exists "Users can update their deck's cards"
     on cards for update
     using (
       exists (
         select 1 from decks
         where decks.id = cards.deck_id
         and decks.user_id = auth.uid()
       )
     );

   create policy if not exists "Users can delete their deck's cards"
     on cards for delete
     using (
       exists (
         select 1 from decks
         where decks.id = cards.deck_id
         and decks.user_id = auth.uid()
       )
     );
   ```

## Phase 2: Type Definitions and API Layer
1. Update Types (`src/types/deck.ts`)
   ```typescript
   export interface Card {
     id: string;
     deck_id: string;
     question: string;
     answer: string;
   }

   export interface Deck {
     id: string;
     user_id: string;
     name: string;
     description?: string;
     created_at: string;
     updated_at: string;
     cards?: Card[];
   }

   export interface DeckWithCardCount extends Deck {
     card_count: number;
   }
   ```

2. Create API Layer (`src/lib/api/decks.ts`)
   - Implement CRUD operations using Supabase client
   - Add error handling and type safety
   - Create reusable hooks for deck operations
   - Add optimistic updates for better UX

## Phase 3: UI Components
1. Update DeckList Component (`src/components/features/deck/DeckList.tsx`)
   - Add loading skeleton
   - Implement error boundary
   - Add empty state
   - Improve grid layout responsiveness

2. Enhance DeckCard Component (`src/components/features/deck/DeckCard.tsx`)
   - Add loading states
   - Implement delete confirmation
   - Add card count display
   - Add last updated timestamp

3. Create DeleteConfirmationModal (`src/components/shared/DeleteConfirmationModal.tsx`)
   - Reusable confirmation dialog
   - Loading state during deletion
   - Error handling

## Phase 4: Homepage Integration
1. Update Homepage (`src/app/page.tsx`)
   - Replace sample data with real data
   - Add server-side data fetching
   - Implement loading states
   - Add error handling
   - Add deck sorting options

## Phase 5: PDF Upload Integration
1. Update PDF Upload Form (`src/components/features/deck/PDFUploadForm.tsx`)
   - Add Supabase storage integration
   - Implement file upload to storage
   - Add progress indicator
   - Handle upload errors

2. Create PDF Processing Service
   - Implement PDF text extraction
   - Parse content into flashcards
   - Save cards to database using existing schema

## Implementation Steps:

### Step 1: Database and Types (1-2 hours)
- [ ] Update database with new columns and triggers
- [ ] Verify and add RLS policies
- [ ] Update TypeScript interfaces
- [ ] Test database changes

### Step 2: API Layer (2-3 hours)
- [ ] Create deck API functions
- [ ] Add error handling
- [ ] Implement optimistic updates
- [ ] Add data validation

### Step 3: UI Enhancements (3-4 hours)
- [ ] Update DeckList with loading states
- [ ] Add delete confirmation
- [ ] Improve error handling
- [ ] Add empty states

### Step 4: Homepage Updates (2-3 hours)
- [ ] Implement real data fetching
- [ ] Add loading states
- [ ] Add sorting and filtering
- [ ] Test with large datasets

### Step 5: PDF Upload (4-5 hours)
- [ ] Add file storage
- [ ] Implement processing
- [ ] Add progress tracking
- [ ] Test with various PDFs

## Testing Checklist:
- [ ] Verify all CRUD operations
- [ ] Test RLS policies
- [ ] Check loading states
- [ ] Validate error handling
- [ ] Test responsive design
- [ ] Verify PDF upload and processing
- [ ] Check data persistence
- [ ] Test card creation
- [ ] Verify deck updates

## Notes:
- Use existing schema and extend as needed
- Maintain compatibility with existing features
- Implement proper error boundaries
- Add retry mechanisms for failed operations
- Consider implementing batch operations
- Add proper TypeScript types throughout
- Use React Query for state management
- Implement proper loading states and skeletons
