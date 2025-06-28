import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';

interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  delay?: number;
  side?: 'top' | 'right' | 'bottom' | 'left';
  theme?: 'light' | 'dark';
}

const Tooltip: React.FC<TooltipProps> = ({ 
  children, 
  content, 
  delay = 200,
  side = 'top',
  theme = 'light'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    const id = setTimeout(() => setIsVisible(true), delay);
    setTimeoutId(id);
  };

  const handleMouseLeave = () => {
    if (timeoutId) clearTimeout(timeoutId);
    setIsVisible(false);
  };

  const getPositionClasses = () => {
    switch (side) {
      case 'top': return 'bottom-full left-1/2 transform -translate-x-1/2 mb-2';
      case 'right': return 'left-full top-1/2 transform -translate-y-1/2 ml-2';
      case 'bottom': return 'top-full left-1/2 transform -translate-x-1/2 mt-2';
      case 'left': return 'right-full top-1/2 transform -translate-y-1/2 mr-2';
      default: return 'bottom-full mb-2';
    }
  };

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: side === 'bottom' ? -5 : 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: side === 'bottom' ? -5 : 5 }}
            transition={{ duration: 0.15 }}
            className={`absolute z-50 ${getPositionClasses()}`}
          >
            <div className={`px-3 py-2 rounded-md text-sm shadow-lg ${
              theme === 'dark'
                ? 'bg-gray-700 text-gray-100'
                : 'bg-white text-gray-800 border border-gray-200'
            }`}>
              {content}
              <div className={`absolute w-2 h-2 transform rotate-45 ${
                theme === 'dark' ? 'bg-gray-700' : 'bg-white border border-gray-200'
              }`} style={{
                [side]: '-4px',
                left: side === 'left' || side === 'right' ? '50%' : 'auto',
                top: side === 'top' || side === 'bottom' ? '50%' : 'auto',
                ...(side === 'top' && { bottom: '0', left: '50%', transform: 'translateX(-50%) rotate(45deg)' }),
                ...(side === 'right' && { left: '0', top: '50%', transform: 'translateY(-50%) rotate(45deg)' }),
                ...(side === 'bottom' && { top: '0', left: '50%', transform: 'translateX(-50%) rotate(45deg)' }),
                ...(side === 'left' && { right: '0', top: '50%', transform: 'translateY(-50%) rotate(45deg)' })
              }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tooltip;