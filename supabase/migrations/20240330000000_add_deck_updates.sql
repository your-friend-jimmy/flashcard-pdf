-- Add updated_at column to decks table
alter table decks add column if not exists updated_at timestamp with time zone default now();

-- Create updated_at trigger function
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Add trigger to decks table
drop trigger if exists update_decks_updated_at on decks;
create trigger update_decks_updated_at
    before update on decks
    for each row
    execute function update_updated_at_column();

-- Enable RLS on cards table if not already enabled
alter table cards enable row level security;

-- Add RLS policies for cards table
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

-- Verify RLS policies on decks table
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