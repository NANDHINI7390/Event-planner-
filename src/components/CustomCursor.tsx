import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';
import { useApp } from '../context/AppContext';

export const CustomCursor: React.FC = () => {
  const { cursorText, cursorVariant } = useApp();
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs
  const springX = useSpring(mouseX, { damping: 28, stiffness: 250 });
  const springY = useSpring(mouseY, { damping: 28, stiffness: 250 });

  useEffect(() => {
    // Detect touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible, mouseX, mouseY]);

  if (isTouch || !isVisible) return null;

  const isExpanded = cursorVariant !== 'default' || cursorText.length > 0;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Primary smooth follower */}
      <motion.div
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isExpanded ? 1.4 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
        className="flex items-center justify-center pointer-events-none"
      >
        {isExpanded ? (
          <div className="backdrop-blur-md bg-[#0C1929]/90 text-white border border-[#C5A059]/50 px-3.5 py-1.5 rounded-full text-[11px] font-medium tracking-wider uppercase shadow-xl flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-ping" />
            <span>{cursorText || cursorVariant}</span>
          </div>
        ) : (
          <div className="w-5 h-5 rounded-full border border-[#C5A059]/60 bg-[#C5A059]/10 transition-transform duration-150 flex items-center justify-center">
            <div className="w-1 h-1 rounded-full bg-[#C5A059]" />
          </div>
        )}
      </motion.div>
    </div>
  );
};
