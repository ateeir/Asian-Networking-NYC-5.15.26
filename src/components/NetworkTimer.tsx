import React, { useState, useEffect } from 'react';
import { Timer, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';

export function NetworkTimer() {
  const INITIAL_TIME = 15 * 60; // 15 minutes in seconds
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: number | undefined;

    if (isActive && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (timeLeft / INITIAL_TIME) * 100;

  return (
    <div className="flex flex-col gap-6" id="network-timer-container">
      <div className="flex items-center justify-between font-black text-xs uppercase tracking-widest text-text-primary opacity-80">
        <div className="flex items-center gap-2">
          <Timer size={16} className={isActive ? 'text-brand-orange animate-pulse' : ''} />
          <span>Timer Status</span>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsActive(!isActive)}
            className={`transition-colors hover:bg-text-primary hover:text-bg-primary px-3 py-1 border-2 border-border-primary rounded-full ${isActive ? 'bg-brand-blue text-black' : 'bg-bg-primary text-text-primary'}`}
            id="timer-toggle"
          >
            {isActive ? 'PAUSE' : 'START'}
          </button>
          <button 
            onClick={() => { setTimeLeft(INITIAL_TIME); setIsActive(false); }}
            className="hover:text-brand-orange bg-bg-primary text-text-primary border-2 border-border-primary p-1 rounded-full"
            id="timer-reset"
          >
            <RefreshCw size={14} />
          </button>
        </div>
      </div>

      <div className="relative flex justify-center">
        <div className="w-48 h-48 rounded-full bg-brand-orange brutal-border-6 flex flex-col items-center justify-center brutal-shadow-lg relative overflow-hidden group">
          {/* Progress fill */}
          <motion.div 
            className="absolute bottom-0 left-0 right-0 bg-black/10 z-0"
            initial={{ height: '0%' }}
            animate={{ height: `${100 - progress}%` }}
            transition={{ duration: 1, ease: 'linear' }}
          />

          <span className="text-xs font-black text-black uppercase mb-1 tracking-widest z-10">Remaining</span>
          <span className="text-6xl font-black text-black leading-none z-10" id="timer-display">
            {formatTime(timeLeft).split(':')[0]}
          </span>
          <span className="text-xl font-black text-black leading-none z-10">
            :{formatTime(timeLeft).split(':')[1]}
          </span>
          <span className="text-xs font-black text-black uppercase mt-1 tracking-widest z-10">Minutes</span>
        </div>
        
        {isActive && (
          <div className="absolute -top-4 -right-4 bg-bg-primary border-4 border-border-primary px-4 py-2 rotate-12 rounded-xl brutal-shadow z-20">
            <p className="font-black text-lg uppercase text-text-primary">Live</p>
          </div>
        )}
      </div>
    </div>
  );
}
