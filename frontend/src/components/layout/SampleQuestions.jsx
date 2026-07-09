import { motion } from "framer-motion";
import { Zap, ShieldCheck, FlaskConical } from "lucide-react";

const questionSets = [
  {
    title: "Beginner Level",
    icon: Zap,
    gradient: "from-cyan-300 to-blue-300",
    border: "border-cyan-400/20",
    questions: [
      {
        q: "Write a function that reverses a string.",
        ex: 'Input: "hello" → Output: "olleh"',
      },
      {
        q: "Check if a word is a palindrome.",
        ex: 'Input: "radar" → Output: true',
      },
      {
        q: "Find the largest number in an array.",
        ex: "Input: [3,7,2,9,1] → Output: 9",
      },
      {
        q: "Calculate the factorial of a number.",
        ex: "Input: 5 → Output: 120 (5×4×3×2×1)",
      },
    ],
  },
  {
    title: "Easy Level",
    icon: ShieldCheck,
    gradient: "from-blue-200 to-purple-300",
    border: "border-cyan-400/20",
    questions: [
      {
        q: "Find the sum of all even numbers in an array.",
        ex: "Input: [1,2,3,4,5,6] → Output: 12",
      },
      {
        q: "Count the number of vowels in a string.",
        ex: 'Input: "hello world" → Output: 3',
      },
      {
        q: "Find the maximum subarray sum.",
        ex: "Input: [-2,1,-3,4,-1,2,1,-5,4] → Output: 6",
      },
      {
        q: "Convert a string to title case.",
        ex: 'Input: "hello world" → Output: "Hello World"',
      },
    ],
  },
  {
    title: "Intermediate Level",
    icon: FlaskConical,
    gradient: "from-purple-300 to-rose-300",
    border: "border-cyan-400/20",
    questions: [
      {
        q: "Find the first non-repeating character.",
        ex: 'Input: "programming" → Output: "p"',
      },
      {
        q: "Check balanced parentheses.",
        ex: 'Input: "{[()]}" → Output: true',
      },
      {
        q: "Generate all permutations of a string.",
        ex: 'Input: "abc" → Output: ["abc","acb"...]',
      },
      {
        q: "Implement a queue using two stacks.",
        ex: "enqueue(1), enqueue(2), dequeue() → 1",
      },
    ],
  },
];

export default function SampleQuestions() {
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
            Challenge Preview
          </span>

          <h2 className="mt-5 text-5xl font-black md:text-6xl">
            <span className="bg-linear-to-r from-cyan-300 via-cyan-200 to-blue-300 bg-clip-text text-transparent">
              Sample Questions
            </span>
          </h2>

          <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-cyan-400" />

          <p className="mx-auto mt-8 max-w-3xl text-slate-300">
            Here are some sample questions to give you an idea of what to expect
            at CodeWar 1.0.
          </p>
        </motion.div>

        {/* Cards */}

        <div className="mt-20 grid gap-8 lg:grid-cols-3">
          {questionSets.map((section, index) => {
            const Icon = section.icon;

            return (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.15,
                  duration: 0.5,
                }}
                className={`overflow-hidden rounded-2xl border bg-slate-900/40 backdrop-blur-md ${section.border}`}
              >
                {/* Header */}

                <div
                  className={`flex items-center gap-4 bg-linear-to-r ${section.gradient} p-6`}
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20">
                    <Icon className="h-6 w-6 text-slate-800" />
                  </div>

                  <h3 className="text-xl font-bold text-slate-900">
                    {section.title}
                  </h3>
                </div>

                {/* Questions */}

                <div className="space-y-5 p-6">
                  {section.questions.map((item, i) => (
                    <div
                      key={i}
                      className="border-b border-white/5 pb-5 last:border-none"
                    >
                      <div className="mb-3 flex items-start gap-3">
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-700 text-[11px] font-bold text-slate-300">
                          {i + 1}
                        </div>

                        <p className="font-medium text-slate-200">{item.q}</p>
                      </div>

                      <div className="rounded-lg border border-white/5 bg-slate-950/40 px-4 py-3 text-sm font-mono text-slate-400">
                        {item.ex}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
        {/* Note */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mx-auto mt-12 max-w-5xl"
        >
          <div className="relative overflow-hidden rounded-xl border border-cyan-500/10 bg-slate-900/40 px-8 py-6 backdrop-blur-md shadow-[0_0_30px_rgba(34,211,238,0.05)]">
            {/* subtle glow */}
            <div className="absolute inset-0 bg-linear-to-r from-cyan-500/5 via-transparent to-blue-500/5" />

            <p className="relative text-center text-[15px] leading-8 text-slate-300">
              <span className="font-semibold text-cyan-300">Note:</span> During
              the actual <span className="font-medium text-white">CodeWar</span>{" "}
              event, you'll encounter questions across various difficulty levels
              ranging from beginner to medium. All questions are designed to
              evaluate your problem-solving abilities, logical thinking, and
              coding skills.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
