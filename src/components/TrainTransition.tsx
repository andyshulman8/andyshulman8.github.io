import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Train } from 'lucide-react';

const lineColors: Record<string, string> = {
  red: '#E53935',
  blue: '#1E88E5',
  purple: '#8E24AA',
  green: '#43A047'
};

export default function TrainTransition({ isActive, lineColor = 'blue', direction = 'right' }: { isActive: boolean; lineColor?: string; direction?: 'right' | 'left' }) {
  const color = lineColors[lineColor] || lineColor;
  
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Dark overlay */}
          <motion.div 
            className="absolute inset-0 bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.95 }}
            exit={{ opacity: 0 }}
          />
          
          {/* Speeding lines */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-1 rounded-full"
                style={{
                  background: `linear-gradient(${direction === 'right' ? '90deg' : '270deg'}, transparent, ${color}, transparent)`,
                  top: `${5 + i * 5}%`,
                  width: '30%',
                  left: direction === 'right' ? '-30%' : '100%'
                }}
                initial={{ x: 0, opacity: 0 }}
                animate={{ 
                  x: direction === 'right' ? '500%' : '-500%',
                  opacity: [0, 1, 1, 0]
                }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.02,
                  ease: 'linear'
                }}
              />
            ))}
          </div>
          
          {/* Center train icon */}
          <motion.div
            className="relative z-10 flex flex-col items-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.2, opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              animate={{ 
                x: [0, -5, 5, -5, 5, 0],
              }}
              transition={{ 
                duration: 0.5, 
                repeat: Infinity,
                ease: 'linear'
              }}
            >
              <Train 
                size={64} 
                style={{ color }} 
                strokeWidth={1.5}
              />
            </motion.div>
            <motion.div
              className="mt-4 text-white text-lg font-light tracking-widest"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              NEXT STOP
            </motion.div>
          </motion.div>
          
          {/* Subway line indicator at bottom */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-2"
            style={{ backgroundColor: color }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0 }}
            transition={{ duration: 0.6 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
