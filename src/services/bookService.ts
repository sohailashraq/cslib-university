import { Book, AdminStats, CATEGORIES } from "../../types";
import { INITIAL_BOOKS } from "../../constants";

const STORAGE_KEY = "cslib_books_v1";

export const BookService = {
  getBooks: (): Book[] => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_BOOKS));
      return INITIAL_BOOKS;
    }
    return JSON.parse(stored);
  },

  getBookById: (id: string): Book | undefined => {
    const books = BookService.getBooks();
    return books.find((b) => b.id === id);
  },

  addBook: (book: Omit<Book, "id" | "downloads">): Book => {
    const books = BookService.getBooks();
    const newBook: Book = {
      ...book,
      id: Date.now().toString(),
      downloads: 0,
    };
    const updatedBooks = [newBook, ...books];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBooks));
    return newBook;
  },

  updateBook: (id: string, updates: Partial<Book>): Book | null => {
    const books = BookService.getBooks();
    const index = books.findIndex((b) => b.id === id);
    if (index === -1) return null;

    const updatedBook = { ...books[index], ...updates };
    books[index] = updatedBook;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
    return updatedBook;
  },

  deleteBook: (id: string): void => {
    const books = BookService.getBooks();
    const filtered = books.filter((b) => b.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  },

  getStats: (): AdminStats => {
    const books = BookService.getBooks();
    const totalBooks = books.length;
    const totalDownloads = books.reduce((acc, curr) => acc + curr.downloads, 0);

    const categoryCounts: Record<string, number> = {};
    CATEGORIES.forEach((c) => (categoryCounts[c] = 0));

    books.forEach((b) => {
      if (categoryCounts[b.category] !== undefined) {
        categoryCounts[b.category]++;
      } else {
        // Handle custom/legacy categories
        categoryCounts[b.category] = (categoryCounts[b.category] || 0) + 1;
      }
    });

    const categories = Object.entries(categoryCounts).map(([name, value]) => ({
      name,
      value,
    }));

    return { totalBooks, totalDownloads, categories };
  },

  incrementDownload: (id: string): void => {
    const books = BookService.getBooks();
    const index = books.findIndex((b) => b.id === id);
    if (index !== -1) {
      books[index].downloads += 1;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
    }
  },
};
