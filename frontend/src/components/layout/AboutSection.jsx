import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="inline-flex rounded-full border border-cyan-500/20 bg-cyan-500/10 px-5 py-2 text-sm font-medium text-cyan-300 backdrop-blur">
            About The Event
          </span>

          <h2 className="mt-5 text-5xl font-black md:text-6xl">
            <span className="bg-linear-to-r from-cyan-300 via-cyan-200 to-blue-300 bg-clip-text text-transparent">
              What is CodeWar 2.0?
            </span>
          </h2>

          <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-cyan-400" />
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mx-auto mt-20 max-w-4xl"
        >
          <div className="relative overflow-hidden rounded-2xl border border-cyan-500/10 bg-slate-900/40 p-10 backdrop-blur-md shadow-[0_0_40px_rgba(34,211,238,0.05)]">
            {/* subtle glow */}
            <div className="absolute inset-0 bg-linear-to-br from-cyan-500/5 via-transparent to-blue-500/5" />

            <div className="relative space-y-8">
              <p className="text-lg leading-9 text-slate-300">
                <span className="font-semibold text-slate-100">
                  CodeWar 2.0
                </span>{" "}
                is a competitive coding event organized by{" "}
                <span className="font-medium text-cyan-300">
                  Mechi Mavericks
                </span>{" "}
                in collaboration with the{" "}
                <span className="font-medium text-cyan-300">
                  BCA Association of Mechi Multiple Campus
                </span>
                . It provides students with an opportunity to test their
                problem-solving skills, collaborate with peers, and strengthen
                their programming expertise through exciting challenges.
              </p>

              <p className="text-lg leading-9 text-slate-300">
                The competition features multiple rounds, including individual
                and team-based programming challenges designed to evaluate
                logical thinking, analytical ability, and coding efficiency.
                Whether you are a beginner or an experienced programmer,
                <span className="font-semibold text-slate-100">
                  {" "}
                  CodeWar 2.0
                </span>{" "}
                offers a platform to showcase your talent, learn from fellow
                participants, and compete in a dynamic environment.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}