import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";

const timelineData = [
  {
    title: "Registration",
    date: "23 April 2025 - 27 May 2025",
    description:
      "Registration for CodeWar 2.0 opens from April, 2025, until May 27, 2025. This timeframe provides aspiring participants with the opportunity to register for the upcoming event.",
  },
  {
    title: "Formation of Teams",
    date: "2th June 2025",
    description:
      "The team formation will be completed on 02th June, 2025. The formatted teams will be notified via email and need to cooperate during the competition.",
  },
  {
    title: "Main Event",
    date: "05th - 06th June 2025",
    description:
      "The main event will take place on June 05 and 06, 2025. Registered participants and their teams will compete in the final round.",
  },
];

export default function EventTimeline() {
  return (
    <section className="relative w-full text-white">

      <div className="container mx-auto px-6 py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-24 text-center"
        >
          <button className="mb-6 rounded-full border border-cyan-500/40 bg-slate-950 px-6 py-2 text-sm font-medium text-cyan-300 backdrop-blur">
            Mark Your Calendar
          </button>

          <h2 className="text-5xl font-bold md:text-7xl">
            <span className="bg-linear-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
              Event Timeline
            </span>
          </h2>

          <div className="mx-auto mt-6 h-1 w-28 rounded-full bg-cyan-400" />
        </motion.div>

        <div className="grid gap-20 lg:grid-cols-[320px_1fr]">
          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:sticky lg:top-32 h-fit"
          >
            <div className="mb-8 h-1 w-24 rounded-full bg-cyan-400" />

            <h3 className="mb-2 text-5xl font-bold">Our Journey</h3>

            <p className="mb-8 text-3xl font-semibold text-cyan-400">
              CodeWar 2025
            </p>

            <p className="mb-10 leading-8 text-slate-300">
              Follow our path as we prepare for the ultimate coding showdown.
              Mark these key dates in your calendar.
            </p>

            <div className="space-y-4">
              <Legend color="bg-cyan-400" text="Registration Period" />
              <Legend color="bg-sky-400" text="Team Formation" />
              <Legend color="bg-violet-400" text="Main Event" />
            </div>
          </motion.div>

          {/* TIMELINE */}
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-4 top-0 h-full w-px bg-cyan-500/30" />

            <div className="space-y-20">
              {timelineData.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.15,
                  }}
                  viewport={{ once: true }}
                  className="relative pl-16"
                >
                  {/* Dot */}
                  <div className="absolute left-0 top-6 h-8 w-8 rounded-full border border-cyan-400/50 bg-cyan-400 shadow-[0_0_25px_rgba(34,211,238,0.8)]" />

                  {/* Card */}
                  <div className="rounded-2xl border border-cyan-500/20 bg-white/0.03 p-8 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]">
                    <h3 className="mb-5 text-4xl font-bold text-cyan-300">
                      {item.title}
                    </h3>

                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-300">
                      <CalendarDays size={16} />
                      {item.date}
                    </div>

                    <p className="text-lg leading-8 text-slate-300">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Legend({ color, text }) {
  return (
    <div className="flex items-center gap-3">
      <span className={`h-3 w-3 rounded-full ${color}`} />
      <span className="text-lg text-slate-200">{text}</span>
    </div>
  );
}
