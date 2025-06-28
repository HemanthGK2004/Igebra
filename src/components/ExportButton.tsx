import { motion } from 'framer-motion';
import { Check, Code, Download, FileText } from 'lucide-react';
import React, { useState } from 'react';
import { PaletteType } from '../types/palette';
import { exportAsCss, exportAsJson } from '../utils/exportUtils';

interface ExportButtonProps {
  palette: PaletteType;
  format: 'json' | 'css';
  theme?: 'light' | 'dark';
  className?: string;
}

const ExportButton: React.FC<ExportButtonProps> = ({ 
  palette, 
  format, 
  theme = 'light',
  className = ''
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleExport = () => {
    if (palette.length === 0) return;
    
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 2000);

    if (format === 'json') {
      exportAsJson(palette);
    } else {
      exportAsCss(palette);
    }
  };

  const formatConfig = {
    json: {
      icon: <FileText size={16} />,
      label: 'JSON',
      colorClass: theme === 'dark' 
        ? 'bg-blue-600 hover:bg-blue-700' 
        : 'bg-blue-500 hover:bg-blue-600',
      text: 'Exported as JSON!'
    },
    css: {
      icon: <Code size={16} />,
      label: 'CSS',
      colorClass: theme === 'dark' 
        ? 'bg-purple-600 hover:bg-purple-700' 
        : 'bg-purple-500 hover:bg-purple-600',
      text: 'Exported as CSS!'
    }
  };

  const config = formatConfig[format];

  return (
    <motion.button
      onClick={handleExport}
      disabled={palette.length === 0}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 text-white font-medium 
        ${config.colorClass} 
        ${palette.length === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}`}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        animate={{ 
          opacity: isClicked ? 0 : 1,
          y: isClicked ? 10 : 0
        }}
        transition={{ duration: 0.2 }}
        className="flex items-center gap-2"
      >
        <Download size={16} />
        {config.icon}
        <span>{config.label}</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ 
          opacity: isClicked ? 1 : 0,
          y: isClicked ? 0 : -10
        }}
        transition={{ duration: 0.2 }}
        className="absolute flex items-center gap-2"
      >
        <Check size={16} />
        <span>{config.text}</span>
      </motion.div>

      {isHovered && palette.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute px-3 py-1 mt-2 text-xs text-white bg-gray-700 rounded top-full whitespace-nowrap"
        >
          Generate a palette first
        </motion.div>
      )}
    </motion.button>
  );
};

export default ExportButton;