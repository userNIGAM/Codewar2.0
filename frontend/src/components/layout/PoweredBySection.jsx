import { motion } from "framer-motion";

const partners = [
  {
    name: "BCA Association-MMC",
    logo: "/partners/bca.png",
  },
];

export default function PoweredBySection() {
  return (
    <section className="relative overflow-hidden py-24">
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 bottom-0 h-96 w-96 rounded-full bg-blue-600/20 blur-[150px]" />
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-[150px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6 flex justify-center"
        >
          <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-5 py-2 text-sm font-semibold text-cyan-300 backdrop-blur-lg">
            Support & Contribution
          </span>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-5xl font-extrabold md:text-7xl"
        >
          <span className="bg-linear-to-r from-cyan-300 via-teal-300 to-blue-400 bg-clip-text text-transparent">
            Event Powered By
          </span>
        </motion.h2>

        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: 90 }}
          viewport={{ once: true }}
          className="mx-auto mt-5 h-1 rounded-full bg-linear-to-r from-cyan-400 to-teal-400"
        />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mx-auto mt-8 max-w-xl text-center text-slate-300"
        >
          We are grateful to our partners for their generous
          contributions.
        </motion.p>

        {/* Partner */}
        <div className="mt-20 flex justify-center">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, scale: 0.8, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
              }}
              whileHover={{
                y: -10,
                scale: 1.05,
              }}
              className="group text-center"
            >
              <div className="relative mx-auto flex h-56 w-56 items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-slate-900/50 backdrop-blur-xl transition-all duration-500 group-hover:border-cyan-400/40 group-hover:shadow-2xl group-hover:shadow-cyan-500/10">
                {/* Glow */}
                <div className="absolute inset-0 bg-linear-to-br from-cyan-500/10 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />

                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="relative z-10 max-h-36 max-w-36 object-contain transition duration-500 group-hover:scale-110"
                />
              </div>

              <h3 className="mt-6 text-2xl font-semibold text-cyan-300">
                {partner.name}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}