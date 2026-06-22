import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

export default function CountdownTimer({ timeLeft }) {
  return (
    <section className="mt-16 lg:mt-24 w-full flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="flex items-center gap-3.5 mb-6 text-sm font-mono tracking-widest text-slate-500 uppercase"
      >
        <Clock className="w-4 h-4 text-cyan-400 animate-pulse" />
        <span>SANDBOX INJECT QUEUE CLOSES IN</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="grid grid-cols-4 gap-3 sm:gap-6 w-full max-w-lg md:max-w-2xl font-mono"
      >
        {[
          { label: "DAYS", value: timeLeft.days },
          { label: "HOURS", value: timeLeft.hours },
          { label: "MINUTES", value: timeLeft.minutes },
          { label: "SECONDS", value: timeLeft.seconds }
        ].map((block) => (
          <div
            key={block.label}
            className="relative glass-panel border border-slate-900 rounded-lg p-3 sm:p-5 flex flex-col items-center justify-center box-neon-cyan hover:border-cyan-500/20 transition-all duration-300 overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-cyan-500/40" />
            <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-cyan-500/40" />
            <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-cyan-500/40" />
            <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-cyan-500/40" />
            <div className="absolute inset-x-0 bottom-0 h-[1.5px] bg-linear-to-r from-transparent via-cyan-500/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

            <span className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-linear-to-b from-white to-slate-200 tracking-tight text-neon-cyan select-all">
              {String(block.value).padStart(2, "0")}
            </span>
            <span className="text-[9px] sm:text-[10px] text-slate-500 uppercase tracking-widest mt-1.5 font-semibold">
              {block.label}
            </span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}