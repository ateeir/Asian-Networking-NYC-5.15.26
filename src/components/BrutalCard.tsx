import React from 'react';
import { motion } from 'motion/react';

interface BrutalCardProps {
  children: React.ReactNode;
  className?: string;
  label?: string;
  id?: string;
}

export function BrutalCard({ children, className = '', label, id }: BrutalCardProps) {
  return (
    <motion.div 
      whileHover={{ scale: 1.01, x: -4, y: -4 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className={`relative brutal-border-5 brutal-shadow bg-bg-primary rounded-[32px] overflow-hidden ${className}`} 
      id={id || `card-${label?.toLowerCase().replace(/\s+/g, '-') || 'generic'}`}
    >
      {label && (
        <div className="absolute top-4 right-6 px-3 py-1 text-[10px] uppercase font-black tracking-widest text-text-primary bg-bg-primary border-2 border-border-primary rounded-full z-10">
          {label}
        </div>
      )}
      <div className="p-8 h-full">
        {children}
      </div>
    </motion.div>
  );
}
