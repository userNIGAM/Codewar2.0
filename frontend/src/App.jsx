import { useState, useMemo } from "react";
import { AnimatePresence } from "framer-motion";

import "./index.css";

import {
  BackgroundElements,
  Header,
  Hero,
  EventCard,
  CountdownTimer,
  RegistrationModal,
  Footer,
} from "./components";

import useTerminalLogs from "./hooks/useTerminalLogs";
import EventTimeline from "./components/layout/EventTimeline";
import AwardsSection from "./components/layout/AwardsSection";
import OrganizerSection from "./components/layout/OrganizerSection";

function App() {
  const logs = useTerminalLogs();

  const [isRegModalOpen, setIsRegModalOpen] = useState(false);

  const targetDate = useMemo(() => {
    const target = new Date();

    target.setDate(target.getDate() + 14);
    target.setHours(target.getHours() + 6);
    target.setMinutes(target.getMinutes() + 24);
    target.setSeconds(target.getSeconds() + 30);

    return target;
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-slate-950 text-slate-100 overflow-x-clip flex flex-col font-sans select-none selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* FIXED BACKGROUND LAYER */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <BackgroundElements />
      </div>

      <Header onRegisterClick={() => setIsRegModalOpen(true)} />

      <main className="relative z-10 w-full">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-6 max-w-7xl mx-auto">
          <div className="w-full max-w-8xl">
            <Hero onRegisterClick={() => setIsRegModalOpen(true)} />
          </div>
        </section>

        {/* Remaining Content */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <CountdownTimer targetDate={targetDate} />

          <div className="mt-24">{/* <EventTimeline /> */}</div>

          <div className="mt-4">
            <AwardsSection />
          </div>

          <OrganizerSection />
        </section>
      </main>

      <Footer />

      <AnimatePresence>
        {isRegModalOpen && (
          <RegistrationModal
            isOpen={isRegModalOpen}
            onClose={() => setIsRegModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
