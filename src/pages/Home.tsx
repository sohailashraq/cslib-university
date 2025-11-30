import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Terminal,
  Database,
  Code,
  Cpu,
  Mail,
  Github,
  Linkedin,
  BookOpen,
} from "lucide-react";
import BookCard from "../components/BookCard";
import { BookService } from "../services/bookService";
import { Book } from "../../types";

const TypingEffect = ({ words }: { words: string[] }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  // Blinking cursor
  useEffect(() => {
    const timeout2 = setTimeout(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearTimeout(timeout2);
  }, [blink]);

  // Typing logic
  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      setReverse(true);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, Math.max(reverse ? 75 : subIndex === words[index].length ? 1000 : 150, Math.random() * 350));

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words]);

  return (
    <span className="inline-block min-w-[200px] text-left">
      {`${words[index].substring(0, subIndex)}${blink ? "|" : " "}`}
    </span>
  );
};

const Home: React.FC = () => {
  const [featuredBooks, setFeaturedBooks] = useState<Book[]>([]);

  useEffect(() => {
    const books = BookService.getBooks();
    setFeaturedBooks(books.filter((b) => b.featured).slice(0, 5));
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section
        id="home"
        className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden"
      >
        {/* Animated Background Blobs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[100px]"
          />
          <motion.div
            animate={{
              x: [0, -70, 0],
              y: [0, 100, 0],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px]"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700 text-sm text-cyan-400 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              Over 500+ Books Available
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              <span className="block text-slate-100">Master CS with</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">
                <TypingEffect
                  words={["Algorithms", "AI & ML", "Web Dev", "Systems"]}
                />
              </span>
            </h1>

            <p className="mt-6 text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              A curated library of essential computer science textbooks, cheat
              sheets, and references. Free for every student, forever.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/books"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all duration-300"
              >
                Browse Library
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                to="/admin"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-slate-300 bg-slate-800/50 border border-slate-700 rounded-full hover:bg-slate-800 hover:text-white transition-all duration-300"
              >
                Contributor Login
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section
        id="books-preview"
        className="py-20 bg-slate-900/50 border-y border-slate-800/50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">
                Featured Reads
              </h2>
              <p className="text-slate-400">
                Hand-picked essentials for this semester.
              </p>
            </div>
            <Link
              to="/books"
              className="hidden sm:flex items-center text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
            >
              View All Books <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {featuredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link
              to="/books"
              className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
            >
              View All Books <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories/Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              Everything You Need
            </h2>
            <p className="text-slate-400">
              Categorized for every specialization in the field.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Terminal className="w-8 h-8 text-green-400" />,
                title: "Systems & DevOps",
                desc: "Linux, OS, Networking, and Cloud Infrastructure.",
              },
              {
                icon: <Database className="w-8 h-8 text-yellow-400" />,
                title: "Data Engineering",
                desc: "SQL, NoSQL, Big Data, and Distributed Systems.",
              },
              {
                icon: <Cpu className="w-8 h-8 text-red-400" />,
                title: "AI & Robotics",
                desc: "Machine Learning, Deep Learning, and Computer Vision.",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="p-6 bg-slate-800 rounded-2xl border border-slate-700 hover:border-slate-600 transition-colors"
              >
                <div className="bg-slate-900/50 w-16 h-16 rounded-xl flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-20 bg-slate-900 border-t border-slate-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">
                About the Curator
              </h2>
              <p className="text-slate-400 mb-6 leading-relaxed">
                Hi, I'm a Senior CS Student passionate about open education. I
                built this platform to help fellow students access expensive
                textbooks for free. I believe knowledge should be accessible to
                everyone, regardless of their financial status.
              </p>

              <h3 className="text-xl font-semibold text-white mb-4">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2 mb-8">
                {["React", "TypeScript", "Tailwind", "Firebase", "Node.js"].map(
                  (skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-sm border border-slate-700"
                    >
                      {skill}
                    </span>
                  )
                )}
              </div>

              <div className="flex gap-4">
                <a
                  href="#"
                  className="p-3 bg-slate-800 rounded-full text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="p-3 bg-slate-800 rounded-full text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="mailto:contact@cslib.edu"
                  className="p-3 bg-slate-800 rounded-full text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur-xl opacity-20"></div>
              <div className="relative bg-slate-800 border border-slate-700 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-white mb-4">
                  Get in Touch
                </h3>
                <form
                  className="space-y-4"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                      placeholder="you@university.edu"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">
                      Message
                    </label>
                    <textarea
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500 transition-colors h-32"
                      placeholder="Suggest a book..."
                    ></textarea>
                  </div>
                  <button className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-medium py-2 rounded-lg transition-colors">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
