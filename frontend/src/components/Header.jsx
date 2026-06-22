import { Terminal, Shield } from 'lucide-react';

export default function Header({ onRegisterClick }) {
  return (
    <header className="relative z-10 w-full max-w-7xl mx-auto px-6 py-5 flex items-center justify-between border-b border-slate-900/50 backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <div className="relative flex items-center justify-center w-9 h-9 rounded-lg border border-cyan-500/40 bg-cyan-950/20 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
          <Terminal className="w-5 h-5 text-cyan-400" />
          <div className="absolute inset-0 rounded-lg bg-cyan-400/10 animate-ping opacity-20 pointer-events-none" />
        </div>
        <span className="font-mono font-bold text-lg tracking-wider text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-indigo-300">
          CODEWAR <span className="text-purple-400 font-extrabold">2.0</span>
        </span>
      </div>

      <nav className="hidden md:flex items-center gap-8 text-sm font-mono tracking-wide">
        {["RULES", "SCHEDULE", "PRIZES", "FAQ"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-slate-400 hover:text-cyan-400 transition-colors duration-200 flex items-center gap-1.5 group"
          >
            <span className="text-cyan-500/40 font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-200">/</span>
            {item}
          </a>
        ))}
      </nav>

      <div>
        <button
          onClick={onRegisterClick}
          className="px-4 py-1.5 rounded border border-purple-500/40 bg-purple-950/15 text-purple-300 font-mono text-xs hover:bg-purple-500/20 hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(168,85,247,0.1)] hover:shadow-[0_0_20px_rgba(168,85,247,0.25)] flex items-center gap-1.5"
        >
          <Shield className="w-3.5 h-3.5" />
          SECURE PORTAL
        </button>
      </div>
    </header>
  );
}