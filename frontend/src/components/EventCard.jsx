import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Trophy, Users, Activity } from 'lucide-react';

export default function EventCard({ logs }) {
  return (
    <div className="lg:col-span-5 flex justify-center items-center relative py-6">
      {/* Decorative background */}
      <div className="absolute w-72 h-72 rounded-full border border-purple-500/10 pointer-events-none flex items-center justify-center z-0">
        <div className="absolute w-[95%] h-[95%] rounded-full border border-dashed border-cyan-500/5 animate-[spin_60s_linear_infinite]" />
        <div className="absolute w-24 h-24 rounded-full bg-purple-500/5 blur-2xl" />
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        animate={{ y: [0, -12, 0] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="relative z-10 w-full max-w-sm glass-panel rounded-xl p-6 border border-slate-800/80 shadow-[0_0_50px_rgba(6,182,212,0.08)] box-neon-cyan overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-0.75 bg-linear-to-r from-cyan-500 via-blue-500 to-purple-500" />

        <div className="flex items-center justify-between mb-5">
          <span className="font-mono text-xs text-purple-400 tracking-widest font-semibold flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
            {">_ EVENT_MANIFEST"}
          </span>
          <span className="font-mono text-[9px] text-cyan-400 px-2 py-0.5 rounded bg-cyan-950/40 border border-cyan-500/20 shadow-[0_0_8px_rgba(6,182,212,0.2)]">
            v2.0.42
          </span>
        </div>

        <div className="space-y-4 font-mono text-sm border-b border-slate-900 pb-5 mb-5">
          {/* Date */}
          <div className="flex items-start gap-3.5 group">
            <div className="p-2 rounded bg-slate-900/60 border border-slate-800 group-hover:border-cyan-500/40 transition-colors">
              <Calendar className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider">Date</span>
              <span className="text-slate-200 font-semibold">JULY 18 - 20, 2026</span>
            </div>
          </div>

          {/* Venue */}
          <div className="flex items-start gap-3.5 group">
            <div className="p-2 rounded bg-slate-900/60 border border-slate-800 group-hover:border-cyan-500/40 transition-colors">
              <MapPin className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider">Venue</span>
              <span className="text-slate-200 font-semibold">VIRTUAL ARENA (ONLINE)</span>
            </div>
          </div>

          {/* Prize Pool */}
          <div className="flex items-start gap-3.5 group">
            <div className="p-2 rounded bg-slate-900/60 border border-slate-800 group-hover:border-purple-500/40 transition-colors">
              <Trophy className="w-4 h-4 text-purple-400" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider">Prize Pool</span>
              <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-fuchsia-400 font-bold">
                $25,000 USD + GEAR
              </span>
            </div>
          </div>

          {/* Status */}
          <div className="flex items-start gap-3.5 group">
            <div className="p-2 rounded bg-slate-900/60 border border-slate-800 group-hover:border-cyan-500/40 transition-colors">
              <Users className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider">Hacker Status</span>
              <span className="text-emerald-400 flex items-center gap-1.5 font-bold">
                OPEN & FREE
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              </span>
            </div>
          </div>
        </div>

        {/* Terminal Logs Widget */}
        <div className="rounded-lg bg-slate-950/80 border border-slate-900/80 p-3.5 text-left font-mono">
          <div className="flex items-center gap-1.5 border-b border-slate-900 pb-2 mb-2 text-[10px] text-slate-500">
            <div className="flex gap-1">
              <span className="w-2 h-2 rounded-full bg-red-500/60" />
              <span className="w-2 h-2 rounded-full bg-yellow-500/60" />
              <span className="w-2 h-2 rounded-full bg-green-500/60" />
            </div>
            <span className="ml-1 select-none">CODEWAR-COMPILER-STREAM</span>
          </div>
          <div className="h-28 overflow-hidden flex flex-col gap-1 text-[10px] leading-tight">
            <AnimatePresence initial={false}>
              {logs.map((log, index) => {
                let logColor = "text-slate-400";
                if (log.type === "system") logColor = "text-indigo-400";
                if (log.type === "success") logColor = "text-emerald-400";
                if (log.type === "error") logColor = "text-rose-400 font-semibold";
                if (log.type === "user") logColor = "text-cyan-300";
                if (log.type === "info") logColor = "text-amber-300";

                return (
                  <motion.div
                    key={log.text + index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`${logColor} truncate`}
                  >
                    {log.text}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}