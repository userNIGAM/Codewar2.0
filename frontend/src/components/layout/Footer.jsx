import { motion } from "framer-motion";
import {
  FaLinkedin,
  FaDiscord,
  FaFacebook,
  FaInstagram,
  FaCode,
} from "react-icons/fa";

export default function Footer() {
  const socialLinks = [
    {
      name: "LinkedIn",
      icon: <FaLinkedin size={20} />,
      href: "https://linkedin.com",
    },
    {
      name: "Discord",
      icon: <FaDiscord size={20} />,
      href: "https://discord.com",
    },
    {
      name: "Facebook",
      icon: <FaFacebook size={20} />,
      href: "https://facebook.com",
    },
    {
      name: "Instagram",
      icon: <FaInstagram size={20} />,
      href: "https://instagram.com",
    },
  ];

  return (
    <footer className="relative mt-20 overflow-hidden border-t border-cyan-500/10 bg-linear-to-r from-slate-900 via-[#0a1830] to-[#0d2a3c]">
      {/* Glow Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(34,211,238,0.12),transparent_35%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,rgba(34,211,238,0.08),transparent_35%)]" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-10">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4"
          >
            <div className="w-14 h-14 rounded-full border-2 border-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-500/20 bg-slate-900/50">
              {/* Replace with your logo */}
              {/* <img
                src="/logo.png"
                alt="CodeWar Logo"
                className="w-8 h-8 object-contain"
              /> */}
              <FaCode className="text-cyan-300 text-2xl" />
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-cyan-300">
              By Mechi Mavericks
            </h2>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-6 md:gap-10"
          >
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-slate-200 hover:text-cyan-400 transition-all duration-300"
              >
                <span className="group-hover:scale-110 transition-transform duration-300">
                  {social.icon}
                </span>
                <span className="text-sm md:text-base">
                  {social.name}
                </span>
              </a>
            ))}
          </motion.div>
        </div>

        {/* Divider */}
        <div className="my-8 h-px bg-white/10" />

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm"
        >
          <p className="text-slate-400 text-center md:text-left">
            © 2026 CodeWar 1.0.{" "}
            <span className="text-white font-medium">
              All rights reserved.
            </span>
          </p>

          <div className="flex gap-6">
            <a
              href="#privacy"
              className="text-slate-400 hover:text-cyan-400 transition-colors"
            >
              Privacy Policy
            </a>

            <a
              href="#security"
              className="text-slate-400 hover:text-cyan-400 transition-colors"
            >
              Security Manifest
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}