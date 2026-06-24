import { motion } from "framer-motion";
import {
  ShieldCheck,
  BadgeCheck,
  Trophy,
  Award,
} from "lucide-react";

import {
  FaMedal,
  FaCrown,
} from "react-icons/fa";

const awards = [
  {
    title: "Winner",
    icon: <FaCrown />,
    gradient:
      "from-yellow-300 via-yellow-400 to-amber-500",
    glow: "shadow-yellow-500/30",
    items: [
      "Fellowship Program from Kharaayo Inc.",
      "Exciting Swags & Gifts for Winner",
      "Defang Pro for 1 Year",
      "Stickers for participants",
      "Certificate for all the Participants",
    ],
  },
  {
    title: "First Runner Up",
    icon: <Trophy size={18} />,
    gradient:
      "from-cyan-300 via-sky-400 to-cyan-500",
    glow: "shadow-cyan-500/30",
    items: [
      "Programiz Pro for 1 Year",
      "Canva Pro for 1 Year",
      "Stickers for participants",
      "Certificate for all the Participants",
      "Special Recognition",
    ],
  },
  {
    title: "Second Runner Up",
    icon: <FaMedal />,
    gradient:
      "from-orange-400 via-orange-500 to-amber-600",
    glow: "shadow-orange-500/30",
    items: [
      "Canva Pro for 1 Year",
      "Stickers for participants",
      "Certificate for all the Participants",
      "Recognition",
      "Participation Gifts",
    ],
  },
];

export default function AwardsSection() {
  return (
    <section className="relative overflow-hidden py-24">
      {/* Transparent Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-20 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[140px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6 flex justify-center"
        >
          <span className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-6 py-2 text-sm font-medium text-cyan-300 backdrop-blur-md">
            Recognition & Rewards
          </span>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-5xl font-extrabold md:text-7xl"
        >
          <span className="bg-linear-to-r from-cyan-300 via-teal-300 to-blue-400 bg-clip-text text-transparent">
            Prizes & Awards
          </span>
        </motion.h2>

        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: 110 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto mt-5 h-1 rounded-full bg-linear-to-r from-cyan-400 to-teal-400"
        />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mx-auto mt-8 max-w-2xl text-center text-gray-300"
        >
          Please note that the prizes and awards are subject to
          change as per the event requirements.
        </motion.p>

        {/* Cards */}
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {awards.map((award, index) => (
            <motion.div
              key={award.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
              }}
              whileHover={{
                y: -8,
                scale: 1.02,
              }}
              className={`group relative rounded-3xl border border-cyan-400/10 bg-slate-900/50 p-8 backdrop-blur-xl transition-all duration-300 ${award.glow} shadow-2xl`}
            >
              {/* Glow */}
              <div
                className={`absolute inset-0 rounded-3xl bg-linear-to-b ${award.gradient} opacity-0 blur-3xl transition duration-500 group-hover:opacity-10`}
              />

              {/* Label */}
              <div className="flex justify-center">
                <div
                  className={`bg-linear-to-r ${award.gradient} rounded-full px-8 py-3 font-semibold text-slate-900 shadow-lg`}
                >
                  {award.title}
                </div>
              </div>

              {/* Center Icon */}
              <div className="mt-8 flex justify-center">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                  className="flex h-20 w-20 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-500/10 text-cyan-300"
                >
                  <BadgeCheck size={34} />
                </motion.div>
              </div>

              {/* List */}
              <ul className="mt-10 space-y-5">
                {award.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-gray-200"
                  >
                    <ShieldCheck
                      size={18}
                      className="mt-1 shrink-0 text-cyan-400"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Hover Border */}
              <div
                className={`absolute inset-0 rounded-3xl bg-linear-to-r ${award.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-20`}
                style={{
                  mask:
                    "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMask:
                    "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                  padding: "1px",
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}