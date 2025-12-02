import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, BookOpen, Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/logo.jpg";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", to: "/", hash: "#home" },
    { name: "Books", to: "/books", hash: null },
    { name: "Contact", to: "/", hash: "#contact" },
  ];

  const handleScrollTo = (to: string, hash: string | null) => {
    setIsOpen(false);

    // اگر hash داریم
    if (hash) {
      // اگر در صفحه هدف هستیم، فقط scroll کن
      if (location.pathname === to) {
        setTimeout(() => {
          const element = document.querySelector(hash);
          if (element) {
            element.scrollIntoView({
              behavior: "smooth",
              block: "start", // این مهمه برای موبایل
            });
          }
        }, 100);
      }
      // اگر در صفحه هدف نیستیم، برو به اون صفحه با hash
      else {
        navigate(to + hash);
      }
    }
    // اگر hash نداریم (مثل Books)
    else {
      navigate(to);
    }
  };

  return (
    <nav
      className={`p-4 fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || isOpen
          ? "bg-slate-900/80 backdrop-blur-md border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="bg-gradient-to-tr from-cyan-500 to-blue-600 p-0 rounded-full group-hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] transition-shadow duration-300">
                <img src={logo} className="h-12 w-12 rounded-full" alt="logo" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                CSLib
              </span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleScrollTo(link.to, link.hash)}
                  className="px-3 py-2 rounded-md text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                >
                  {link.name}
                </button>
              ))}
              <button
                onClick={() => navigate("/admin")}
                className="flex items-center space-x-1 px-4 py-2 rounded-full bg-slate-800 border border-slate-700 text-sm font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
              >
                <Shield className="w-4 h-4" />
                <span>Admin</span>
              </button>
            </div>
          </div>

          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-white/10 focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-900 border-b border-slate-800 overflow-hidden"
          >
            <div className="px-2 pt-5 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleScrollTo(link.to, link.hash)}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800"
                >
                  {link.name}
                </button>
              ))}
              <button
                onClick={() => {
                  navigate("/admin");
                  setIsOpen(false);
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-cyan-400 hover:text-cyan-300 hover:bg-slate-800"
              >
                Admin Panel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
