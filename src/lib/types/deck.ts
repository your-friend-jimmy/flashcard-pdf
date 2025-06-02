import { z } from 'zod';

export interface Deck {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  is_public: boolean;
  created_at: Date;
  updated_at: Date;
  card_count: number;
}

export const DeckSchema = z.object({
  title: z.string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),
  description: z.string()
    .max(500, "Description must be less than 500 characters")
    .optional(),
  is_public: z.boolean().default(false),
});

export type CreateDeckInput = z.infer<typeof DeckSchema>;
export type UpdateDeckInput = Partial<CreateDeckInput>;

// Response types for better type safety
export type DeckResponse = {
  deck: Deck;
  error: null;
} | {
  deck: null;
  error: string;
};

export type DecksResponse = {
  decks: Deck[];
  error: null;
} | {
  decks: null;
  error: string;
}; 