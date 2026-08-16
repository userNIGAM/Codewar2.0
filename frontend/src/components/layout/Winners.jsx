import { motion } from "framer-motion";
import { Users } from "lucide-react";

// import winner from "../assets/winners/winner.jpg";
// import runnerUp from "../assets/winners/runner-up.jpg";
// import secondRunner from "../assets/winners/second-runner.jpg";

const winners = [
  {
    title: "Winner",
    badge: "WINNER",
    color: "bg-yellow-400 text-slate-900",
    // image: winner,
  },
  {
    title: "1st Runner Up",
    badge: "1ST RUNNER UP",
    color: "bg-sky-300 text-slate-900",
    // image: runnerUp,
  },
  {
    title: "2nd Runner Up",
    badge: "2ND RUNNER UP",
    color: "bg-orange-400 text-white",
    // image: secondRunner,
  },
];

export default function Winners() {
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="inline-flex rounded-full border border-cyan-500/20 bg-cyan-500/10 px-5 py-2 text-sm font-medium text-cyan-300">
            Hall of Fame
          </span>

          <h2 className="mt-5 text-5xl font-black md:text-6xl">
            <span className="bg-linear-to-r from-cyan-300 via-cyan-200 to-blue-300 bg-clip-text text-transparent">
              CodeWar 2.0 Winners
            </span>
          </h2>

          <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-cyan-400" />

          <p className="mx-auto mt-8 max-w-3xl text-slate-300">
            Honoring the exceptional teams who pushed the boundaries of
            technology and innovation in our CodeWar2.0.
          </p>
        </motion.div>

        {/* Cards */}

        <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {winners.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.15,
                duration: 0.5,
              }}
              whileHover={{
                y: -8,
                scale: 1.02,
              }}
              className="group"
            >
              <div className="overflow-hidden rounded-2xl border border-cyan-500/15 bg-slate-900/40 backdrop-blur-md shadow-[0_0_35px_rgba(34,211,238,.06)] transition-all duration-500 hover:border-cyan-400/40 hover:shadow-[0_0_50px_rgba(34,211,238,.15)]">

                {/* Image */}

                <div className="relative overflow-hidden">
                  <img
                    // src={item.image}
                    alt={item.title}
                    className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 via-transparent to-transparent" />

                  {/* Badge */}

                  <span
                    className={`absolute left-5 top-5 rounded-full px-4 py-2 text-xs font-bold tracking-wide ${item.color}`}
                  >
                    {item.badge}
                  </span>

                  {/* Icon */}

                  <div className="absolute bottom-5 left-5 flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-500/20 bg-slate-900/80 backdrop-blur">
                    <Users className="h-6 w-6 text-cyan-300" />
                  </div>
                </div>

                {/* Footer */}

                <div className="p-6 text-center">
                  <h3 className="text-2xl font-bold text-cyan-300">
                    {item.title}
                  </h3>
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}