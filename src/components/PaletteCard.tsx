import { AnimatePresence, motion } from 'framer-motion';
import { Palette, RefreshCw, Sparkles } from 'lucide-react';
import React, { useState } from 'react';
import { PaletteType } from '../types/palette';
import ColorBlock from './ColorBlock';
import ExportButton from './ExportButton';

interface PaletteCardProps {
  palette: PaletteType;
  onRegenerate: () => void;
  isGenerating?: boolean;
  theme?: 'light' | 'dark';
}

const PaletteCard: React.FC<PaletteCardProps> = ({ 
  palette, 
  onRegenerate, 
  isGenerating = false,
  theme = 'light'
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`rounded-xl shadow-lg transition-all duration-500 ${
        theme === 'dark' 
          ? 'bg-gray-800/90 shadow-gray-900/20' 
          : 'bg-white shadow-gray-200/50'
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="p-6">
        <div className="flex flex-col items-start justify-between gap-4 mb-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${
              theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
            }`}>
              <Palette className={
                theme === 'dark' ? 'text-purple-300' : 'text-purple-600'
              } size={20} />
            </div>
            <h2 className={`text-xl font-semibold ${
              theme === 'dark' ? 'text-gray-100' : 'text-gray-800'
            }`}>
              Color Palette
            </h2>
          </div>

          <motion.button
            onClick={onRegenerate}
            disabled={isGenerating}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
              theme === 'dark'
                ? 'bg-purple-600 hover:bg-purple-700 text-white'
                : 'bg-purple-500 hover:bg-purple-600 text-white'
            } ${
              isGenerating ? 'opacity-70 cursor-not-allowed' : ''
            }`}
            whileHover={!isGenerating ? { scale: 1.05 } : {}}
            whileTap={!isGenerating ? { scale: 0.95 } : {}}
          >
            {isGenerating ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <RefreshCw size={16} />
              </motion.div>
            ) : (
              <>
                <Sparkles size={16} />
                <span>Regenerate</span>
              </>
            )}
          </motion.button>
        </div>

        <AnimatePresence>
          {palette.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-2 gap-3 mb-8 md:grid-cols-5">
                {palette.map((color, index) => (
                  <ColorBlock 
                    key={index} 
                    color={color} 
                    index={index}
                    theme={theme}
                  />
                ))}
              </div>

              <motion.div 
                className="flex flex-wrap gap-3"
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
              >
                <ExportButton 
                  palette={palette} 
                  format="json"
                  theme={theme}
                />
                <ExportButton 
                  palette={palette} 
                  format="css"
                  theme={theme}
                />

                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className={`text-xs flex items-center px-3 py-1 rounded-full ${
                        theme === 'dark' 
                          ? 'bg-gray-700 text-gray-300' 
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      Export your palette for use in projects
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              className={`flex flex-col items-center justify-center h-64 rounded-lg gap-3 ${
                theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-100'
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Palette className={
                theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
              } size={32} />
              <p className={
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }>
                Generate a palette to get started
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default PaletteCard;