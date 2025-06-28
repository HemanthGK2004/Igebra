import { motion } from 'framer-motion';
import React from 'react';

interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  theme?: 'light' | 'dark';
  className?: string;
}

const Slider: React.FC<SliderProps> = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  theme = 'light',
  className = ''
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={`relative h-6 ${className}`}>
      {/* Track */}
      <div className={`absolute h-1.5 w-full rounded-full top-1/2 transform -translate-y-1/2 ${
        theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'
      }`} />
      
      {/* Filled track */}
      <motion.div 
        className={`absolute h-1.5 rounded-full top-1/2 transform -translate-y-1/2 ${
          theme === 'dark' ? 'bg-purple-400' : 'bg-purple-500'
        }`}
        style={{ width: `${percentage}%` }}
        initial={{ width: '0%' }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.2 }}
      />
      
      {/* Thumb */}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        className={`absolute w-full h-full opacity-0 cursor-pointer`}
      />
      <motion.div
        className={`absolute w-5 h-5 rounded-full border-2 top-1/2 transform -translate-y-1/2 ${
          theme === 'dark' 
            ? 'bg-gray-800 border-purple-400' 
            : 'bg-white border-purple-500'
        }`}
        style={{ left: `${percentage}%`, transform: 'translate(-50%, -50%)' }}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
      />
      
      {/* Value indicator */}
      <div 
        className={`absolute text-xs font-medium ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
        }`}
        style={{ left: `${percentage}%`, top: '100%', transform: 'translateX(-50%)' }}
      >
        {value}
      </div>
    </div>
  );
};

export default Slider;