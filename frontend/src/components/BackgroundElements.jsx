import { memo } from "react";
import { motion } from "framer-motion";

import {
  floatingCodeSnippets,
  backgroundParticles,
} from "../constants";

function BackgroundElements() {
  return (
    <>
      {/* Matrix Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#080e1b_1px,transparent_1px),linear-gradient(to_bottom,#080e1b_1px,transparent_1px)] bg-size-[4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black_70%,transparent_100%)] opacity-80 animate-grid-drift" />

      {/* Background Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-900/10 blur-[80px]" />

      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-900/15 blur-[80px]" />

      <div className="absolute top-[30%] right-[10%] w-[35%] h-[35%] rounded-full bg-blue-900/10 blur-[70px]" />

      {/* Scan Line */}
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-cyan-500/30 to-transparent animate-scan" />

      {/* Particles */}
      {backgroundParticles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-cyan-500/10 blur-[1px]"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            top: `${p.top}%`,
          }}
          animate={{
            y: [0, -120, 0],
            x: [0, p.driftX, 0],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}

      {/* Floating Snippets */}
      {floatingCodeSnippets.map((snippet, idx) => (
        <motion.div
          key={idx}
          className="absolute hidden lg:block font-mono text-[11px] text-cyan-400/5 select-none"
          style={{
            top: `${(idx * 7) % 80 + 10}%`,
            left: `${(idx * 13) % 80 + 10}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.03, 0.08, 0.03],
          }}
          transition={{
            duration: 8 + (idx % 3) * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: idx * 0.4,
          }}
        >
          {snippet}
        </motion.div>
      ))}
    </>
  );
}

export default memo(BackgroundElements);