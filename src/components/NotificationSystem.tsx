import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle } from 'lucide-react';

export function NotificationTicker() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const notifications = [
    "🔥 SPECIAL GUEST: Tech Lead from Google just joined the 'Experience' zone!",
    "📱 Follow us on Instagram @asian.networking.nyc for event highlights!",
    "🤝 Join our professional community on LinkedIn! Search 'Asian Networking NYC'.",
    "🍹 Event Special: $10 Yuzu Spritz (Yuzu Citrus, Simple, Sparkling) available all night!",
    "📸 Tag us in your stories @asian.networking.nyc for a chance to be featured!"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % notifications.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [notifications.length]);

  return (
    <div className="bg-text-primary text-bg-primary py-3 overflow-hidden border-y-4 border-border-primary group relative transition-colors duration-500" id="notification-ticker">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          className="flex items-center justify-center gap-4 px-4 font-black uppercase text-xs tracking-[0.2em]"
        >
          <AlertTriangle size={16} className="text-brand-orange animate-bounce" />
          <span>{notifications[currentIndex]}</span>
          <AlertTriangle size={16} className="text-brand-orange animate-bounce" />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
