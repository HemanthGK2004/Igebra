import { AnimatePresence, motion } from 'framer-motion';
import {
    CircleDashed,
    Contrast,
    Droplets,
    Gauge,
    Info,
    Palette,
    Square,
    Triangle
} from 'lucide-react';
import React, { useState } from 'react';
import Tooltip from "../ui/Tooltip" // Assume you have a Tooltip component
  
  type HarmonyType = 
    | 'analogous'
    | 'complementary'
    | 'triadic'
    | 'monochromatic'
    | 'splitComplementary'
    | 'tetradic'
    | 'square'
    | 'achromatic';
  
  interface HarmonySelectorProps {
    currentHarmony: HarmonyType;
    onSelectHarmony: (harmony: HarmonyType) => void;
    theme?: 'light' | 'dark';
    className?: string;
  }
  
  const harmonyOptions = [
    { 
      value: 'analogous', 
      label: 'Analogous', 
      icon: <Droplets size={18} />,
      description: 'Colors adjacent on the color wheel (30° apart)'
    },
    { 
      value: 'complementary', 
      label: 'Complementary', 
      icon: <Contrast size={18} />,
      description: 'Colors opposite each other (180° apart)'
    },
    { 
      value: 'triadic', 
      label: 'Triadic', 
      icon: <Triangle size={18} />,
      description: 'Three colors evenly spaced (120° apart)'
    },
    { 
      value: 'square', 
      label: 'Square', 
      icon: <Square size={18} />,
      description: 'Four colors evenly spaced (90° apart)'
    },
    { 
      value: 'tetradic', 
      label: 'Tetradic', 
      icon: <Gauge size={18} />,
      description: 'Two complementary pairs (rectangle)'
    },
    { 
      value: 'splitComplementary', 
      label: 'Split Comp', 
      icon: <CircleDashed size={18} />,
      description: 'Base color plus two adjacent to its complement'
    },
    { 
      value: 'monochromatic', 
      label: 'Monochromatic', 
      icon: <Palette size={18} />,
      description: 'Variations of a single hue'
    },
    { 
      value: 'achromatic', 
      label: 'Achromatic', 
      icon: <CircleDashed size={18} />,
      description: 'Black, white and grays'
    }
  ];
  
  const HarmonySelector: React.FC<HarmonySelectorProps> = ({ 
    currentHarmony, 
    onSelectHarmony,
    theme = 'light',
    className = ''
  }) => {
    const [expandedHelp, setExpandedHelp] = useState<string | null>(null);
  
    return (
      <div className={`rounded-xl shadow-sm transition-all duration-300 ${
        theme === 'dark' 
          ? 'bg-gray-800/90 border-gray-700' 
          : 'bg-white/90 border-gray-200'
      } border ${className}`}>
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className={`text-lg font-semibold ${
              theme === 'dark' ? 'text-gray-100' : 'text-gray-800'
            }`}>
              Color Harmony
            </h3>
            <Tooltip content="Learn about color harmonies">
              <button 
                className={`p-1 rounded-full ${
                  theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Info size={16} />
              </button>
            </Tooltip>
          </div>
  
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {harmonyOptions.map((option) => (
              <div key={option.value} className="relative">
                <motion.button
                  onClick={() => onSelectHarmony(option.value as HarmonyType)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full flex flex-col items-center p-2 rounded-lg transition-all ${
                    currentHarmony === option.value
                      ? theme === 'dark'
                        ? 'bg-purple-600/90 text-white'
                        : 'bg-purple-500/90 text-white'
                      : theme === 'dark'
                        ? 'bg-gray-700/50 hover:bg-gray-700'
                        : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                  onMouseEnter={() => setExpandedHelp(option.value)}
                  onMouseLeave={() => setExpandedHelp(null)}
                >
                  <div className={`p-2 rounded-full ${
                    theme === 'dark' 
                      ? currentHarmony === option.value 
                        ? 'bg-purple-500/30' 
                        : 'bg-gray-600/50'
                      : currentHarmony === option.value
                        ? 'bg-purple-400/30'
                        : 'bg-gray-200'
                  }`}>
                    {option.icon}
                  </div>
                  <span className="mt-1 text-sm font-medium">{option.label}</span>
                </motion.button>
  
                <AnimatePresence>
                  {expandedHelp === option.value && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      transition={{ duration: 0.2 }}
                      className={`absolute z-10 p-2 mt-1 text-xs rounded-md shadow-lg ${
                        theme === 'dark' 
                          ? 'bg-gray-700 text-gray-200' 
                          : 'bg-white text-gray-700 border border-gray-200'
                      }`}
                    >
                      {option.description}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
  
        {/* Visual representation of harmony type */}
        <div className={`p-4 border-t ${
          theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <h4 className={`mb-2 text-sm font-medium ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {harmonyOptions.find(o => o.value === currentHarmony)?.label} Harmony
          </h4>
          <div className="flex justify-center">
            <div className={`w-32 h-4 rounded-full ${
              theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
            }`}>
              {/* This would be replaced with an actual visual representation */}
              <div className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default HarmonySelector;