import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Decks',
  description: 'Manage your flashcard decks',
};

export default function DecksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 