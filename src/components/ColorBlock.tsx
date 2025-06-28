import { AnimatePresence, motion } from 'framer-motion';
import { Check, Copy, Palette } from 'lucide-react';
import React, { useState } from 'react';

interface ColorBlockProps {
  color: string;
  index?: number;
  theme?: 'light' | 'dark';
  onColorChange?: (newColor: string) => void;
}

const ColorBlock: React.FC<ColorBlockProps> = ({ 
  color, 
  index, 
  theme = 'light',
  onColorChange
}) => {
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [tempColor, setTempColor] = useState(color);

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(color);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const handleColorPick = () => {
    if (onColorChange) {
      setShowColorPicker(true);
    } else {
      handleCopyToClipboard();
    }
  };

  const getContrastingTextColor = (hexColor: string) => {
    if (!hexColor || hexColor.length < 6) return '#000000';
    
    const hex = hexColor.replace('#', '');
    const r = parseInt(hex.length === 3 ? hex[0] + hex[0] : hex.substring(0, 2), 16);
    const g = parseInt(hex.length === 3 ? hex[1] + hex[1] : hex.substring(2, 4), 16);
    const b = parseInt(hex.length === 3 ? hex[2] + hex[2] : hex.substring(4, 6), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? '#000000' : '#FFFFFF';
  };

  const textColor = getContrastingTextColor(color);
  const isLightText = textColor === '#FFFFFF';

  return (
    <motion.div 
      className="flex flex-col rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl group h-full min-h-[200px]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: (index || 0) * 0.05 }}
      whileHover={{ scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div 
        className="relative flex items-center justify-center flex-1 cursor-pointer"
        style={{ backgroundColor: color }}
        onClick={handleColorPick}
      >
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ backgroundColor: 'rgba(0,0,0,0)' }}
          animate={{ 
            backgroundColor: isHovered ? 
              (isLightText ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)') : 
              'rgba(0,0,0,0)' 
          }}
          transition={{ duration: 0.2 }}
        >
          <AnimatePresence>
            {isHovered && (
              <motion.div
                className="absolute top-2 right-2"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {onColorChange && (
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowColorPicker(true);
                    }}
                    className={`p-1.5 rounded-full ${
                      isLightText 
                        ? 'bg-black/20 hover:bg-black/30 text-white' 
                        : 'bg-white/20 hover:bg-white/30 text-black'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    title="Change color"
                  >
                    <Palette size={16} />
                  </motion.button>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            className={`flex items-center gap-1 px-3 py-2 rounded-lg ${
              isLightText ? 'bg-black/80 text-white' : 'bg-white/90 text-gray-800'
            }`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ 
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 10
            }}
            transition={{ duration: 0.2 }}
          >
            {copied ? (
              <>
                <Check size={14} className="shrink-0" />
                <span className="text-sm font-medium">Copied!</span>
              </>
            ) : (
              <>
                <Copy size={14} className="shrink-0" />
                <span className="text-sm font-medium">Copy HEX</span>
              </>
            )}
          </motion.div>
        </motion.div>

        {index !== undefined && (
          <div 
            className={`absolute top-3 left-3 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
              isLightText ? 'text-white bg-black/30' : 'text-black bg-white/30'
            }`}
          >
            {index + 1}
          </div>
        )}
      </div>

      <div 
        className={`py-3 px-4 flex items-center justify-between transition-colors duration-300 ${
          isLightText ? 'bg-black/90 text-white' : 'bg-white/90 text-gray-900'
        }`}
      >
        <div className="flex items-center gap-2">
          <Palette size={14} className="opacity-70" />
          <span className="font-mono text-sm font-medium tracking-tight">
            {color.toUpperCase()}
          </span>
        </div>
        
        <motion.div
          className="text-xs font-medium opacity-70"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 0.7 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {onColorChange ? "Click to edit" : "Click to copy"}
        </motion.div>
      </div>

      {/* Color Picker Modal */}
      <AnimatePresence>
        {showColorPicker && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowColorPicker(false)}
          >
            <motion.div
              className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="mb-4 text-lg font-medium">Select Color</h3>
              <input
                type="color"
                value={tempColor}
                onChange={(e) => setTempColor(e.target.value)}
                className="w-full h-12 cursor-pointer"
              />
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => setShowColorPicker(false)}
                  className={`px-4 py-2 rounded-lg ${
                    theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (onColorChange) onColorChange(tempColor);
                    setShowColorPicker(false);
                  }}
                  className={`px-4 py-2 rounded-lg text-white ${
                    theme === 'dark' ? 'bg-purple-600 hover:bg-purple-500' : 'bg-purple-500 hover:bg-purple-600'
                  }`}
                >
                  Apply
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ColorBlock;