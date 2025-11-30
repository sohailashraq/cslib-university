export type Category =
  | "AI & ML"
  | "Web Development"
  | "Systems & DevOps"
  | "Data Engineering"
  | "Algorithms"
  | "Programming"
  | "Other";

export const CATEGORIES: Category[] = [
  "AI & ML",
  "Web Development",
  "Systems & DevOps",
  "Data Engineering",
  "Algorithms",
  "Programming",
  "Other",
];

export interface Book {
  id: string;
  title: string;
  author: string;
  category: Category;
  description: string;
  coverUrl: string;
  pdfUrl: string;
  downloads: number;
  featured: boolean;
}

export interface AdminStats {
  totalBooks: number;
  totalDownloads: number;
  categories: { name: string; value: number }[];
}
