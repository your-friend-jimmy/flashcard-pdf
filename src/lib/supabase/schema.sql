-- Function to update deck card count
CREATE OR REPLACE FUNCTION update_deck_card_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE decks
    SET card_count = (
      SELECT COUNT(*)
      FROM cards
      WHERE deck_id = NEW.deck_id
    )
    WHERE id = NEW.deck_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE decks
    SET card_count = (
      SELECT COUNT(*)
      FROM cards
      WHERE deck_id = OLD.deck_id
    )
    WHERE id = OLD.deck_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger for INSERT operations
CREATE TRIGGER cards_insert_trigger
AFTER INSERT ON cards
FOR EACH ROW
EXECUTE FUNCTION update_deck_card_count();

-- Trigger for DELETE operations
CREATE TRIGGER cards_delete_trigger
AFTER DELETE ON cards
FOR EACH ROW
EXECUTE FUNCTION update_deck_card_count(); 