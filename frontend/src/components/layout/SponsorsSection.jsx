import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const sponsors = [
  {
    name: "Bridge International",
    role: "Abroad Study Partner",
    logo: "/sponsors/bridge.png",
  },
  {
    name: "Defang.io",
    role: "Deployment Partner",
    logo: "/sponsors/defang.png",
  },
  {
    name: "GeeksforGeeks",
    role: "Learning Partner",
    logo: "/sponsors/gfg.png",
  },
  {
    name: "Programiz",
    role: "Education Partner",
    logo: "/sponsors/programiz.png",
  },
  {
    name: "Canva",
    role: "Design Partner",
    logo: "/sponsors/canva.png",
  },
];

export default function SponsorsSection() {
  return (
    <section className="relative overflow-hidden py-24">
      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 bottom-0 h-96 w-96 rounded-full bg-blue-600/20 blur-[150px]" />
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-[150px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6 flex justify-center"
        >
          <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-5 py-2 text-sm font-semibold text-cyan-300 backdrop-blur-lg">
            Partnerships & Support
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
            Our Sponsors
          </span>
        </motion.h2>

        <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-linear-to-r from-cyan-400 to-teal-400" />

        <p className="mx-auto mt-8 max-w-xl text-center text-slate-300">
          We are grateful to our sponsors for their generous support.
        </p>

        <div className="relative mt-20">
          {/* Navigation */}
          <button className="sponsor-prev absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full border border-cyan-500/20 bg-white/5 p-3 text-cyan-400 backdrop-blur-lg transition hover:bg-cyan-500/20">
            <ChevronLeft />
          </button>

          <button className="sponsor-next absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full border border-cyan-500/20 bg-white/5 p-3 text-cyan-400 backdrop-blur-lg transition hover:bg-cyan-500/20">
            <ChevronRight />
          </button>

          <Swiper
            modules={[Navigation, Autoplay]}
            navigation={{
              nextEl: ".sponsor-next",
              prevEl: ".sponsor-prev",
            }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            loop
            centeredSlides
            spaceBetween={30}
            breakpoints={{
              320: {
                slidesPerView: 1,
              },
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
          >
            {sponsors.map((sponsor) => (
              <SwiperSlide key={sponsor.name}>
                <motion.div
                  whileHover={{
                    y: -8,
                    scale: 1.03,
                  }}
                  className="group py-4"
                >
                  <div className="mx-auto flex h-56 w-56 items-center justify-center rounded-3xl border border-white/10 bg-slate-900/50 backdrop-blur-xl transition-all duration-500 group-hover:border-cyan-400/50">
                    <img
                      src={sponsor.logo}
                      alt={sponsor.name}
                      className="max-h-36 max-w-36 object-contain transition duration-500 group-hover:scale-110"
                    />
                  </div>

                  <h3 className="mt-6 text-center text-2xl font-bold text-cyan-300">
                    {sponsor.name}
                  </h3>

                  <p className="mt-2 text-center text-slate-400">
                    {sponsor.role}
                  </p>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}