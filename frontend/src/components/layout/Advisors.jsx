import { motion } from "framer-motion";

const advisors = [
  {
    name: "Sadhana Panthi",
    role: "Software Engineer",
    image: "/advisors/sadhana.jpg",
  },
  {
    name: "Banshaj Paudel",
    role: "Tech Advisor",
    image: "/advisors/banshaj.jpg",
  },
];

export default function Advisors() {
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .6 }}
          className="text-center"
        >
          <span className="inline-flex rounded-full border border-cyan-500/20 bg-cyan-500/10 px-5 py-2 text-sm font-medium text-cyan-300 backdrop-blur">
            Guidance & Expertise
          </span>

          <h2 className="mt-5 text-5xl font-black md:text-6xl">
            <span className="bg-linear-to-r from-cyan-300 via-cyan-200 to-blue-300 bg-clip-text text-transparent">
              Our Advisors
            </span>
          </h2>

          <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-cyan-400" />

          <p className="mx-auto mt-8 max-w-2xl text-slate-300">
            We are grateful to our advisors for their guidance and expertise.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="mt-20 flex flex-wrap justify-center gap-16">
          {advisors.map((advisor, index) => (
            <motion.div
              key={advisor.name}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: .6,
                delay: index * .15,
              }}
              whileHover={{ y: -8 }}
              className="group text-center"
            >
              {/* Image */}
              <div className="relative mx-auto h-44 w-44 overflow-hidden rounded-xl border border-cyan-500/20 shadow-[0_0_35px_rgba(34,211,238,.08)] transition-all duration-500 group-hover:border-cyan-400/50 group-hover:shadow-[0_0_45px_rgba(34,211,238,.2)]">
                <img
                  src={advisor.image}
                  alt={advisor.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-linear-to-t from-slate-950/20 via-transparent to-transparent" />
              </div>

              {/* Text */}
              <h3 className="mt-6 text-3xl font-bold text-cyan-300">
                {advisor.name}
              </h3>

              <p className="mt-2 text-slate-400">
                {advisor.role}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}