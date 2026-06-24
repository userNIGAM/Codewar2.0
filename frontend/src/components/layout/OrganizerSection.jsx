import { motion } from "framer-motion";
import { ArrowRight, Mail, Users } from "lucide-react";

export default function OrganizerSection() {
  return (
    <section className="relative overflow-hidden py-24">
      {/* Ambient Glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 bottom-0 h-96 w-96 rounded-full bg-blue-600/20 blur-[140px]" />
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-5xl font-extrabold md:text-7xl">
            <span className="bg-linear-to-r from-cyan-300 via-teal-300 to-blue-400 bg-clip-text text-transparent">
              Organized by Mechi Mavericks
            </span>
          </h2>

          <div className="mx-auto mt-5 h-1 w-24 rounded-full bg-linear-to-r from-cyan-400 to-teal-400" />

          <p className="mx-auto mt-8 max-w-3xl text-lg text-slate-300">
            Bringing innovation and technology together for the next
            generation of developers.
          </p>
        </motion.div>

        {/* Content */}
        <div className="mt-20 grid items-center gap-14 lg:grid-cols-2">
          {/* Logo Card */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex justify-center"
          >
            <div className="group relative flex h-95 w-full max-w-md items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-slate-900/40 backdrop-blur-xl">
              {/* Glow */}
              <div className="absolute inset-0 bg-linear-to-br from-cyan-500/10 to-teal-500/10 opacity-0 transition duration-500 group-hover:opacity-100" />

              {/* Logo */}
              <img
                src="/mechi-logo.png"
                alt="Mechi Mavericks"
                className="relative z-10 w-72 object-contain transition duration-500 group-hover:scale-105"
              />
            </div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {/* About */}
            <div className="mb-12">
              <h3 className="text-4xl font-bold text-cyan-300">
                About Us
              </h3>

              <div className="mt-3 h-1 w-16 rounded-full bg-cyan-400" />

              <p className="mt-6 text-lg leading-relaxed text-slate-300">
                Mechi Mavericks is a dynamic community of tech
                enthusiasts and innovators from Mechi Campus. We are
                dedicated to fostering technological growth and
                creating opportunities for aspiring developers.
              </p>
            </div>

            {/* Mission */}
            <div>
              <h3 className="text-4xl font-bold text-cyan-300">
                Our Mission
              </h3>

              <div className="mt-3 h-1 w-16 rounded-full bg-cyan-400" />

              <p className="mt-6 text-lg leading-relaxed text-slate-300">
                To create a thriving tech ecosystem in the Mechi
                region by organizing events, workshops, and
                competitions that inspire and empower the next
                generation of developers.
              </p>
            </div>

            {/* Buttons */}
            <div className="mt-12 flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 rounded-xl bg-linear-to-r from-cyan-500 to-teal-500 px-8 py-4 font-semibold text-white shadow-lg shadow-cyan-500/25"
              >
                <Mail size={18} />
                Contact Us
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 rounded-xl border border-cyan-500/40 bg-white/5 px-8 py-4 font-semibold text-white backdrop-blur-md"
              >
                <Users size={18} />
                Join Community
                <ArrowRight size={18} />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}