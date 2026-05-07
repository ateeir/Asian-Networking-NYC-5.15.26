import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { NetworkTimer } from './components/NetworkTimer';
import { IcebreakerQuestion } from './components/IcebreakerQuestion';
import { BreakoutGrid } from './components/BreakoutGrid';
import { NotificationTicker } from './components/NotificationSystem';
import { Activity, Signal, Users, Moon, Sun } from 'lucide-react';
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
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b-[6px] border-border-primary" id="main-header">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-3 bg-text-primary text-bg-primary border-4 border-border-primary brutal-shadow transition-transform active:scale-95"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
              </button>
            </div>
            <h1 className="text-6xl md:text-9xl font-display font-black tracking-tighter leading-[0.8] uppercase italic drop-shadow-[4px_4px_0px_white] dark:drop-shadow-[4px_4px_0px_rgba(255,214,10,0.5)] border-8 border-border-primary bg-text-primary text-bg-primary px-6 py-2 brutal-shadow">
              Asian<span className="text-brand-orange">Networking.</span>
            </h1>
          </div>
          
          <div className="flex flex-col items-start md:items-end gap-1 font-black text-[12px] uppercase tracking-widest text-text-primary">
            <div className="flex items-center gap-2 bg-bg-primary border-4 border-border-primary px-4 py-1 rounded-full brutal-shadow">
              <Signal size={14} className="text-brand-orange" />
              <span>Event: 5.15 Happy Hour NYC</span>
            </div>
            <div className="flex items-center justify-between w-full mt-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-brand-orange animate-pulse border-2 border-border-primary" />
                <span>Room: Alpha-One</span>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <Users size={14} />
                <span>{participants - 300} Ready</span>
              </div>
            </div>
          </div>
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
        </main>

        {/* Status Bar */}
        <footer className="flex flex-col md:flex-row justify-between items-center text-xs font-black uppercase tracking-widest border-t-[6px] border-border-primary pt-8 gap-4">
          <div className="flex gap-4">
            <span>Asian Networking NYC #042</span>
            <span className="opacity-30">|</span>
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
          <div className="flex gap-8 opacity-60">
            <span>Server: US-W-01</span>
            <span>Latency: 42ms</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

