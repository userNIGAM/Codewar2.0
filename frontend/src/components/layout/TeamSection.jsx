import { motion } from "framer-motion";
import { FaLinkedin } from "react-icons/fa";
import {Mail } from "lucide-react"
const leaders = [
  {
    name: "Samir Kharel",
    role: "Event Lead",
    image: "/leaders/samir.jpg",
    description:
      "Leading the overall coordination and management of CodeWar 1.0, ensuring a seamless experience for all participants.",
    email: "#",
    linkedin: "#",
    featured: false,
  },
  {
    name: "Santosh Bhandari",
    role: "Event Co-Lead",
    image: "/leaders/santosh.jpg",
    description:
      "Supporting event coordination and working closely with the lead to deliver an exceptional competitive programming experience.",
    email: "#",
    linkedin: "#",
    featured: true,
  },
];

export default function TeamSection() {
  return (
    <section className="relative overflow-hidden py-24">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-blue-500/20 blur-[140px]" />
        <div className="absolute -right-20 top-10 h-96 w-96 rounded-full bg-cyan-500/10 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6 flex justify-center"
        >
          <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-5 py-2 text-sm font-semibold text-cyan-300 backdrop-blur-xl">
            Event Leadership
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-5xl font-extrabold md:text-7xl"
        >
          <span className="bg-linear-to-r from-cyan-300 via-teal-300 to-blue-400 bg-clip-text text-transparent">
            Meet Our Event Leaders
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
          The dedicated team leading CodeWar 1.0 to success.
        </motion.p>

        {/* Cards */}
        <div className="mt-16 grid gap-10 lg:grid-cols-2">
          {leaders.map((leader, index) => (
            <motion.div
              key={leader.name}
              initial={{ opacity: 0, y: 70 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.2,
              }}
              whileHover={{
                y: -8,
                scale: 1.02,
              }}
              className={`group relative overflow-hidden rounded-3xl border p-10 backdrop-blur-xl transition-all duration-500 ${
                leader.featured
                  ? "border-cyan-500/40 bg-slate-900/55"
                  : "border-white/10 bg-slate-900/45"
              }`}
            >
              {/* Glow */}
              <div className="absolute inset-0 bg-linear-to-br from-cyan-500/10 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />

              {/* Profile */}
              <div className="flex justify-center">
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="h-32 w-32 rounded-full border-4 border-cyan-400 object-cover shadow-lg shadow-cyan-500/20"
                />
              </div>

              {/* Name */}
              <h3 className="mt-8 text-center text-4xl font-bold text-white">
                {leader.name}
              </h3>

              {/* Role */}
              <p className="mt-2 text-center text-xl font-semibold text-cyan-400">
                {leader.role}
              </p>

              <div className="mx-auto mt-4 h-1 w-14 rounded-full bg-cyan-400" />

              {/* Description */}
              <p className="mt-8 text-center text-lg leading-8 text-slate-300">
                {leader.description}
              </p>

              {/* Socials */}
              <div className="mt-10 flex justify-center gap-5">
                <motion.a
                  whileHover={{ scale: 1.15 }}
                  href={leader.email}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition hover:border-cyan-400 hover:text-cyan-400"
                >
                  <Mail size={18} />
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.15 }}
                  href={leader.linkedin}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition hover:border-cyan-400 hover:text-cyan-400"
                >
                 <FaLinkedin size={18} />
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}