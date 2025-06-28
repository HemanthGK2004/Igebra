import { AnimatePresence, motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import React from 'react';

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  theme, 
  toggleTheme,
  className = ''
}) => {
  return (
    <motion.button
      onClick={toggleTheme}
      className={`relative p-2 rounded-full ${
        theme === 'light' 
          ? 'bg-gray-200 hover:bg-gray-300' 
          : 'bg-gray-700 hover:bg-gray-600'
      } transition-colors duration-300 ${className}`}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          initial={{ opacity: 0, rotate: -30 }}
          animate={{ opacity: 1, rotate: 0 }}
          exit={{ opacity: 0, rotate: 30 }}
          transition={{ duration: 0.2 }}
          className="flex items-center justify-center"
        >
          {theme === 'light' ? (
            <Moon 
              size={20} 
              className="text-gray-700" 
              strokeWidth={1.5}
            />
          ) : (
            <Sun 
              size={20} 
              className="text-yellow-300" 
              strokeWidth={1.5}
            />
          )}
        </motion.div>
      </AnimatePresence>
      
      {/* Tooltip */}
      <motion.div
        className={`absolute top-full mt-2 px-2 py-1 text-xs rounded ${
          theme === 'light' 
            ? 'bg-gray-800 text-white' 
            : 'bg-gray-100 text-gray-800'
        } whitespace-nowrap pointer-events-none`}
        initial={{ opacity: 0, y: -5 }}
        whileHover={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;