import React from "react";
import { motion } from "framer-motion";
import { Download, Star, Book as BookIcon } from "lucide-react";
import { Book } from "../types";
import { BookService } from "../services/bookService";

interface BookCardProps {
  book: Book;
  onDownload?: () => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onDownload }) => {
  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    BookService.incrementDownload(book.id);

    if (onDownload) {
      onDownload();
    } else {
      // دانلود واقعی از Supabase
      if (book.pdfUrl && book.pdfUrl !== "#") {
        window.open(book.pdfUrl, "_blank");
      } else {
        alert(`کتاب "${book.title}" در حال حاضر برای دانلود موجود نیست.`);
      }
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] hover:border-cyan-500/30 transition-all duration-300 flex flex-col h-full"
    >
      <div className="relative aspect-[2/3] overflow-hidden group">
        <img
          src={book.coverUrl}
          alt={book.title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <span className="text-white font-medium text-sm bg-cyan-600/90 px-2 py-1 rounded w-max mb-2 backdrop-blur-md">
            {book.category}
          </span>
        </div>
        {book.featured && (
          <div className="absolute top-2 right-2 bg-yellow-500/90 text-yellow-50 p-1 rounded-full shadow-lg backdrop-blur-md">
            <Star className="w-4 h-4 fill-current" />
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3
          className="text-lg font-bold text-slate-100 leading-tight mb-1 line-clamp-2"
          title={book.title}
        >
          {book.title}
        </h3>
        <p className="text-slate-400 text-sm mb-3">{book.author}</p>
        <p className="text-slate-500 text-xs line-clamp-3 mb-4 flex-grow">
          {book.description}
        </p>

        <div className="mt-auto pt-4 border-t border-slate-700/50 flex items-center justify-between">
          <span className="text-xs text-slate-500 flex items-center gap-1">
            <Download className="w-3 h-3" /> {book.downloads}
          </span>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 bg-slate-700 hover:bg-cyan-600 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors duration-300"
          >
            <Download className="w-3 h-3" />
            PDF
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default BookCard;
