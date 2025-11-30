import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-slate-500 text-sm">
          © {new Date().getFullYear()} CSLib. Open Source Education.
        </p>
        <div className="flex gap-6 text-sm text-slate-400">
           <a href="#" className="hover:text-cyan-400 transition-colors">Privacy Policy</a>
           <a href="#" className="hover:text-cyan-400 transition-colors">Terms of Use</a>
           <a href="#" className="hover:text-cyan-400 transition-colors">DMCA</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;