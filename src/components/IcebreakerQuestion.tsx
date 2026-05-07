import React from 'react';
import { Quote } from 'lucide-react';
import { motion } from 'motion/react';

const ICEBREAKERS = [
  "Is this your first event?",
  "How did you find out about the event?",
  "Any goals for this year, or cool side projects you're working on?",
  "Recommend your favorite NY spot or a recent restaurant you went to that you liked",
  "Any fun vacation plans coming up?",
  "What do you wish you knew earlier in your career?",
  "What can someone help you with in 2026?"
];

export function IcebreakerQuestion() {
  const [index, setIndex] = React.useState(0);
  
  const cycleQuestion = () => setIndex((prev) => (prev + 1) % ICEBREAKERS.length);

  return (
    <div className="flex flex-col gap-6" id="icebreaker-container">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-lime border-4 border-border-primary flex items-center justify-center text-black brutal-shadow">
            <Quote size={20} fill="currentColor" />
          </div>
          <h2 className="font-display text-2xl font-black tracking-tight uppercase">Networking Block</h2>
        </div>
        <button 
          onClick={cycleQuestion}
          className="font-black text-[10px] uppercase tracking-widest text-text-primary bg-bg-primary border-2 border-border-primary px-4 py-1 rounded-full hover:bg-text-primary hover:text-bg-primary transition-colors"
          id="refresh-icebreaker"
        >
          Shuffle Prompt
        </button>
      </div>

      <motion.div 
        key={index}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="min-h-[180px] flex flex-col justify-center p-10 brutal-border-6 bg-bg-primary rounded-[40px] brutal-shadow-lg"
      >
        <p className="text-xs font-black uppercase tracking-[0.2em] mb-4 text-brand-orange">Current Icebreaker Challenge</p>
        <p className="text-4xl font-black leading-tight italic text-text-primary" id="icebreaker-text">
          "{ICEBREAKERS[index]}"
        </p>
      </motion.div>

      <div className="flex gap-4">
        {ICEBREAKERS.map((_, i) => (
          <div key={i} className={`h-3 flex-1 brutal-border-4 rounded-full ${i === index ? 'bg-brand-orange' : 'bg-bg-primary'}`}></div>
        ))}
      </div>
    </div>
  );
}
