import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Terminal, X, ArrowRight, Code2, Cpu, Check, Download
} from 'lucide-react';
import { generateTicket } from '../utils';

export default function RegistrationModal({ isOpen, onClose }) {
  const [regStep, setRegStep] = useState(1);
  const [hackerName, setHackerName] = useState("");
  const [selectedLang, setSelectedLang] = useState("");
  const [compileProgress, setCompileProgress] = useState(0);
  const [ticketId, setTicketId] = useState("");
  const modalInputRef = useRef(null);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setRegStep(1);
      setHackerName("");
      setSelectedLang("");
      setCompileProgress(0);
      setTicketId("");
    }
  }, [isOpen]);

  // Auto-focus input on step 1
  useEffect(() => {
    if (isOpen && regStep === 1 && modalInputRef.current) {
      modalInputRef.current.focus();
    }
  }, [isOpen, regStep]);

  // Compilation progress effect
  useEffect(() => {
    if (regStep === 3) {
      const interval = setInterval(() => {
        setCompileProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTicketId(generateTicket());
            setTimeout(() => setRegStep(4), 500);
            return 100;
          }
          return prev + Math.floor(Math.random() * 15 + 5);
        });
      }, 150);
      return () => clearInterval(interval);
    }
  }, [regStep]);

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (hackerName.trim().length >= 3) {
      setRegStep(2);
    }
  };

  const selectLanguage = (lang) => {
    setSelectedLang(lang);
    setRegStep(3);
    setCompileProgress(0);
  };

  const closeModal = () => {
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            className="relative w-full max-w-lg rounded-lg border border-slate-800 bg-slate-950 p-6 shadow-[0_0_50px_rgba(6,182,212,0.2)] font-mono z-10 box-neon-cyan text-left"
          >
            <div className="absolute top-0 left-0 w-full h-0.5 bg-linear-to-r from-cyan-400 via-blue-500 to-purple-500" />

            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-1 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition-all"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 text-cyan-400 text-xs tracking-wider border-b border-slate-900 pb-3.5 mb-5 select-none">
              <Terminal className="w-4 h-4" />
              <span>TERMINAL_SESSION: REGISTER_CODEWAR_2.0</span>
            </div>

            {/* Step 1: Username */}
            {regStep === 1 && (
              <form onSubmit={handleNameSubmit} className="space-y-4">
                <div className="text-slate-300 text-xs leading-relaxed space-y-1 select-none">
                  <p className="text-purple-400 font-bold">{">_ SYSTEM: INITIALIZING REGISTER PROTOCOL..."}</p>
                  <p>Enter your unique handle/username to secure your compiling port.</p>
                </div>

                <div className="relative mt-4">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400 font-semibold select-none font-mono">
                    {">_ "}
                  </span>
                  <input
                    ref={modalInputRef}
                    type="text"
                    maxLength={18}
                    placeholder="HACKER_HANDLE"
                    value={hackerName}
                    onChange={(e) => setHackerName(e.target.value.replace(/[^a-zA-Z0-9_-]/g, ''))}
                    className="w-full pl-9 pr-4 py-3 rounded bg-slate-900 border border-slate-800 focus:border-cyan-500 focus:outline-none text-cyan-300 font-semibold placeholder-slate-700 font-mono tracking-widest text-sm focus:ring-1 focus:ring-cyan-500/20"
                  />
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-[10px] text-slate-500 font-mono select-none">
                    Acceptable: A-Z, 0-9, _, - (min 3 chars)
                  </span>
                  <button
                    type="submit"
                    disabled={hackerName.trim().length < 3}
                    className="px-5 py-2 rounded bg-cyan-500 disabled:bg-slate-800 disabled:border-slate-700 disabled:text-slate-600 border border-cyan-400/20 text-slate-950 font-bold hover:bg-cyan-400 transition-all font-mono text-xs flex items-center gap-1.5 shadow-[0_0_15px_rgba(6,182,212,0.15)] disabled:shadow-none cursor-pointer"
                  >
                    CONTINUE
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}

            {/* Step 2: Language */}
            {regStep === 2 && (
              <div className="space-y-4">
                <div className="text-slate-300 text-xs leading-relaxed space-y-1 select-none">
                  <p className="text-cyan-400 font-semibold">{`>_ IDENTIFIED: ${hackerName.toUpperCase()}`}</p>
                  <p className="text-purple-400 font-bold">{`>_ ACTION: SELECT PRIMARY CODING CORE`}</p>
                  <p>Select your default environment. This can be customized during the arena events.</p>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-4">
                  {[
                    { lang: "C++", logo: "GNU C++20", color: "hover:border-blue-500 hover:text-blue-400" },
                    { lang: "Python", logo: "CPython 3.11", color: "hover:border-yellow-500 hover:text-yellow-400" },
                    { lang: "Rust", logo: "rustc 1.76", color: "hover:border-amber-600 hover:text-amber-400" },
                    { lang: "Java", logo: "OpenJDK 21", color: "hover:border-red-500 hover:text-red-400" }
                  ].map((env) => (
                    <button
                      key={env.lang}
                      onClick={() => selectLanguage(env.lang)}
                      className={`p-3 text-left rounded bg-slate-900 border border-slate-800/80 transition-all duration-200 cursor-pointer ${env.color} group`}
                    >
                      <div className="font-bold text-sm flex items-center justify-between">
                        <span>{env.lang}</span>
                        <Code2 className="w-4 h-4 opacity-40 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono mt-0.5 select-none">{env.logo}</div>
                    </button>
                  ))}
                </div>

                <div className="pt-2 flex">
                  <button
                    onClick={() => setRegStep(1)}
                    className="px-4 py-1.5 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-400 text-xs font-mono"
                  >
                    {`<- BACK`}
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Compiling */}
            {regStep === 3 && (
              <div className="space-y-4 py-3 select-none">
                <div className="text-xs space-y-1.5 font-mono">
                  <div className="flex items-center gap-1.5 text-yellow-400">
                    <Cpu className="w-4 h-4 animate-spin" />
                    <span>{`>_ RUNNING COMPILER: BINDING_PORTS...`}</span>
                  </div>
                  <p className="text-slate-400">{`Hacker: ${hackerName}`}</p>
                  <p className="text-slate-400">{`Core Environment: ${selectedLang}`}</p>
                </div>

                <div className="w-full bg-slate-900 rounded-full h-3 border border-slate-800 overflow-hidden mt-4 relative">
                  <motion.div
                    className="h-full bg-linear-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full"
                    style={{ width: `${compileProgress}%` }}
                  />
                </div>

                <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono">
                  <span>{`Injected Packets: ${Math.floor(compileProgress * 8)} / 800`}</span>
                  <span className="font-bold text-cyan-400">{compileProgress}%</span>
                </div>
              </div>
            )}

            {/* Step 4: Success Ticket */}
            {regStep === 4 && (
              <div className="space-y-6">
                <div className="text-center space-y-1.5">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-emerald-950/30 border border-emerald-500/40 text-emerald-400 mb-2 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                    <Check className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-extrabold text-emerald-400 tracking-wider">
                    REGISTRATION SUCCESSFUL
                  </h3>
                  <p className="text-slate-400 text-xs">
                    Your compiling port has been successfully secured.
                  </p>
                </div>

                {/* Ticket */}
                <div className="relative rounded bg-slate-900 border border-slate-800 p-4 shadow-[0_0_20px_rgba(6,182,212,0.05)] overflow-hidden">
                  <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-cyan-400" />
                  <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-cyan-400" />
                  <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-cyan-400" />
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-cyan-400" />

                  <div className="flex justify-between items-start border-b border-slate-800 pb-3 mb-3">
                    <div>
                      <span className="text-[10px] text-slate-500 block">EVENT PASS</span>
                      <span className="text-xs text-white font-bold tracking-wider">CODEWAR 2.0</span>
                    </div>
                    <span className="text-xs text-cyan-400 font-bold bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-500/20">
                      {ticketId}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-y-3 gap-x-1 text-xs">
                    <div>
                      <span className="text-[9px] text-slate-500 block uppercase">Hacker Name</span>
                      <span className="text-slate-200 font-bold truncate max-w-37.5 inline-block">
                        {hackerName}
                      </span>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-500 block uppercase">Default Env</span>
                      <span className="text-slate-200 font-bold flex items-center gap-1">
                        <Code2 className="w-3.5 h-3.5 text-purple-400" />
                        {selectedLang}
                      </span>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-500 block uppercase">Pass Status</span>
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                        VERIFIED
                      </span>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-500 block uppercase">Event Type</span>
                      <span className="text-slate-200 font-bold">ONLINE ARENA</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-col items-center justify-center">
                    <div className="flex items-center gap-0.5 h-7 opacity-75">
                      {[1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 4, 1, 2, 1, 3, 2, 1, 4, 1, 2, 3, 1, 4, 2].map((w, i) => (
                        <div
                          key={i}
                          className="bg-slate-400 h-full"
                          style={{ width: `${w}px` }}
                        />
                      ))}
                    </div>
                    <span className="text-[8px] text-slate-600 mt-1 select-none">
                      SYSTEM INTEGRITY VERIFIED // AUTH_HASH_CW2026
                    </span>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={closeModal}
                    className="flex-1 py-2.5 rounded bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    CLOSE SESSION
                  </button>
                  <button
                    onClick={() => alert(`Ticket ${ticketId} saved to memory cache.`)}
                    className="flex-1 py-2.5 rounded bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(6,182,212,0.15)] cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    SAVE TICKET
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}