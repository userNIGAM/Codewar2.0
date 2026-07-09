import { useState, useMemo, useEffect } from "react";
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
import TeamSection from "./components/layout/TeamSection";
import SponsorsSection from "./components/layout/SponsorsSection";
import PoweredBySection from "./components/layout/PoweredBySection";
import SupportedBySection from "./components/layout/SupportedBySection";
import Advisors from "./components/layout/Advisors";
import AboutSection from "./components/layout/AboutSection";
import SampleQuestions from "./components/layout/SampleQuestions";
import Winners from "./components/layout/Winners";
import FAQSection from "./components/layout/FAQSection";
import { getCountdown } from "./api/api";

function App() {
  const logs = useTerminalLogs();

  const [isRegModalOpen, setIsRegModalOpen] = useState(false);
  const [targetDate, setTargetDate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountdown = async () => {
      try {
        const response = await getCountdown();
        if (response.data.success && response.data.data.targetDate) {
          setTargetDate(new Date(response.data.data.targetDate));
        }
      } catch (error) {
        console.error("Error fetching countdown:", error);
        // Fallback to default countdown if API fails
        const defaultDate = new Date();
        defaultDate.setDate(defaultDate.getDate() + 14);
        defaultDate.setHours(defaultDate.getHours() + 6);
        setTargetDate(defaultDate);
      } finally {
        setLoading(false);
      }
    };

    fetchCountdown();
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
          {!loading && targetDate && <CountdownTimer targetDate={targetDate} />}

          <div className="mt-24">
            <EventTimeline />
            </div>

          <div className="mt-4">
            <AwardsSection />
          </div>

          <OrganizerSection />
          <TeamSection />
          <SponsorsSection />
          <PoweredBySection />
          <SupportedBySection />
          <Advisors />
          <AboutSection />
          <SampleQuestions />
          <Winners />
          <FAQSection />
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
