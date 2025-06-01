'use server';

import { getServerClient, resetSupabaseClients } from '@/lib/supabase/schema-cache';
import { cookies } from 'next/headers';
import { DeckSchema, type CreateDeckInput, type DeckResponse, type DecksResponse, type UpdateDeckInput } from '@/lib/types/deck';
import { revalidatePath } from 'next/cache';

export async function createDeck(input: CreateDeckInput): Promise<DeckResponse> {
  console.log('Creating deck with input:', input);
  try {
    const validatedData = DeckSchema.parse(input);
    console.log('Validated data:', validatedData);
    
    // Reset the schema cache before creating a new deck
    resetSupabaseClients();
    const supabase = getServerClient();

    // Get the current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      console.error('Auth error:', userError);
      return { deck: null, error: 'Unauthorized' };
    }
    console.log('User authenticated:', user.id);

    const { data: deck, error } = await supabase
      .from('decks')
      .insert({
        ...validatedData,
        user_id: user.id,
      })
      .select('*')
      .single();

    if (error) {
      console.error('Database error:', error);
      return { deck: null, error: error.message };
    }

    console.log('Deck created:', deck);
    revalidatePath('/decks');
    revalidatePath('/test/decks');
    return { deck, error: null };
  } catch (error) {
    console.error('Unexpected error:', error);
    if (error instanceof Error) {
      return { deck: null, error: error.message };
    }
    return { deck: null, error: 'An unexpected error occurred' };
  }
}

export async function getDecks(): Promise<DecksResponse> {
  console.log('Fetching decks');
  try {
    // Reset the schema cache before fetching decks
    resetSupabaseClients();
    const supabase = getServerClient();

    // Get the current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      console.error('Auth error:', userError);
      return { decks: null, error: 'Unauthorized' };
    }
    console.log('User authenticated:', user.id);

    const { data: decks, error } = await supabase
      .from('decks')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Database error:', error);
      return { decks: null, error: error.message };
    }

    console.log('Decks fetched:', decks?.length);
    return { decks, error: null };
  } catch (error) {
    console.error('Unexpected error:', error);
    if (error instanceof Error) {
      return { decks: null, error: error.message };
    }
    return { decks: null, error: 'An unexpected error occurred' };
  }
}

export async function getDeck(id: string): Promise<DeckResponse> {
  try {
    const supabase = getServerClient();

    // Get the current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      return { deck: null, error: 'Unauthorized' };
    }

    const { data: deck, error } = await supabase
      .from('decks')
      .select('*')
      .eq('id', id)
      .eq('user_id', user.id)
      .single();

    if (error) {
      return { deck: null, error: error.message };
    }

    return { deck, error: null };
  } catch (error) {
    if (error instanceof Error) {
      return { deck: null, error: error.message };
    }
    return { deck: null, error: 'An unexpected error occurred' };
  }
}

export async function updateDeck(id: string, input: UpdateDeckInput): Promise<DeckResponse> {
  try {
    const validatedData = DeckSchema.partial().parse(input);
    const supabase = getServerClient();

    // Get the current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      return { deck: null, error: 'Unauthorized' };
    }

    const { data: deck, error } = await supabase
      .from('decks')
      .update({
        ...validatedData,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .eq('user_id', user.id)
      .select('*')
      .single();

    if (error) {
      return { deck: null, error: error.message };
    }

    revalidatePath('/decks');
    revalidatePath(`/decks/${id}`);
    return { deck, error: null };
  } catch (error) {
    if (error instanceof Error) {
      return { deck: null, error: error.message };
    }
    return { deck: null, error: 'An unexpected error occurred' };
  }
}

export async function deleteDeck(id: string): Promise<{ error: string | null }> {
  try {
    const supabase = getServerClient();

    // Get the current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      return { error: 'Unauthorized' };
    }

    const { error } = await supabase
      .from('decks')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) {
      return { error: error.message };
    }

    revalidatePath('/decks');
    revalidatePath('/test/decks');
    return { error: null };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: 'An unexpected error occurred' };
  }
} 