import React, { useState, useEffect } from "react";
import { Search, Filter } from "lucide-react";
import { motion } from "framer-motion";
import BookCard from "../components/BookCard";
import { BookService } from "../services/bookService";
import { Book, CATEGORIES, Category } from "../../types";

const AllBooks: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | "All">(
    "All"
  );

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
    const allBooks = BookService.getBooks();
    setBooks(allBooks);
    setFilteredBooks(allBooks);
  }, []);

  useEffect(() => {
    let result = books;

    if (selectedCategory !== "All") {
      result = result.filter((book) => book.category === selectedCategory);
    }

    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      result = result.filter(
        (book) =>
          book.title.toLowerCase().includes(lower) ||
          book.author.toLowerCase().includes(lower)
      );
    }

    setFilteredBooks(result);
  }, [searchTerm, selectedCategory, books]);

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Library Catalog
          </h1>
          <p className="text-slate-400">
            Browse our complete collection of {books.length} resources.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-4 h-4" />
            <input
              type="text"
              placeholder="Search title or author..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-colors w-full sm:w-64"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-4 h-4" />
            <select
              value={selectedCategory}
              onChange={(e) =>
                setSelectedCategory(e.target.value as Category | "All")
              }
              className="pl-10 pr-8 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-colors appearance-none cursor-pointer w-full sm:w-48"
            >
              <option value="All">All Categories</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {filteredBooks.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-slate-500 text-lg">
            No books found matching your criteria.
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("All");
            }}
            className="mt-4 text-cyan-400 hover:underline"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredBooks.map((book) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <BookCard book={book} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllBooks;
