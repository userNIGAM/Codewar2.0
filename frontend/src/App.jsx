// import React, { useState, useEffect, useRef } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   Terminal, 
//   Calendar, 
//   MapPin, 
//   Trophy, 
//   Users, 
//   Cpu, 
//   Clock, 
//   ArrowRight, 
//   ChevronRight, 
//   Sparkles, 
//   Code2, 
//   Activity,
//   Shield,
//   Laptop,
//   Check,
//   X,
//   Lock,
//   Download,
//   AlertCircle
// } from 'lucide-react';
// import './App.css';

// // Floating code snippets for futuristic matrix/cyberpunk background
// const floatingCodeSnippets = [
//   "int main() { return 0; }",
//   "const solve = (n) => n <= 1 ? 1 : solve(n-1) + solve(n-2);",
//   "def dijkstra(graph, start):",
//   "import { useState, useEffect } from 'react';",
//   "while queue: curr = queue.pop(0)",
//   "std::vector<int> dp(n, -1);",
//   "fn merge_sort<T: Ord>(arr: &mut [T])",
//   "for i in range(1, N):",
//   "if (check(mid)) ans = mid; else l = mid + 1;",
//   "public static void main(String[] args)",
//   "template <typename T> class SegmentTree",
//   "q.push({dist[v], v});"
// ];

// // Glowing background particle coordinates & sizes
// const backgroundParticles = Array.from({ length: 18 }, (_, i) => ({
//   id: i,
//   size: Math.random() * 5 + 2,
//   left: Math.random() * 100,
//   top: Math.random() * 100,
//   duration: Math.random() * 15 + 10,
//   delay: Math.random() * 5
// }));

// function App() {
//   // --- Target Date for Live Countdown (set 14 days, 6 hours, 24 mins, 30 secs from load time) ---
//   const [targetDate] = useState(() => {
//     const target = new Date();
//     target.setDate(target.getDate() + 14);
//     target.setHours(target.getHours() + 6);
//     target.setMinutes(target.getMinutes() + 24);
//     target.setSeconds(target.getSeconds() + 30);
//     return target;
//   });

//   const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

//   function calculateTimeLeft() {
//     const difference = +targetDate - +new Date();
//     let left = { days: 0, hours: 0, minutes: 0, seconds: 0 };
//     if (difference > 0) {
//       left = {
//         days: Math.floor(difference / (1000 * 60 * 60 * 24)),
//         hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
//         minutes: Math.floor((difference / 1000 / 60) % 60),
//         seconds: Math.floor((difference / 1000) % 60),
//       };
//     }
//     return left;
//   }

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeLeft(calculateTimeLeft());
//     }, 1000);
//     return () => clearInterval(timer);
//   }, [targetDate]);

//   // --- Real-time Scrolling Compiler Logs inside Card ---
//   const [logs, setLogs] = useState([
//     { text: ">_ Initializing sandbox environment...", type: "system" },
//     { text: ">_ Connecting to CodeWar Compiler Hub...", type: "system" },
//     { text: ">_ Problem A: 'Optimized Pathing' - Loaded 120 test cases", type: "info" },
//     { text: ">_ Running compiler test suite... OK", type: "success" },
//     { text: ">_ user_x86 submitted Solution.cpp [Problem B] - compiling...", type: "user" }
//   ]);

//   useEffect(() => {
//     const sampleLogs = [
//       { text: ">_ user_neophyte submitted solution.py - COMPILING", type: "user" },
//       { text: ">_ Test case #24/50: PASSED (18ms)", type: "success" },
//       { text: ">_ Test case #50/50: PASSED (12ms)", type: "success" },
//       { text: ">_ Problem A solved by user_neophyte [100 pts]", type: "success" },
//       { text: ">_ user_rustacean submitted main.rs - COMPILING", type: "user" },
//       { text: ">_ Compiler error: unused variable 'result' (warning: treated as error)", type: "error" },
//       { text: ">_ user_lambda submitted solution.cpp - COMPILING", type: "user" },
//       { text: ">_ Test case #12/80: Time Limit Exceeded (TLE > 2000ms)", type: "error" },
//       { text: ">_ user_dev_null submitted Solution.java - COMPILING", type: "user" },
//       { text: ">_ Test case #100/100: PASSED (42ms)", type: "success" },
//       { text: ">_ Problem C solved by user_dev_null [150 pts]", type: "success" },
//       { text: ">_ Active sandbox instances: 342 | Queue size: 1", type: "system" }
//     ];

//     const interval = setInterval(() => {
//       setLogs((prev) => {
//         const next = sampleLogs[Math.floor(Math.random() * sampleLogs.length)];
//         return [...prev.slice(1), next];
//       });
//     }, 2800);

//     return () => clearInterval(interval);
//   }, []);

//   // --- Interactive Terminal Registration Flow ---
//   const [isRegModalOpen, setIsRegModalOpen] = useState(false);
//   const [regStep, setRegStep] = useState(1); // 1: Username, 2: Language, 3: Compiling, 4: Success Ticket
//   const [hackerName, setHackerName] = useState("");
//   const [selectedLang, setSelectedLang] = useState("");
//   const [compileProgress, setCompileProgress] = useState(0);
//   const [ticketId, setTicketId] = useState("");
//   const modalInputRef = useRef(null);

//   // Generate a random ticket ID once registered
//   const generateTicket = () => {
//     const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
//     let code = "CW-";
//     for (let i = 0; i < 8; i++) {
//       code += chars.charAt(Math.floor(Math.random() * chars.length));
//     }
//     setTicketId(code);
//   };

//   // Keyboard navigation inside registration terminal
//   const handleNameSubmit = (e) => {
//     e.preventDefault();
//     if (hackerName.trim().length >= 3) {
//       setRegStep(2);
//     }
//   };

//   const selectLanguage = (lang) => {
//     setSelectedLang(lang);
//     setRegStep(3);
//     setCompileProgress(0);
//   };

//   // Compile loading effect
//   useEffect(() => {
//     if (regStep === 3) {
//       const interval = setInterval(() => {
//         setCompileProgress((prev) => {
//           if (prev >= 100) {
//             clearInterval(interval);
//             generateTicket();
//             setTimeout(() => {
//               setRegStep(4);
//             }, 500);
//             return 100;
//           }
//           return prev + Math.floor(Math.random() * 15 + 5);
//         });
//       }, 150);
//       return () => clearInterval(interval);
//     }
//   }, [regStep]);

//   // Focus modal input on step 1
//   useEffect(() => {
//     if (isRegModalOpen && regStep === 1 && modalInputRef.current) {
//       modalInputRef.current.focus();
//     }
//   }, [isRegModalOpen, regStep]);

//   // Reset modal state
//   const closeRegModal = () => {
//     setIsRegModalOpen(false);
//     setRegStep(1);
//     setHackerName("");
//     setSelectedLang("");
//     setCompileProgress(0);
//     setTicketId("");
//   };

//   return (
//     <div className="relative min-h-screen w-full bg-slate-950 text-slate-100 overflow-x-hidden flex flex-col font-sans select-none selection:bg-cyan-500/30 selection:text-cyan-200">
      
//       {/* ================= BACKGROUND GRAPHICS ================= */}
//       {/* Animated Matrix Grid */}
//       <div className="absolute inset-0 bg-[linear-gradient(to_right,#080e1b_1px,transparent_1px),linear-gradient(to_bottom,#080e1b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-80 pointer-events-none z-0 animate-grid-drift" />

//       {/* Cybernetic Neon Background Glows */}
//       <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-900/10 blur-[120px] pointer-events-none z-0" />
//       <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-900/15 blur-[120px] pointer-events-none z-0" />
//       <div className="absolute top-[30%] right-[10%] w-[35%] h-[35%] rounded-full bg-blue-900/10 blur-[100px] pointer-events-none z-0" />

//       {/* Animated Horizontal Scan Line */}
//       <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent pointer-events-none z-0 animate-scan" />

//       {/* Floating Particle Spheres */}
//       {backgroundParticles.map((p) => (
//         <motion.div
//           key={p.id}
//           className="absolute rounded-full bg-cyan-500/10 blur-[1px] pointer-events-none z-0"
//           style={{
//             width: p.size,
//             height: p.size,
//             left: `${p.left}%`,
//             top: `${p.top}%`,
//           }}
//           animate={{
//             y: [0, -120, 0],
//             x: [0, Math.random() * 40 - 20, 0],
//             opacity: [0.1, 0.4, 0.1]
//           }}
//           transition={{
//             duration: p.duration,
//             repeat: Infinity,
//             ease: "easeInOut",
//             delay: p.delay
//           }}
//         />
//       ))}

//       {/* Floating Background Code Snippets */}
//       {floatingCodeSnippets.map((snippet, idx) => (
//         <motion.div
//           key={idx}
//           className="absolute hidden lg:block font-mono text-[11px] text-cyan-400/5 select-none pointer-events-none z-0"
//           style={{
//             top: `${(idx * 7) % 80 + 10}%`,
//             left: `${(idx * 13) % 80 + 10}%`,
//           }}
//           animate={{
//             y: [0, -20, 0],
//             opacity: [0.03, 0.08, 0.03]
//           }}
//           transition={{
//             duration: 8 + (idx % 3) * 2,
//             repeat: Infinity,
//             ease: "easeInOut",
//             delay: idx * 0.4
//           }}
//         >
//           {snippet}
//         </motion.div>
//       ))}

//       {/* ================= HEADER NAVBAR ================= */}
//       <header className="relative z-10 w-full max-w-7xl mx-auto px-6 py-5 flex items-center justify-between border-b border-slate-900/50 backdrop-blur-sm">
//         <div className="flex items-center gap-2">
//           <div className="relative flex items-center justify-center w-9 h-9 rounded-lg border border-cyan-500/40 bg-cyan-950/20 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
//             <Terminal className="w-5 h-5 text-cyan-400" />
//             <div className="absolute inset-0 rounded-lg bg-cyan-400/10 animate-ping opacity-20 pointer-events-none" />
//           </div>
//           <span className="font-mono font-bold text-lg tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-300">
//             CODEWAR <span className="text-purple-400 font-extrabold">2.0</span>
//           </span>
//         </div>

//         <nav className="hidden md:flex items-center gap-8 text-sm font-mono tracking-wide">
//           {["RULES", "SCHEDULE", "PRIZES", "FAQ"].map((item) => (
//             <a 
//               key={item} 
//               href={`#${item.toLowerCase()}`}
//               className="text-slate-400 hover:text-cyan-400 transition-colors duration-200 flex items-center gap-1.5 group"
//             >
//               <span className="text-cyan-500/40 font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-200">/</span>
//               {item}
//             </a>
//           ))}
//         </nav>

//         <div>
//           <button 
//             onClick={() => setIsRegModalOpen(true)}
//             className="px-4 py-1.5 rounded border border-purple-500/40 bg-purple-950/15 text-purple-300 font-mono text-xs hover:bg-purple-500/20 hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(168,85,247,0.1)] hover:shadow-[0_0_20px_rgba(168,85,247,0.25)] flex items-center gap-1.5"
//           >
//             <Shield className="w-3.5 h-3.5" />
//             SECURE PORTAL
//           </button>
//         </div>
//       </header>

//       {/* ================= HERO SECTION CONTENT ================= */}
//       <main className="relative z-10 flex-grow w-full max-w-7xl mx-auto px-6 flex flex-col justify-center py-8 lg:py-16">
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
//           {/* ----- LEFT COLUMN: BADGES & HEADLINES ----- */}
//           <div className="lg:col-span-7 flex flex-col items-start text-left">
//             {/* System Badge */}
//             <motion.div
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-cyan-500/30 bg-cyan-950/20 text-cyan-400 text-xs font-mono tracking-wider mb-6 backdrop-blur-sm shadow-[0_0_15px_rgba(6,182,212,0.15)]"
//             >
//               <span className="relative flex h-2 w-2">
//                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
//                 <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
//               </span>
//               <span>COMPETITIVE PROGRAMMING EVENT</span>
//             </motion.div>

//             {/* Main Title - Codewar 2.0 */}
//             <motion.div
//               initial={{ opacity: 0, x: -30 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.8, delay: 0.1 }}
//               className="relative"
//             >
//               <h1 className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tight leading-none mb-1 font-sans text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-400 to-purple-500 drop-shadow-[0_0_40px_rgba(6,182,212,0.2)]">
//                 CODEWAR <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-500">2.0</span>
//               </h1>
              
//               {/* Futuristic title underline graphic */}
//               <div className="flex items-center gap-1.5 mb-4 mt-2">
//                 <div className="w-12 h-[2px] bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
//                 <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
//                 <div className="w-32 h-[1px] bg-slate-800" />
//               </div>
//             </motion.div>

//             {/* Subtitle / Catchphrase */}
//             <motion.h2
//               initial={{ opacity: 0, x: -25 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.8, delay: 0.2 }}
//               className="font-mono text-sm md:text-base tracking-[0.3em] text-cyan-400 uppercase font-medium mb-5 text-neon-cyan"
//             >
//               Compete. Solve. Conquer.
//             </motion.h2>

//             {/* Event Description */}
//             <motion.p
//               initial={{ opacity: 0, y: 15 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 0.3 }}
//               className="text-slate-400 text-base md:text-lg max-w-xl leading-relaxed mb-8 font-sans"
//             >
//               Join the ultimate coding challenge and showcase your problem-solving skills against the brightest minds. Execute algorithms, debug under pressure, and climb the leaderboard.
//             </motion.p>

//             {/* CTA Buttons */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 0.4 }}
//               className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
//             >
//               {/* Register Now CTA */}
//               <button 
//                 onClick={() => setIsRegModalOpen(true)}
//                 className="relative overflow-hidden group px-8 py-3.5 rounded bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold font-mono tracking-wider transition-all duration-300 text-sm shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:shadow-[0_0_35px_rgba(6,182,212,0.55)] cursor-pointer flex items-center justify-center gap-2 border border-cyan-300/30"
//               >
//                 {/* Button light sweep animation */}
//                 <div className="absolute inset-0 w-[50%] h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-25deg] translate-x-[-150%] group-hover:translate-x-[250%] transition-transform duration-1000 ease-out" />
//                 REGISTER NOW
//                 <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200" />
//               </button>

//               {/* Learn More CTA */}
//               <button className="px-8 py-3.5 rounded glass-panel text-slate-300 hover:text-white font-bold font-mono tracking-wider transition-all duration-300 text-sm border border-slate-700/60 hover:border-purple-500/40 hover:shadow-[0_0_25px_rgba(168,85,247,0.2)] cursor-pointer flex items-center justify-center gap-2">
//                 LEARN MORE
//                 <ChevronRight className="w-4 h-4" />
//               </button>
//             </motion.div>
//           </div>

//           {/* ----- RIGHT COLUMN: FLOATING EVENT CARD ----- */}
//           <div className="lg:col-span-5 flex justify-center items-center relative py-6">
            
//             {/* Decorative background radar circle behind the card */}
//             <div className="absolute w-72 h-72 rounded-full border border-purple-500/10 pointer-events-none flex items-center justify-center z-0">
//               <div className="absolute w-[95%] h-[95%] rounded-full border border-dashed border-cyan-500/5 animate-[spin_60s_linear_infinite]" />
//               <div className="absolute w-24 h-24 rounded-full bg-purple-500/5 blur-2xl" />
//             </div>

//             {/* Floating Event Manifest Card */}
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 1, delay: 0.2 }}
//               style={{ y: 0 }}
//               // Delicate floating visual movement
//               animate={{ y: [0, -12, 0] }}
//               transition={{
//                 duration: 5,
//                 repeat: Infinity,
//                 ease: "easeInOut"
//               }}
//               className="relative z-10 w-full max-w-sm glass-panel rounded-xl p-6 border border-slate-800/80 shadow-[0_0_50px_rgba(6,182,212,0.08)] box-neon-cyan overflow-hidden"
//             >
//               {/* Glowing header line */}
//               <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500" />

//               {/* Card Title */}
//               <div className="flex items-center justify-between mb-5">
//                 <span className="font-mono text-xs text-purple-400 tracking-widest font-semibold flex items-center gap-1.5">
//                   <Activity className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
//                   {">_ EVENT_MANIFEST"}
//                 </span>
//                 <span className="font-mono text-[9px] text-cyan-400 px-2 py-0.5 rounded bg-cyan-950/40 border border-cyan-500/20 shadow-[0_0_8px_rgba(6,182,212,0.2)]">
//                   v2.0.42
//                 </span>
//               </div>

//               {/* Event Details List */}
//               <div className="space-y-4 font-mono text-sm border-b border-slate-900 pb-5 mb-5">
//                 {/* Date Row */}
//                 <div className="flex items-start gap-3.5 group">
//                   <div className="p-2 rounded bg-slate-900/60 border border-slate-800 group-hover:border-cyan-500/40 transition-colors">
//                     <Calendar className="w-4 h-4 text-cyan-400" />
//                   </div>
//                   <div className="flex flex-col text-left">
//                     <span className="text-[10px] text-slate-500 uppercase tracking-wider">Date</span>
//                     <span className="text-slate-200 font-semibold">JULY 18 - 20, 2026</span>
//                   </div>
//                 </div>

//                 {/* Venue Row */}
//                 <div className="flex items-start gap-3.5 group">
//                   <div className="p-2 rounded bg-slate-900/60 border border-slate-800 group-hover:border-cyan-500/40 transition-colors">
//                     <MapPin className="w-4 h-4 text-cyan-400" />
//                   </div>
//                   <div className="flex flex-col text-left">
//                     <span className="text-[10px] text-slate-500 uppercase tracking-wider">Venue</span>
//                     <span className="text-slate-200 font-semibold">VIRTUAL ARENA (ONLINE)</span>
//                   </div>
//                 </div>

//                 {/* Prize Pool Row */}
//                 <div className="flex items-start gap-3.5 group">
//                   <div className="p-2 rounded bg-slate-900/60 border border-slate-800 group-hover:border-purple-500/40 transition-colors">
//                     <Trophy className="w-4 h-4 text-purple-400" />
//                   </div>
//                   <div className="flex flex-col text-left">
//                     <span className="text-[10px] text-slate-500 uppercase tracking-wider">Prize Pool</span>
//                     <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400 font-bold">
//                       $25,000 USD + GEAR
//                     </span>
//                   </div>
//                 </div>

//                 {/* Registration Status Row */}
//                 <div className="flex items-start gap-3.5 group">
//                   <div className="p-2 rounded bg-slate-900/60 border border-slate-800 group-hover:border-cyan-500/40 transition-colors">
//                     <Users className="w-4 h-4 text-cyan-400" />
//                   </div>
//                   <div className="flex flex-col text-left">
//                     <span className="text-[10px] text-slate-500 uppercase tracking-wider">Hacker Status</span>
//                     <span className="text-emerald-400 flex items-center gap-1.5 font-bold">
//                       OPEN & FREE
//                       <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               {/* Scrolling Terminal Compiler Log Widget inside the Card */}
//               <div className="rounded-lg bg-slate-950/80 border border-slate-900/80 p-3.5 text-left font-mono">
//                 <div className="flex items-center gap-1.5 border-b border-slate-900 pb-2 mb-2 text-[10px] text-slate-500">
//                   <div className="flex gap-1">
//                     <span className="w-2 h-2 rounded-full bg-red-500/60" />
//                     <span className="w-2 h-2 rounded-full bg-yellow-500/60" />
//                     <span className="w-2 h-2 rounded-full bg-green-500/60" />
//                   </div>
//                   <span className="ml-1 select-none">CODEWAR-COMPILER-STREAM</span>
//                 </div>
//                 <div className="h-28 overflow-hidden flex flex-col gap-1 text-[10px] leading-tight">
//                   <AnimatePresence initial={false}>
//                     {logs.map((log, index) => {
//                       let logColor = "text-slate-400";
//                       if (log.type === "system") logColor = "text-indigo-400";
//                       if (log.type === "success") logColor = "text-emerald-400";
//                       if (log.type === "error") logColor = "text-rose-400 font-semibold";
//                       if (log.type === "user") logColor = "text-cyan-300";
//                       if (log.type === "info") logColor = "text-amber-300";

//                       return (
//                         <motion.div
//                           key={log.text + index}
//                           initial={{ opacity: 0, y: 10 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           exit={{ opacity: 0 }}
//                           transition={{ duration: 0.3 }}
//                           className={`${logColor} truncate`}
//                         >
//                           {log.text}
//                         </motion.div>
//                       );
//                     })}
//                   </AnimatePresence>
//                 </div>
//               </div>
//             </motion.div>
//           </div>

//         </div>

//         {/* ================= COUNTDOWN TIMER SECTION ================= */}
//         <section className="mt-16 lg:mt-24 w-full flex flex-col items-center">
//           <motion.div 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.5 }}
//             className="flex items-center gap-3.5 mb-6 text-sm font-mono tracking-widest text-slate-500 uppercase"
//           >
//             <Clock className="w-4 h-4 text-cyan-400 animate-pulse" />
//             <span>SANDBOX INJECT QUEUE CLOSES IN</span>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.8, delay: 0.6 }}
//             className="grid grid-cols-4 gap-3 sm:gap-6 w-full max-w-lg md:max-w-2xl font-mono"
//           >
//             {/* Timer Block Component */}
//             {[
//               { label: "DAYS", value: timeLeft.days },
//               { label: "HOURS", value: timeLeft.hours },
//               { label: "MINUTES", value: timeLeft.minutes },
//               { label: "SECONDS", value: timeLeft.seconds }
//             ].map((block, idx) => (
//               <div 
//                 key={block.label} 
//                 className="relative glass-panel border border-slate-900 rounded-lg p-3 sm:p-5 flex flex-col items-center justify-center box-neon-cyan hover:border-cyan-500/20 transition-all duration-300 overflow-hidden group"
//               >
//                 {/* Tech styling ticks */}
//                 <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-cyan-500/40" />
//                 <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-cyan-500/40" />
//                 <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-cyan-500/40" />
//                 <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-cyan-500/40" />

//                 {/* Subtly animated decorative line */}
//                 <div className="absolute inset-x-0 bottom-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

//                 <span className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-200 tracking-tight text-neon-cyan select-all">
//                   {String(block.value).padStart(2, "0")}
//                 </span>
                
//                 <span className="text-[9px] sm:text-[10px] text-slate-500 uppercase tracking-widest mt-1.5 font-semibold">
//                   {block.label}
//                 </span>
//               </div>
//             ))}
//           </motion.div>
//         </section>

//       </main>

//       {/* ================= FOOTER ================= */}
//       <footer className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 border-t border-slate-900/60 mt-16 text-center text-xs font-mono text-slate-600 flex flex-col sm:flex-row justify-between items-center gap-4">
//         <div>
//           <span>© 2026 CODEWAR ARENA. ALL SYSTEMS OPERATIONAL.</span>
//         </div>
//         <div className="flex gap-6">
//           <a href="#privacy" className="hover:text-cyan-500 transition-colors">PRIVACY_POLICY</a>
//           <a href="#terms" className="hover:text-cyan-500 transition-colors">SECURITY_MANIFEST</a>
//         </div>
//       </footer>

//       {/* ================= REGISTRATION TERMINAL MODAL ================= */}
//       <AnimatePresence>
//         {isRegModalOpen && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
//             {/* Modal Backdrop overlay */}
//             <motion.div 
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={closeRegModal}
//               className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
//             />

//             {/* Modal Terminal Box */}
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0, y: 30 }}
//               animate={{ scale: 1, opacity: 1, y: 0 }}
//               exit={{ scale: 0.9, opacity: 0, y: 30 }}
//               className="relative w-full max-w-lg rounded-lg border border-slate-800 bg-slate-950 p-6 shadow-[0_0_50px_rgba(6,182,212,0.2)] font-mono z-10 box-neon-cyan text-left"
//             >
//               {/* Glowing header bar */}
//               <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500" />
              
//               {/* Close Button */}
//               <button 
//                 onClick={closeRegModal}
//                 className="absolute top-4 right-4 p-1 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition-all"
//               >
//                 <X className="w-4 h-4" />
//               </button>

//               {/* Title Header */}
//               <div className="flex items-center gap-2 text-cyan-400 text-xs tracking-wider border-b border-slate-900 pb-3.5 mb-5 select-none">
//                 <Terminal className="w-4 h-4" />
//                 <span>TERMINAL_SESSION: REGISTER_CODEWAR_2.0</span>
//               </div>

//               {/* Step 1: Hacker Username */}
//               {regStep === 1 && (
//                 <form onSubmit={handleNameSubmit} className="space-y-4">
//                   <div className="text-slate-300 text-xs leading-relaxed space-y-1 select-none">
//                     <p className="text-purple-400 font-bold">{">_ SYSTEM: INITIALIZING REGISTER PROTOCOL..."}</p>
//                     <p>Enter your unique handle/username to secure your compiling port.</p>
//                   </div>

//                   <div className="relative mt-4">
//                     <span className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400 font-semibold select-none font-mono">
//                       {">_ "}
//                     </span>
//                     <input
//                       ref={modalInputRef}
//                       type="text"
//                       maxLength={18}
//                       placeholder="HACKER_HANDLE"
//                       value={hackerName}
//                       onChange={(e) => setHackerName(e.target.value.replace(/[^a-zA-Z0-9_-]/g, ''))}
//                       className="w-full pl-9 pr-4 py-3 rounded bg-slate-900 border border-slate-800 focus:border-cyan-500 focus:outline-none text-cyan-300 font-semibold placeholder-slate-700 font-mono tracking-widest text-sm focus:ring-1 focus:ring-cyan-500/20"
//                     />
//                   </div>

//                   <div className="flex justify-between items-center pt-2">
//                     <span className="text-[10px] text-slate-500 font-mono select-none">
//                       Acceptable: A-Z, 0-9, _, - (min 3 chars)
//                     </span>
//                     <button
//                       type="submit"
//                       disabled={hackerName.trim().length < 3}
//                       className="px-5 py-2 rounded bg-cyan-500 disabled:bg-slate-800 disabled:border-slate-700 disabled:text-slate-600 border border-cyan-400/20 text-slate-950 font-bold hover:bg-cyan-400 transition-all font-mono text-xs flex items-center gap-1.5 shadow-[0_0_15px_rgba(6,182,212,0.15)] disabled:shadow-none cursor-pointer"
//                     >
//                       CONTINUE
//                       <ArrowRight className="w-3.5 h-3.5" />
//                     </button>
//                   </div>
//                 </form>
//               )}

//               {/* Step 2: Language Selection */}
//               {regStep === 2 && (
//                 <div className="space-y-4">
//                   <div className="text-slate-300 text-xs leading-relaxed space-y-1 select-none">
//                     <p className="text-cyan-400 font-semibold">{`>_ IDENTIFIED: ${hackerName.toUpperCase()}`}</p>
//                     <p className="text-purple-400 font-bold">{`>_ ACTION: SELECT PRIMARY CODING CORE`}</p>
//                     <p>Select your default environment. This can be customized during the arena events.</p>
//                   </div>

//                   <div className="grid grid-cols-2 gap-3 mt-4">
//                     {[
//                       { lang: "C++", logo: "GNU C++20", color: "hover:border-blue-500 hover:text-blue-400" },
//                       { lang: "Python", logo: "CPython 3.11", color: "hover:border-yellow-500 hover:text-yellow-400" },
//                       { lang: "Rust", logo: "rustc 1.76", color: "hover:border-amber-600 hover:text-amber-400" },
//                       { lang: "Java", logo: "OpenJDK 21", color: "hover:border-red-500 hover:text-red-400" }
//                     ].map((env) => (
//                       <button
//                         key={env.lang}
//                         onClick={() => selectLanguage(env.lang)}
//                         className={`p-3 text-left rounded bg-slate-900 border border-slate-800/80 transition-all duration-200 cursor-pointer ${env.color} group`}
//                       >
//                         <div className="font-bold text-sm flex items-center justify-between">
//                           <span>{env.lang}</span>
//                           <Code2 className="w-4 h-4 opacity-40 group-hover:opacity-100 transition-opacity" />
//                         </div>
//                         <div className="text-[10px] text-slate-500 font-mono mt-0.5 select-none">{env.logo}</div>
//                       </button>
//                     ))}
//                   </div>

//                   <div className="pt-2 flex">
//                     <button 
//                       onClick={() => setRegStep(1)}
//                       className="px-4 py-1.5 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-400 text-xs font-mono"
//                     >
//                       {`<- BACK`}
//                     </button>
//                   </div>
//                 </div>
//               )}

//               {/* Step 3: Compiling Packet Inject Loading Screen */}
//               {regStep === 3 && (
//                 <div className="space-y-4 py-3 select-none">
//                   <div className="text-xs space-y-1.5 font-mono">
//                     <div className="flex items-center gap-1.5 text-yellow-400">
//                       <Cpu className="w-4 h-4 animate-spin" />
//                       <span>{`>_ RUNNING COMPILER: BINDING_PORTS...`}</span>
//                     </div>
//                     <p className="text-slate-400">{`Hacker: ${hackerName}`}</p>
//                     <p className="text-slate-400">{`Core Environment: ${selectedLang}`}</p>
//                   </div>

//                   <div className="w-full bg-slate-900 rounded-full h-3 border border-slate-800 overflow-hidden mt-4 relative">
//                     <motion.div
//                       className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full"
//                       style={{ width: `${compileProgress}%` }}
//                     />
//                   </div>

//                   <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono">
//                     <span>{`Injected Packets: ${Math.floor(compileProgress * 8)} / 800`}</span>
//                     <span className="font-bold text-cyan-400">{compileProgress}%</span>
//                   </div>
//                 </div>
//               )}

//               {/* Step 4: Success Digital Ticket */}
//               {regStep === 4 && (
//                 <div className="space-y-6">
//                   <div className="text-center space-y-1.5">
//                     <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-emerald-950/30 border border-emerald-500/40 text-emerald-400 mb-2 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
//                       <Check className="w-5 h-5" />
//                     </div>
//                     <h3 className="text-base font-extrabold text-emerald-400 tracking-wider">
//                       REGISTRATION SUCCESSFUL
//                     </h3>
//                     <p className="text-slate-400 text-xs">
//                       Your compiling port has been successfully secured.
//                     </p>
//                   </div>

//                   {/* High Tech Pass Ticket UI */}
//                   <div className="relative rounded bg-slate-900 border border-slate-800 p-4 shadow-[0_0_20px_rgba(6,182,212,0.05)] overflow-hidden">
//                     {/* Corner accents */}
//                     <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-cyan-400" />
//                     <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-cyan-400" />
//                     <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-cyan-400" />
//                     <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-cyan-400" />

//                     <div className="flex justify-between items-start border-b border-slate-800 pb-3 mb-3">
//                       <div>
//                         <span className="text-[10px] text-slate-500 block">EVENT PASS</span>
//                         <span className="text-xs text-white font-bold tracking-wider">CODEWAR 2.0</span>
//                       </div>
//                       <span className="text-xs text-cyan-400 font-bold bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-500/20">
//                         {ticketId}
//                       </span>
//                     </div>

//                     <div className="grid grid-cols-2 gap-y-3 gap-x-1 text-xs">
//                       <div>
//                         <span className="text-[9px] text-slate-500 block uppercase">Hacker Name</span>
//                         <span className="text-slate-200 font-bold truncate max-w-[150px] inline-block">
//                           {hackerName}
//                         </span>
//                       </div>
//                       <div>
//                         <span className="text-[9px] text-slate-500 block uppercase">Default Env</span>
//                         <span className="text-slate-200 font-bold flex items-center gap-1">
//                           <Code2 className="w-3.5 h-3.5 text-purple-400" />
//                           {selectedLang}
//                         </span>
//                       </div>
//                       <div>
//                         <span className="text-[9px] text-slate-500 block uppercase">Pass Status</span>
//                         <span className="text-emerald-400 font-bold flex items-center gap-1">
//                           <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
//                           VERIFIED
//                         </span>
//                       </div>
//                       <div>
//                         <span className="text-[9px] text-slate-500 block uppercase">Event Type</span>
//                         <span className="text-slate-200 font-bold">ONLINE ARENA</span>
//                       </div>
//                     </div>

//                     {/* Faux Barcode */}
//                     <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-col items-center justify-center">
//                       <div className="flex items-center gap-0.5 h-7 opacity-75">
//                         {[1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 4, 1, 2, 1, 3, 2, 1, 4, 1, 2, 3, 1, 4, 2].map((w, i) => (
//                           <div 
//                             key={i} 
//                             className="bg-slate-400 h-full" 
//                             style={{ width: `${w}px` }} 
//                           />
//                         ))}
//                       </div>
//                       <span className="text-[8px] text-slate-600 mt-1 select-none">
//                         SYSTEM INTEGRITY VERIFIED // AUTH_HASH_CW2026
//                       </span>
//                     </div>
//                   </div>

//                   <div className="flex gap-3 pt-2">
//                     <button
//                       onClick={closeRegModal}
//                       className="flex-1 py-2.5 rounded bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
//                     >
//                       CLOSE SESSION
//                     </button>
//                     <button
//                       onClick={() => alert(`Ticket ${ticketId} saved to memory cache.`)}
//                       className="flex-1 py-2.5 rounded bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(6,182,212,0.15)] cursor-pointer"
//                     >
//                       <Download className="w-3.5 h-3.5" />
//                       SAVE TICKET
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>

//     </div>
//   );
// }

// export default App;
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import "./index.css"
import {
  BackgroundElements,
  Header,
  Hero,
  EventCard,
  CountdownTimer,
  RegistrationModal,
  Footer
} from './components';
import { calculateTimeLeft } from './utils';

function App() {
  // Countdown
  const [targetDate] = useState(() => {
    const target = new Date();
    target.setDate(target.getDate() + 14);
    target.setHours(target.getHours() + 6);
    target.setMinutes(target.getMinutes() + 24);
    target.setSeconds(target.getSeconds() + 30);
    return target;
  });
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  // Logs
  const [logs, setLogs] = useState([
    { text: ">_ Initializing sandbox environment...", type: "system" },
    { text: ">_ Connecting to CodeWar Compiler Hub...", type: "system" },
    { text: ">_ Problem A: 'Optimized Pathing' - Loaded 120 test cases", type: "info" },
    { text: ">_ Running compiler test suite... OK", type: "success" },
    { text: ">_ user_x86 submitted Solution.cpp [Problem B] - compiling...", type: "user" }
  ]);

  useEffect(() => {
    const sampleLogs = [
      { text: ">_ user_neophyte submitted solution.py - COMPILING", type: "user" },
      { text: ">_ Test case #24/50: PASSED (18ms)", type: "success" },
      { text: ">_ Test case #50/50: PASSED (12ms)", type: "success" },
      { text: ">_ Problem A solved by user_neophyte [100 pts]", type: "success" },
      { text: ">_ user_rustacean submitted main.rs - COMPILING", type: "user" },
      { text: ">_ Compiler error: unused variable 'result' (warning: treated as error)", type: "error" },
      { text: ">_ user_lambda submitted solution.cpp - COMPILING", type: "user" },
      { text: ">_ Test case #12/80: Time Limit Exceeded (TLE > 2000ms)", type: "error" },
      { text: ">_ user_dev_null submitted Solution.java - COMPILING", type: "user" },
      { text: ">_ Test case #100/100: PASSED (42ms)", type: "success" },
      { text: ">_ Problem C solved by user_dev_null [150 pts]", type: "success" },
      { text: ">_ Active sandbox instances: 342 | Queue size: 1", type: "system" }
    ];

    const interval = setInterval(() => {
      setLogs((prev) => {
        const next = sampleLogs[Math.floor(Math.random() * sampleLogs.length)];
        return [...prev.slice(1), next];
      });
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  // Modal
  const [isRegModalOpen, setIsRegModalOpen] = useState(false);

  return (
    <div className="relative min-h-screen w-full bg-slate-950 text-slate-100 overflow-x-hidden flex flex-col font-sans select-none selection:bg-cyan-500/30 selection:text-cyan-200">
      <BackgroundElements />

      <Header onRegisterClick={() => setIsRegModalOpen(true)} />

      <main className="relative z-10 grow w-full max-w-7xl mx-auto px-6 flex flex-col justify-center py-8 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <Hero onRegisterClick={() => setIsRegModalOpen(true)} />
          <EventCard logs={logs} />
        </div>

        <CountdownTimer timeLeft={timeLeft} />
      </main>

      <Footer />

      <RegistrationModal
        isOpen={isRegModalOpen}
        onClose={() => setIsRegModalOpen(false)}
      />
    </div>
  );
}

export default App;