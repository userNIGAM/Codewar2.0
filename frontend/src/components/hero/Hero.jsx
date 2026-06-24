import { memo } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, MapPin, Calendar } from "lucide-react";

function Hero({ onRegisterClick }) {
  return (
    <div className="relative flex flex-col items-center justify-center text-center w-full min-h-screen px-4 overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 w-150 h-150 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-100 h-100 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-950/20 text-cyan-400 text-xs sm:text-sm font-mono tracking-wider mb-8 backdrop-blur-sm shadow-[0_0_20px_rgba(6,182,212,0.15)]"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
        </span>
        COMPETITIVE PROGRAMMING EVENT
      </motion.div>

      {/* Main Title */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.1,
        }}
      >
        <h1
          className="
        text-5xl
        sm:text-6xl
        md:text-7xl
        lg:text-[6rem]
        xl:text-[8rem]
        font-black
        tracking-tight
        leading-none
        whitespace-nowrap
        text-transparent
        bg-clip-text
        bg-linear-to-r
        from-white
        via-cyan-400
        to-purple-500
  "
        >
          CODEWAR{" "}
          <span className="bg-linear-to-r from-purple-400 to-fuchsia-500 bg-clip-text text-transparent">
            2.0
          </span>
        </h1>

        {/* Decorative Divider */}
        <div className="flex items-center justify-center gap-3 my-8">
          <div className="w-20 md:w-32 h-px bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
          <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse" />
          <div className="w-20 md:w-32 h-px bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
        </div>
      </motion.div>

      {/* Location */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.2,
        }}
        className="flex items-center gap-2 text-slate-300 text-lg md:text-xl font-medium"
      >
        <MapPin className="w-5 h-5 text-cyan-400" />
        <span>Mechi Multiple Campus, Bhadrapur, Jhapa</span>
      </motion.div>

      {/* Date */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.3,
        }}
        className="flex items-center gap-2 mt-3 text-cyan-400 font-mono text-sm md:text-base tracking-[0.25em] uppercase"
      >
        <Calendar className="w-4 h-4" />
        <span>15 August 2026</span>
      </motion.div>

      {/* Tagline */}
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.4,
        }}
        className="mt-8 font-mono text-sm md:text-lg tracking-[0.35em] text-cyan-400 uppercase"
      >
        Code • Compete • Dominate
      </motion.h2>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
        }}
        className="mt-6 text-slate-400 text-lg md:text-xl max-w-3xl leading-relaxed"
      >
        Join the ultimate coding challenge and showcase your problem-solving
        skills against the brightest minds. Execute algorithms, debug under
        pressure, and climb the leaderboard.
      </motion.p>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.6,
        }}
        className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
      >
        <button
          onClick={onRegisterClick}
          className="relative overflow-hidden group px-8 py-4 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold font-mono tracking-wider transition-all duration-300 shadow-[0_0_30px_rgba(6,182,212,0.35)] hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] flex items-center justify-center gap-2"
        >
          <div className="absolute inset-0 w-[50%] h-full bg-linear-to-r from-transparent via-white/30 to-transparent skew-x-[-25deg] translate-x-[-150%] group-hover:translate-x-[250%] transition-transform duration-1000 ease-out" />
          REGISTER NOW
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>

        <button className="px-8 py-4 rounded-lg border border-slate-700 bg-slate-900/40 backdrop-blur-sm text-slate-300 hover:text-white hover:border-purple-500/50 transition-all duration-300 flex items-center gap-2">
          LEARN MORE
          <ChevronRight className="w-4 h-4" />
        </button>
      </motion.div>
    </div>
  );
}

export default memo(Hero);
