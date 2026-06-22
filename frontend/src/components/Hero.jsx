import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';

export default function Hero({ onRegisterClick }) {
  return (
    <div className="lg:col-span-7 flex flex-col items-start text-left">
      {/* System Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-cyan-500/30 bg-cyan-950/20 text-cyan-400 text-xs font-mono tracking-wider mb-6 backdrop-blur-sm shadow-[0_0_15px_rgba(6,182,212,0.15)]"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
        </span>
        <span>COMPETITIVE PROGRAMMING EVENT</span>
      </motion.div>

      {/* Main Title */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="relative"
      >
        <h1 className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tight leading-none mb-1 font-sans text-transparent bg-clip-text bg-linear-to-r from-white via-cyan-400 to-purple-500 drop-shadow-[0_0_40px_rgba(6,182,212,0.2)]">
          CODEWAR <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-fuchsia-500">2.0</span>
        </h1>
        <div className="flex items-center gap-1.5 mb-4 mt-2">
          <div className="w-12 h-0.5px bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <div className="w-32 h-px bg-slate-800" />
        </div>
      </motion.div>

      {/* Subtitle */}
      <motion.h2
        initial={{ opacity: 0, x: -25 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="font-mono text-sm md:text-base tracking-[0.3em] text-cyan-400 uppercase font-medium mb-5 text-neon-cyan"
      >
        Compete. Solve. Conquer.
      </motion.h2>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="text-slate-400 text-base md:text-lg max-w-xl leading-relaxed mb-8 font-sans"
      >
        Join the ultimate coding challenge and showcase your problem-solving skills against the brightest minds. Execute algorithms, debug under pressure, and climb the leaderboard.
      </motion.p>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
      >
        <button
          onClick={onRegisterClick}
          className="relative overflow-hidden group px-8 py-3.5 rounded bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold font-mono tracking-wider transition-all duration-300 text-sm shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:shadow-[0_0_35px_rgba(6,182,212,0.55)] cursor-pointer flex items-center justify-center gap-2 border border-cyan-300/30"
        >
          <div className="absolute inset-0 w-[50%] h-full bg-linear-to-r from-transparent via-white/30 to-transparent skew-x-[-25deg] translate-x-[-150%] group-hover:translate-x-[250%] transition-transform duration-1000 ease-out" />
          REGISTER NOW
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200" />
        </button>

        <button className="px-8 py-3.5 rounded glass-panel text-slate-300 hover:text-white font-bold font-mono tracking-wider transition-all duration-300 text-sm border border-slate-700/60 hover:border-purple-500/40 hover:shadow-[0_0_25px_rgba(168,85,247,0.2)] cursor-pointer flex items-center justify-center gap-2">
          LEARN MORE
          <ChevronRight className="w-4 h-4" />
        </button>
      </motion.div>
    </div>
  );
}