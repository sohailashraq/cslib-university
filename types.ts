export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  description: string;
  coverUrl: string;
  pdfUrl: string;
  featured: boolean;
  downloads: number;
}

export interface AdminStats {
  totalBooks: number;
  totalDownloads: number;
  categories: { name: string; value: number }[];
}

export type Category = 'Algorithms' | 'AI' | 'Web Dev' | 'Systems' | 'Database' | 'Security' | 'Other';

export const CATEGORIES: Category[] = [
  'Algorithms', 'AI', 'Web Dev', 'Systems', 'Database', 'Security', 'Other'
];