import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";

const faqs = [
  {
    question: "What is CodeWar 1.0?",
    answer:
      "CodeWar 1.0 is a competitive programming event organized by Mechi Mavericks in collaboration with the BCA Association of Mechi Multiple Campus. Participants solve coding challenges individually and in teams.",
  },
  {
    question: "How can I register for CodeWar 1.0?",
    answer:
      "Registration can be completed through the official registration form available on the event website during the registration period.",
  },
  {
    question: "Can I participate individually or do I need a team?",
    answer:
      "Participants register individually. Teams will be formed by the organizers after registration closes.",
  },
  {
    question: "What will be the format of the event?",
    answer:
      "The event consists of multiple rounds of algorithmic and programming challenges designed to test logical thinking, coding ability, and teamwork.",
  },
  {
    question: "Do I need prior coding experience to participate?",
    answer:
      "Basic programming knowledge is recommended, but beginners are encouraged to participate and learn from the experience.",
  },
  {
    question: "How will the challenges be judged?",
    answer:
      "Solutions will be evaluated automatically based on correctness, efficiency, and completion within the allotted time.",
  },
  {
    question: "Are there prizes for the winners?",
    answer:
      "Yes. Winners and runner-ups will receive certificates, prizes, and recognition during the closing ceremony.",
  },
  {
    question: "When and where is CodeWar 1.0 happening?",
    answer:
      "The final event will be held at Mechi Multiple Campus, Bhadrapur, Jhapa on June 5–6, 2025.",
  },
  {
    question:
      "Can I participate if I am not a BCA student at Mechi Multiple Campus?",
    answer:
      "Please refer to the official eligibility criteria. If the event is open to other institutions, it will be mentioned in the registration details.",
  },
  {
    question: "How can I prepare for CodeWar 1.0?",
    answer:
      "Practice data structures, algorithms, problem solving, and previous competitive programming problems on platforms like Codeforces, LeetCode, or HackerRank.",
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState(0);

  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-5xl px-6">
        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="inline-flex rounded-full border border-cyan-500/20 bg-cyan-500/10 px-5 py-2 text-sm font-medium text-cyan-300">
            Got Questions?
          </span>

          <h2 className="mt-5 text-5xl font-black md:text-6xl">
            <span className="bg-linear-to-r from-cyan-300 via-cyan-200 to-blue-300 bg-clip-text text-transparent">
              Frequently Asked Questions
            </span>
          </h2>

          <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-cyan-400" />

          <p className="mx-auto mt-8 max-w-2xl text-slate-300">
            Here are some common questions about CodeWar 1.0 and its details.
          </p>
        </motion.div>

        {/* FAQ */}

        <div className="mt-16 space-y-4">
          {faqs.map((faq, index) => {
            const active = open === index;

            return (
              <motion.div
                key={faq.question}
                layout
                transition={{ duration: 0.25 }}
                className={`overflow-hidden rounded-xl border bg-slate-900/40 backdrop-blur-md ${
                  active
                    ? "border-cyan-500/40 shadow-[0_0_20px_rgba(34,211,238,.12)]"
                    : "border-white/10"
                }`}
              >
                <button
                  onClick={() => setOpen(active ? -1 : index)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                >
                  <span className="text-lg font-semibold text-white">
                    {faq.question}
                  </span>

                  <motion.div
                    animate={{ rotate: active ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <ChevronDown className="h-5 w-5 text-cyan-300" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {active && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="border-t border-white/5 px-6 py-5 text-slate-300 leading-8">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Contact */}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <p className="mb-6 text-slate-300">
            Have more questions?
          </p>

          <button className="inline-flex items-center gap-2 rounded-lg bg-linear-to-r from-cyan-500 to-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:scale-105">
            Contact Us
            <ArrowRight size={18} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}