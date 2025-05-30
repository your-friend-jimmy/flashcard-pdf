# Database Migrations

This directory contains SQL migrations for the Flashcard application's Supabase database.

## Migration Files

### 20240330000000_add_deck_updates.sql
- Adds `updated_at` column to decks table with automatic update trigger
- Enables Row Level Security (RLS) on cards table
- Adds RLS policies for cards table to ensure users can only access their own cards
- Verifies RLS policies on decks table

## Running Migrations

These migrations should be run in the Supabase dashboard under:
SQL Editor > New Query > Paste migration SQL

Or using the Supabase CLI:
```bash
supabase db reset
```

## Security Notes
- All tables have RLS enabled
- Users can only access their own decks and associated cards
- Policies use `auth.uid()` to verify ownership
- Nested ownership check for cards through deck ownership 