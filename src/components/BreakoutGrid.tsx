import React from 'react';
import { BrutalCard } from './BrutalCard';
import { Users, Globe, Smile, Zap, MapPin, Heart } from 'lucide-react';
import { motion } from 'motion/react';

import { BREAKOUT_THEMES, getSessionMinutes } from '../constants';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const COLOR_MAP: Record<string, string> = {
  'brand-yellow': 'bg-brand-yellow',
  'brand-orange': 'bg-brand-orange',
  'brand-mint': 'bg-brand-mint',
  'brand-blue': 'bg-brand-blue',
  'brand-lime': 'bg-brand-lime',
  'brand-coral': 'bg-brand-coral',
  'white': 'bg-white',
  'brand-pink': 'bg-brand-pink',
};

export function BreakoutGrid() {
  const [expandedTheme, setExpandedTheme] = React.useState<string | null>(null);
  const [isHostMode, setIsHostMode] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(() => {
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes();
  });

  // Update time every minute
  React.useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.getHours() * 60 + now.getMinutes());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col gap-8" id="breakout-grid-container">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="font-display text-5xl font-black tracking-tighter uppercase italic text-brand-orange">Breakout Zones</h2>
          <div className="flex items-center gap-3">
            <p className="text-text-primary opacity-60 font-black text-sm tracking-wide uppercase">
              Interact with the community hubs below
            </p>
            <div 
              onClick={() => setIsHostMode(prev => !prev)}
              className={`flex items-center gap-2 px-3 py-1 ${isHostMode ? 'bg-brand-orange text-black' : 'bg-text-primary text-bg-primary'} rounded-full text-[10px] font-black uppercase brutal-shadow-sm cursor-pointer hover:scale-105 transition-transform active:scale-95`}
              title="Toggle Host Mode"
            >
              <span className={`w-2 h-2 ${isHostMode ? 'bg-black' : 'bg-green-400'} rounded-full animate-pulse`} />
              {isHostMode ? 'Host Override Active' : 'Live Sync Active'}
            </div>
          </div>
        </div>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-10"
      >
        {BREAKOUT_THEMES.map((theme) => {
          const isExpanded = expandedTheme === theme.id;
          const sessionMinutes = getSessionMinutes(theme.tag);
          
          // Refined Robust Logic:
          // 1. isStarted: Has the session's clock struck the scheduled time?
          // 2. isCurrent: Is it currently within its 15-minute primary window?
          // 3. isLocked: Should we hide info/details? Only if it hasn't started yet (unless in Host Mode).
          const isStarted = currentTime >= sessionMinutes;
          const isCurrent = isStarted && (currentTime < (sessionMinutes + 15));
          const isFinished = isStarted && !isCurrent;
          const isLocked = !isHostMode && !isStarted;
          
          return (
            <motion.div variants={item} key={theme.id} className="h-full relative group">
              {isCurrent && (
                <motion.div 
                  initial={{ scale: 0, rotate: -30, opacity: 0 }}
                  animate={{ 
                    scale: [1, 1.05, 1],
                    rotate: [8, 10, 8],
                    opacity: 1,
                    filter: [
                      'drop-shadow(0 0 0px rgba(255, 120, 0, 0))',
                      'drop-shadow(0 0 20px rgba(255, 120, 0, 0.4))',
                      'drop-shadow(0 0 0px rgba(255, 120, 0, 0))'
                    ]
                  }}
                  transition={{ 
                    opacity: { duration: 0.3, delay: 0.2 },
                    scale: { repeat: Infinity, duration: 2, ease: "easeInOut" },
                    rotate: { repeat: Infinity, duration: 3, ease: "easeInOut" },
                    filter: { repeat: Infinity, duration: 2, ease: "easeInOut" }
                  }}
                  className="absolute -top-8 -right-8 z-50 bg-brand-orange text-white px-8 py-3 border-[6px] border-black font-black text-xl uppercase tracking-[0.1em] brutal-shadow-lg flex items-center gap-3 select-none pointer-events-none whitespace-nowrap"
                >
                  <Zap size={24} fill="white" className="animate-pulse" />
                  <span className="drop-shadow-md">LIVE NOW</span>
                </motion.div>
              )}
              
              <BrutalCard 
                className={`${COLOR_MAP[theme.color] || 'bg-bg-primary'} ${theme.textColor} h-full !p-0 relative transition-all duration-500 !brutal-shadow-lg !brutal-border-6
                  ${isLocked ? 'grayscale opacity-30 blur-[4px] cursor-not-allowed' : 'cursor-default'} 
                  ${isCurrent ? 'ring-8 ring-border-primary ring-offset-4 scale-[1.02] z-10' : ''} 
                  ${isFinished ? 'opacity-90 saturate-[0.8]' : ''}`} 
                id={`theme-card-${theme.id}`}
              >
                <div className="flex flex-col h-full min-h-[460px]">



                  <div className={`inline-block ${isCurrent ? 'bg-brand-orange text-white animate-bounce' : isLocked ? 'bg-text-primary/20 text-text-primary/40' : 'bg-black text-white'} px-4 py-2 border-4 border-black font-black text-xs uppercase tracking-[0.2em] self-start mb-6 -rotate-1 brutal-shadow-sm rounded-xl transition-colors`}>
                    {theme.tag}
                  </div>

                  <div className="flex justify-between items-start mb-6">
                    <div className="w-14 h-14 bg-bg-primary text-text-primary border-4 border-border-primary rounded-full flex items-center justify-center brutal-shadow text-3xl shrink-0">
                      {isLocked ? '🔒' : theme.icon}
                    </div>
                    {!isLocked && (
                      <button 
                        onClick={() => setExpandedTheme(isExpanded ? null : theme.id)}
                        className="bg-black text-white p-2 rounded-xl border-4 border-black hover:bg-white hover:text-black transition-all brutal-shadow shrink-0 font-black text-xs"
                      >
                        {isExpanded ? 'CLOSE' : 'INFO'}
                      </button>
                    )}
                  </div>
                  
                  <h3 className="text-3xl font-black uppercase mb-2 tracking-tight">
                    {isLocked ? '???' : theme.title}
                  </h3>
                  
                  <motion.div
                    animate={{ opacity: 1 }}
                    className="flex-1 flex flex-col"
                  >
                    {isLocked ? (
                      <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
                        <p className="font-black uppercase text-sm opacity-50 mb-2">Unlocks at</p>
                        <p className="text-4xl font-black italic">{theme.tag.split(' ')[0]} {theme.tag.split(' ')[1]}</p>
                      </div>
                    ) : (
                      <>
                        {isExpanded ? (
                          <div className="flex flex-col gap-6">
                            <p className={`text-lg font-bold leading-tight bg-black/10 p-4 border-4 border-black rounded-2xl italic ${theme.textColor}`}>
                              "{theme.details}"
                            </p>
                            <div>
                              <p className="text-[10px] font-black uppercase mb-2 opacity-50 tracking-widest">Pop-up Sub-topics:</p>
                              <div className="flex flex-wrap gap-2">
                                {theme.subtopics.map((s, i) => (
                                  <span 
                                    key={i} 
                                    className="bg-bg-primary text-text-primary border-2 border-border-primary px-3 py-1 rounded-full text-[10px] font-black uppercase brutal-shadow-sm whitespace-nowrap"
                                  >
                                    {s}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <>
                            <p className="text-lg font-bold leading-tight opacity-70 mb-6">{theme.description}</p>
                            
                            <div className="mt-auto flex flex-col gap-6">
                              {theme.groups.length > 0 ? (
                                <div className="grid grid-cols-2 gap-2">
                                  {theme.groups.map((group, i) => {
                                    const isLinkedIn = group === 'LinkedIn Group';
                                    const isEmojiMatch = group === 'Emoji Match';
                                    const isClickable = isLinkedIn || isEmojiMatch;
                                    
                                    const content = (
                                      <motion.div 
                                        key={i} 
                                        whileHover={isClickable ? { scale: 1.08, rotate: isLinkedIn ? -2 : 2, zIndex: 20 } : {}}
                                        whileTap={isClickable ? { scale: 0.92 } : {}}
                                        animate={isClickable ? { 
                                          y: [0, -4, 0],
                                        } : {}}
                                        transition={isClickable ? { 
                                          y: { repeat: Infinity, duration: 2, ease: "easeInOut" },
                                          scale: { type: "spring", stiffness: 400, damping: 10 }
                                        } : {}}
                                        className={`px-1 py-2 text-[9px] font-black text-center border-4 border-black bg-white text-black hover:bg-black hover:text-white transition-colors cursor-pointer rounded-xl uppercase tracking-tighter leading-[1] min-h-[44px] flex items-center justify-center brutal-shadow-sm ${isLinkedIn ? 'border-brand-blue ring-2 ring-brand-blue/20' : isEmojiMatch ? 'border-brand-orange ring-2 ring-brand-orange/20' : ''}`}
                                        title={group}
                                      >
                                        <span>{group}</span>
                                      </motion.div>
                                    );

                                    if (isLinkedIn) {
                                      return (
                                        <a 
                                          key={i}
                                          href="https://www.linkedin.com/groups/14650111/"
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="block no-underline"
                                        >
                                          {content}
                                        </a>
                                      );
                                    }

                                    if (isEmojiMatch) {
                                      return (
                                        <a 
                                          key={i}
                                          href="https://emoji-v2-reveal.vercel.app/"
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="block no-underline"
                                        >
                                          {content}
                                        </a>
                                      );
                                    }

                                    return content;
                                  })}
                                </div>
                              ) : (
                                <div className="flex items-center justify-center py-6 border-4 border-border-primary border-dashed rounded-2xl bg-bg-primary/20">
                                  <p className="text-[10px] font-black uppercase opacity-60">No breakout groups</p>
                                </div>
                              )}
                            </div>
                          </>
                        )}
                      </>
                    )}
                  </motion.div>
                </div>
              </BrutalCard>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
