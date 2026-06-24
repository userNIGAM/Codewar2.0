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

      <main className="relative z-10 grow w-full max-w-7xl mx-auto px-6 flex flex-col justify-center py-8 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <Hero onRegisterClick={() => setIsRegModalOpen(true)} />

          <EventCard logs={logs} />
        </div>
       
        <CountdownTimer targetDate={targetDate} />
         <div className="mt-24">
          <EventTimeline />
         </div>
         <div className="mt-4">
          <AwardsSection />
         </div>
         <OrganizerSection />
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
