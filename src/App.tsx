import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { NetworkTimer } from './components/NetworkTimer';
import { IcebreakerQuestion } from './components/IcebreakerQuestion';
import { BreakoutGrid } from './components/BreakoutGrid';
import { NotificationTicker } from './components/NotificationSystem';
import { Activity, Signal, Users, Moon, Sun, Calendar, Sparkles } from 'lucide-react';
import { BrutalCard } from './components/BrutalCard';

export default function App() {
  const [participants, setParticipants] = useState(428);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Sync theme with body class for portal and global styles
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const interval = setInterval(() => {
      setParticipants(prev => prev + (Math.random() > 0.5 ? 1 : -1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`min-h-screen p-4 md:p-8 lg:p-12 font-sans overflow-x-hidden bg-bg-primary text-text-primary select-none transition-colors duration-500 ${isDarkMode ? 'dark' : ''}`} id="app-root">
      <div className="max-w-[1600px] mx-auto flex flex-col gap-12">
        {/* Header Section */}
        <header className="flex flex-col gap-8 pb-8 border-b-[6px] border-border-primary" id="main-header">
          <div className="flex justify-between items-start">
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-3 bg-text-primary text-bg-primary border-4 border-border-primary brutal-shadow transition-transform active:scale-95"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>

            <div className="flex flex-col items-end gap-1 font-black text-[10px] md:text-[12px] uppercase tracking-widest text-text-primary">
              <div className="flex items-center gap-2 bg-bg-primary border-4 border-border-primary px-4 py-1 rounded-full brutal-shadow">
                <Signal size={14} className="text-brand-orange" />
                <span>Event: 5.15 Happy Hour NYC</span>
              </div>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse border-2 border-border-primary" />
                  <span>Room: Alpha-One</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={14} />
                  <span>{participants - 300} Ready</span>
                </div>
              </div>
            </div>
          </div>

          <h1 className="text-[14vw] md:text-[12.5vw] lg:text-[11.5vw] font-display font-black tracking-[-0.08em] md:tracking-[-0.09em] leading-[0.7] uppercase italic border-[10px] md:border-[16px] border-border-primary bg-black px-4 md:px-10 py-12 md:py-20 shadow-[16px_16px_0px_0px_white] dark:shadow-[16px_16px_0px_0px_#FFD60A] w-full transition-all hover:scale-[1.002] select-none overflow-hidden">
            <span className="text-brand-yellow-solid">Asian</span> <br />
            <span className="text-brand-orange">Networking</span>
          </h1>
        </header>

        {/* Global Live Ticker */}
        <div className="-mt-8">
          <NotificationTicker />
        </div>

        {/* Main Content Layout */}
        <main className="flex flex-col gap-12" id="dashboard-content">
          {/* Top Section: Icebreaker & Timer Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-8">
              <IcebreakerQuestion />
            </div>
            <div className="lg:col-span-4">
              <NetworkTimer />
            </div>
          </div>

          {/* Full Width Breakout Section */}
          <section id="breakout-themes-section" className="w-full">
            <BreakoutGrid />
          </section>

          {/* Promotion Section */}
          <section id="weekend-club-promo" className="w-full">
            <BrutalCard className="bg-brand-pink text-black" label="Coming Soon">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8 h-full">
                <div className="flex flex-col gap-6 max-w-2xl text-center md:text-left">
                  <div className="flex items-center gap-3 justify-center md:justify-start">
                    <Sparkles className="w-8 h-8 md:w-12 md:h-12 fill-black" />
                    <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter italic">
                      The Weekend Club
                    </h2>
                  </div>
                  <p className="text-xl md:text-2xl font-black uppercase tracking-tight leading-none">
                    Continue the conversation and meet up in the future! 
                    Join the exclusive circle of creators, connectors, and friends.
                  </p>
                </div>
                
                <div className="flex flex-col items-center md:items-end gap-4 min-w-fit">
                  <a 
                    href="https://partiful.com/e/skKm5mMoFjCMq0d0zylT"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block transition-transform hover:scale-110 active:scale-95"
                  >
                    <div className="bg-white text-black border-4 border-black p-6 brutal-shadow flex flex-col items-center rotate-3 hover:rotate-0 transition-transform cursor-pointer">
                      <Calendar className="w-10 h-10 mb-2" />
                      <span className="text-3xl font-display font-black leading-none">MAY 30</span>
                      <span className="text-sm font-black uppercase tracking-widest mt-1">NYC LAUNCH</span>
                    </div>
                  </a>
                  <a 
                    href="https://partiful.com/e/skKm5mMoFjCMq0d0zylT"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-black text-white text-xl font-black uppercase py-4 px-8 border-4 border-black brutal-shadow transition-transform hover:scale-105 active:scale-95 text-center inline-block"
                  >
                    RSVP ON PARTIFUL
                  </a>
                </div>
              </div>
            </BrutalCard>
          </section>
        </main>

        {/* Status Bar */}
        <footer className="flex flex-col md:flex-row justify-between items-center text-xs font-black uppercase tracking-widest border-t-[6px] border-border-primary pt-8 gap-4">
          <div className="flex gap-4">
            <span>Asian Networking NYC #042</span>
            <span className="opacity-50">|</span>
            <span>Happy Hour Mixer</span>
          </div>
          <motion.span 
            key={participants}
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="bg-text-primary text-bg-primary px-6 py-2 rounded-full brutal-shadow flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-brand-mint animate-pulse" />
            {participants} Users Active
          </motion.span>
          <div className="flex gap-8 opacity-80">
            <span>Server: US-W-01</span>
            <span>Latency: 42ms</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

