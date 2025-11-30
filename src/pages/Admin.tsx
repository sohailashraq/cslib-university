import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Trash2,
  Edit2,
  X,
  Save,
  Upload,
  LayoutDashboard,
  LogOut,
} from "lucide-react";
import { supabase } from "../supabase/client";
import { BookService } from "../services/bookService";
import { UploadService } from "../services/uploadService";
import { Book, CATEGORIES, AdminStats } from "../types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const Login: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "admin") {
      onLogin();
    } else {
      setError("Invalid credentials (try admin/admin)");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-2xl">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Admin Access
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm text-slate-400 mb-1">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-white focus:border-cyan-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-white focus:border-cyan-500 outline-none"
            />
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button className="w-full bg-cyan-600 hover:bg-cyan-500 text-white py-2 rounded font-medium transition-colors">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [books, setBooks] = useState<Book[]>([]);
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const initialFormState = {
    title: "",
    author: "",
    category: "Other",
    description: "",
    coverUrl: "",
    pdfUrl: "",
    featured: false,
  };
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    if (isAuthenticated) {
      refreshData();
    }
  }, [isAuthenticated]);

  const refreshData = () => {
    setBooks(BookService.getBooks());
    setStats(BookService.getStats());
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      BookService.deleteBook(id);
      refreshData();
    }
  };

  const handleEditClick = (book: Book) => {
    setIsEditing(book.id);
    setFormData({
      title: book.title,
      author: book.author,
      category: book.category,
      description: book.description,
      coverUrl: book.coverUrl,
      pdfUrl: book.pdfUrl,
      featured: book.featured,
    });
    setShowAddForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      BookService.updateBook(isEditing, formData);
    } else {
      BookService.addBook(formData);
    }
    setShowAddForm(false);
    setIsEditing(null);
    setFormData(initialFormState);
    refreshData();
  };

  if (!isAuthenticated)
    return <Login onLogin={() => setIsAuthenticated(true)} />;

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            <LayoutDashboard className="text-cyan-400" /> Admin Dashboard
          </h1>
          <p className="text-slate-400">
            Manage library content and view analytics.
          </p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => {
              setFormData(initialFormState);
              setIsEditing(null);
              setShowAddForm(true);
            }}
            className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Book
          </button>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
          <h3 className="text-slate-400 text-sm font-medium uppercase mb-2">
            Total Books
          </h3>
          <p className="text-3xl font-bold text-white">
            {stats?.totalBooks || 0}
          </p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
          <h3 className="text-slate-400 text-sm font-medium uppercase mb-2">
            Total Downloads
          </h3>
          <p className="text-3xl font-bold text-cyan-400">
            {stats?.totalDownloads || 0}
          </p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
          <h3 className="text-slate-400 text-sm font-medium uppercase mb-4">
            Books per Category
          </h3>
          <div className="h-24">
            {stats && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.categories}>
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {stats.categories.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={index % 2 === 0 ? "#06b6d4" : "#3b82f6"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>

      {showAddForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-900 w-full max-w-2xl rounded-xl border border-slate-700 shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-slate-800 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">
                {isEditing ? "Edit Book" : "Add New Book"}
              </h2>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-1">
                    Title
                  </label>
                  <input
                    required
                    className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white focus:border-cyan-500"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1">
                    Author
                  </label>
                  <input
                    required
                    className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white focus:border-cyan-500"
                    value={formData.author}
                    onChange={(e) =>
                      setFormData({ ...formData, author: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-1">
                    Category
                  </label>
                  <select
                    className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white focus:border-cyan-500"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center pt-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) =>
                        setFormData({ ...formData, featured: e.target.checked })
                      }
                      className="w-4 h-4 rounded text-cyan-600 bg-slate-800 border-slate-700"
                    />
                    <span className="text-white text-sm">Featured Book</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-1">
                  Cover Image URL
                </label>
                <input
                  className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white focus:border-cyan-500"
                  placeholder="https://..."
                  value={formData.coverUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, coverUrl: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-1">
                  آپلود PDF کتاب
                </label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      try {
                        console.log("📁 شروع آپلود فایل:", file.name);

                        // تست bucket قبل از آپلود
                        console.log("🔍 تست bucket...");
                        const test = await supabase.storage
                          .from("books")
                          .list();
                        console.log("✅ تست bucket:", test);

                        const pdfUrl = await UploadService.uploadPDF(
                          file,
                          Date.now().toString()
                        );

                        console.log("🎉 آپلود موفق، لینک:", pdfUrl);
                        setFormData({ ...formData, pdfUrl });
                        alert("فایل با موفقیت آپلود شد!");
                      } catch (error) {
                        console.error("❌ خطا در آپلود:", error);
                        alert("خطا در آپلود فایل: " + error.message);
                      }
                    }
                  }}
                  className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white focus:border-cyan-500"
                />
                {formData.pdfUrl && (
                  <p className="text-green-400 text-sm mt-1">
                    ✓ فایل آماده است
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white focus:border-cyan-500"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded font-medium flex items-center gap-2"
                >
                  <Save className="w-4 h-4" /> Save Book
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-400">
            <thead className="bg-slate-950 text-slate-200 uppercase font-medium">
              <tr>
                <th className="px-6 py-4">Book</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Downloads</th>
                <th className="px-6 py-4">Featured</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {books.map((book) => (
                <tr
                  key={book.id}
                  className="hover:bg-slate-800/50 transition-colors"
                >
                  <td className="px-6 py-4 flex items-center gap-3">
                    <img
                      src={book.coverUrl}
                      alt=""
                      className="w-8 h-12 object-cover rounded bg-slate-700"
                    />
                    <div>
                      <div className="font-medium text-white">{book.title}</div>
                      <div className="text-xs">{book.author}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded text-xs font-medium bg-slate-800 text-cyan-400 border border-cyan-900/50">
                      {book.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-300">{book.downloads}</td>
                  <td className="px-6 py-4">
                    {book.featured ? (
                      <span className="text-yellow-500 text-xs font-bold">
                        ★ Featured
                      </span>
                    ) : (
                      <span className="text-slate-600">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEditClick(book)}
                        className="p-2 text-blue-400 hover:bg-blue-400/10 rounded transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(book.id)}
                        className="p-2 text-red-400 hover:bg-red-400/10 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {books.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-slate-500">
                    No books in library. Add one to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;
