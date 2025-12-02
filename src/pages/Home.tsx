import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
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
import Particles from "../components/Particles";
import TextType from "../components/TextType";
import { BookService } from "../services/bookService";
import { Book } from "../types";

// EmailJS را initialize کن
const EMAILJS_PUBLIC_KEY = "LxBYjyr2baCquaccR";
const EMAILJS_SERVICE_ID = "service_aju2ecc";
const EMAILJS_TEMPLATE_ID = "template_yusvrry";

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

// const TypingEffect = ({ words }: { words: string[] }) => {
//   const [index, setIndex] = useState(0);
//   const [subIndex, setSubIndex] = useState(0);
//   const [reverse, setReverse] = useState(false);
//   const [blink, setBlink] = useState(true);

//   useEffect(() => {
//     const timeout2 = setTimeout(() => {
//       setBlink((prev) => !prev);
//     }, 500);
//     return () => clearTimeout(timeout2);
//   }, [blink]);

//   useEffect(() => {
//     if (subIndex === words[index].length + 1 && !reverse) {
//       setReverse(true);
//       return;
//     }

//     if (subIndex === 0 && reverse) {
//       setReverse(false);
//       setIndex((prev) => (prev + 1) % words.length);
//       return;
//     }

//     const timeout = setTimeout(() => {
//       setSubIndex((prev) => prev + (reverse ? -1 : 1));
//     }, Math.max(reverse ? 75 : subIndex === words[index].length ? 1000 : 150, Math.random() * 350));

//     return () => clearTimeout(timeout);
//   }, [subIndex, index, reverse, words]);

//   return (
//     <span className="inline-block min-w-[200px] text-left">
//       {`${words[index].substring(0, subIndex)}${blink ? "|" : " "}`}
//     </span>
//   );
// };

const Home: React.FC = () => {
  const [featuredBooks, setFeaturedBooks] = useState<Book[]>([]);
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    const books = BookService.getBooks();
    setFeaturedBooks(books.filter((b) => b.featured).slice(0, 5));
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailLoading(true);
    setEmailSent(false);

    try {
      // پارامترهای مورد نیاز برای EmailJS
      const templateParams = {
        to_name: "CS Library Admin",
        from_name: formData.name || "Anonymous User",
        message: formData.message,
        reply_to: formData.email,
        user_email: formData.email,
        subject: "New Contact Form Submission - CS Library",
        date: new Date().toLocaleDateString("en-US"),
      };

      console.log("Sending email with params:", templateParams);

      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      );

      console.log("Email sent successfully:", result);

      if (result.status === 200) {
        setEmailSent(true);
        // فرم رو reset کن
        setFormData({
          name: "",
          email: "",
          message: "",
        });

        // پیام موفقیت رو بعد از 5 ثانیه پاک کن
        setTimeout(() => {
          setEmailSent(false);
        }, 5000);
      }
    } catch (error: any) {
      console.error("Email sending failed:", error);

      // نمایش خطای دقیق‌تر
      let errorMessage = "Failed to send message. Please try again.";

      if (error?.text) {
        if (error.text.includes("Invalid template ID")) {
          errorMessage =
            "Invalid email template. Please contact administrator.";
        } else if (error.text.includes("Invalid service ID")) {
          errorMessage = "Invalid email service. Please contact administrator.";
        } else if (error.text.includes("user key")) {
          errorMessage =
            "Email configuration error. Please contact administrator.";
        }
      }

      alert(errorMessage);
    } finally {
      setEmailLoading(false);
    }
  };

  const sendTestEmail = async () => {
    try {
      const testParams = {
        to_name: "Test Admin",
        from_name: "Test User",
        message: "This is a test message from CS Library contact form.",
        reply_to: "test@example.com",
        user_email: "test@example.com",
        subject: "Test Email - CS Library",
        date: new Date().toLocaleDateString("en-US"),
      };

      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        testParams
      );

      alert(`Test email sent successfully! Status: ${result.status}`);
      console.log("Test email result:", result);
    } catch (error: any) {
      alert(`Test email failed: ${error?.text || error.message}`);
      console.error("Test email error:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section
        id="home"
        className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden min-h-[90vh] flex items-center"
      >
        {/* Particle Background */}
        <div className="absolute inset-0 -z-100 ">
          <Particles
            particleColors={["#ffffff", "#ffffff"]}
            particleCount={200}
            particleSpread={10}
            speed={0.1}
            particleBaseSize={100}
            moveParticlesOnHover={true}
            alphaParticles={false}
            disableRotation={false}
          />

          {/* Gradient Overlay */}
          {/* <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/50 to-transparent" /> */}

          {/* افکت‌های قبلی */}
          {/* <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px]"
          />
          <motion.div
            animate={{
              x: [0, -70, 0],
              y: [0, 100, 0],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]"
          /> */}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 text-sm text-cyan-400 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              Over 500+ Books Available
            </div>

            {/* <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6"> */}

            {/* <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">
                <TypingEffect
                  words={["Algorithms", "AI & ML", "Web Dev", "Systems"]}
                   text={["Algorithms", "AI & ML", "Web Dev", "Systems"]}
                />
              </span> */}
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
              <span className="block text-slate-100">
                Hariwa CS Online Library
              </span>
              {/* <span className="block text-slate-100">Master CS with</span> */}
              <span className="inline-block min-w-[250px] ">
                <TextType
                  text={["Algorithms", "AI & ML", "Web Dev", "Systems"]}
                  as="span"
                  typingSpeed={100}
                  pauseDuration={1500}
                  loop={true}
                  showCursor={true}
                  cursorCharacter="_"
                  className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600"
                />
              </span>
            </h1>

            <p className="mt-6 text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              A curated library of essential computer science textbooks, cheat
              sheets, and references. Free for every student, forever.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/books"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all duration-300 hover:scale-105"
              >
                Browse Library
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                to="/admin"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-slate-300 bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-full hover:bg-slate-800/50 hover:text-white transition-all duration-300 hover:scale-105"
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

      {/* Categories Section */}
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
                About the Developer
              </h2>
              <p className="text-slate-400 mb-6 leading-relaxed">
                Hi, I'm a Computer Science student passionate about open
                education. I built this platform to help students access
                expensive textbooks for free. I believe knowledge should be
                accessible to everyone, regardless of financial status.
              </p>

              <h3 className="text-xl font-semibold text-white mb-4">
                Tech Stack Used
              </h3>
              <div className="flex flex-wrap gap-2 mb-8">
                {["React", "TypeScript", "Tailwind", "Supabase", "Vercel"].map(
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

              <h3 className="text-xl font-semibold text-white mb-4">
                Connect With Me
              </h3>
              <div className="flex gap-4">
                <a
                  href="https://github.com/sohailashraq"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-slate-800 rounded-full text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                  title="GitHub Profile"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://t.me/eng_software12"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-slate-800 rounded-full text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                  title="Telegram Channel"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.191c-.204 1.485-1.045 5.091-1.477 6.752-.198.764-.587 1.019-.964 1.043-.819.053-1.44-.541-2.234-1.062-1.23-.813-1.926-1.32-3.122-2.114-1.362-.896-.48-1.389.297-2.193.203-.212 3.765-3.452 3.84-3.746.008-.031.015-.147-.057-.209-.072-.062-.178-.041-.255-.024-.108.024-1.793 1.139-5.062 3.345-.478.327-.913.487-1.303.48-.428-.009-1.252-.242-1.865-.442-.751-.246-1.349-.375-1.297-.792.027-.216.324-.437.891-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.1-.002.321.023.465.14.114.094.146.223.16.312.015.09.033.297.018.458z" />
                  </svg>
                </a>
                <a
                  href="mailto:sohailashraq2002@gmail.com"
                  className="p-3 bg-slate-800 rounded-full text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                  title="Send Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur-xl opacity-20"></div>
              <div className="relative bg-slate-800 border border-slate-700 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-white mb-4">
                  Contact Admin
                </h3>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">
                      Your Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                      placeholder="student@university.edu"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500 transition-colors h-32"
                      placeholder="Suggest a book or ask a question..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={emailLoading}
                    className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-medium py-3 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {emailLoading ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5 mr-3 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending...
                      </>
                    ) : emailSent ? (
                      <>
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                        Message Sent Successfully!
                      </>
                    ) : (
                      "Send Message to Admin"
                    )}
                  </button>
                </form>

                {emailSent && (
                  <div className="mt-4 p-3 bg-green-900/30 border border-green-700 rounded-lg">
                    <p className="text-green-400 text-center text-sm">
                      ✓ Your message has been sent successfully! The admin will
                      contact you soon.
                    </p>
                  </div>
                )}

                <p className="text-slate-500 text-sm mt-4 text-center">
                  Admin Email: sohailashraq2002@gmail.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
