import { motion } from 'framer-motion';
import { Accessibility, EyeOff } from 'lucide-react';
import React, { useState } from 'react';
import Slider from '../ui/Slider';

interface ColorAdjustmentToolsProps {
  palette: string[];
  onPaletteChange: (newPalette: string[]) => void;
  theme?: 'light' | 'dark';
}

// Color conversion utilities
const hexToHSL = (hex: string) => {
  // Remove # if present
  let r = 0, g = 0, b = 0;
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else if (hex.length === 7) {
    r = parseInt(hex.substring(1, 3), 16);
    g = parseInt(hex.substring(3, 5), 16);
    b = parseInt(hex.substring(5, 7), 16);
  }
  
  // Normalize to 0-1
  r /= 255, g /= 255, b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
};

const HSLToHex = (h: number, s: number, l: number) => {
  s /= 100;
  l /= 100;
  
  let c = (1 - Math.abs(2 * l - 1)) * s;
  let x = c * (1 - Math.abs((h / 60) % 2 - 1));
  let m = l - c / 2;
  let r = 0, g = 0, b = 0;

  if (0 <= h && h < 60) {
    r = c; g = x; b = 0;
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0;
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x;
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c;
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c;
  } else if (300 <= h && h < 360) {
    r = c; g = 0; b = x;
  }
  
  // Convert to hex
  const toHex = (x: number) => {
    const hex = Math.round((x + m) * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

const ColorAdjustmentTools: React.FC<ColorAdjustmentToolsProps> = ({ 
  palette,
  onPaletteChange,
  theme = 'light'
}) => {
  const [activeTab, setActiveTab] = useState<'adjust' | 'accessibility'>('adjust');
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [contrastRatio, setContrastRatio] = useState<number | null>(null);
  const [colorBlindMode, setColorBlindMode] = useState<string | null>(null);

  const handleColorChange = (type: 'h' | 's' | 'l', value: number) => {
    const newPalette = [...palette];
    const hsl = hexToHSL(newPalette[selectedColorIndex]);
    
    if (type === 'h') hsl.h = value;
    if (type === 's') hsl.s = value;
    if (type === 'l') hsl.l = value;
    
    newPalette[selectedColorIndex] = HSLToHex(hsl.h, hsl.s, hsl.l);
    onPaletteChange(newPalette);
  };

  const calculateContrast = (color1: string, color2: string) => {
    // Simplified contrast ratio calculation
    const luminance1 = getLuminance(color1);
    const luminance2 = getLuminance(color2);
    const lighter = Math.max(luminance1, luminance2);
    const darker = Math.min(luminance1, luminance2);
    return (lighter + 0.05) / (darker + 0.05);
  };

  const getLuminance = (hex: string) => {
    const [r, g, b] = hex.match(/\w\w/g)!.map(x => parseInt(x, 16) / 255);
    const a = [r, g, b].map(v => 
      v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
    );
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  };

  return (
    <div className={`rounded-lg p-4 ${
      theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
    }`}>
      <div className="flex mb-4 border-b">
        <button
          onClick={() => setActiveTab('adjust')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'adjust'
              ? theme === 'dark'
                ? 'text-purple-300 border-b border-purple-300'
                : 'text-purple-600 border-b border-purple-600'
              : theme === 'dark'
                ? 'text-gray-400'
                : 'text-gray-600'
          }`}
        >
          Adjust Colors
        </button>
        <button
          onClick={() => setActiveTab('accessibility')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'accessibility'
              ? theme === 'dark'
                ? 'text-purple-300 border-b border-purple-300'
                : 'text-purple-600 border-b border-purple-600'
              : theme === 'dark'
                ? 'text-gray-400'
                : 'text-gray-600'
          }`}
        >
          <Accessibility size={18} className="inline mr-2" />
          Accessibility
        </button>
      </div>

      {activeTab === 'adjust' ? (
        <div>
          <div className="mb-4">
            <label className={`block mb-2 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Select Color to Adjust
            </label>
            <div className="flex gap-1">
              {palette.map((color, index) => (
                <motion.button
                  key={index}
                  onClick={() => setSelectedColorIndex(index)}
                  className={`w-8 h-8 rounded-md border-2 ${
                    selectedColorIndex === index
                      ? theme === 'dark'
                        ? 'border-purple-400'
                        : 'border-purple-600'
                      : 'border-transparent'
                  }`}
                  style={{ backgroundColor: color }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className={`block mb-2 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Hue
              </label>
              <Slider 
                value={[hexToHSL(palette[selectedColorIndex]).h]}
                onValueChange={([value]) => handleColorChange('h', value)}
                max={360}
                theme={theme}
              />
            </div>
            <div>
              <label className={`block mb-2 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Saturation
              </label>
              <Slider 
                value={[hexToHSL(palette[selectedColorIndex]).s]}
                onValueChange={([value]) => handleColorChange('s', value)}
                max={100}
                theme={theme}
              />
            </div>
            <div>
              <label className={`block mb-2 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Lightness
              </label>
              <Slider 
                value={[hexToHSL(palette[selectedColorIndex]).l]}
                onValueChange={([value]) => handleColorChange('l', value)}
                max={100}
                theme={theme}
              />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h4 className={`mb-3 font-medium ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Contrast Checker
          </h4>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {palette.slice(0, 2).map((color, i) => (
              palette.slice(i+1).map((bgColor, j) => (
                <div 
                  key={`${i}-${j+i+1}`}
                  className="p-3 rounded-md"
                  style={{ 
                    backgroundColor: bgColor,
                    color: color
                  }}
                  onClick={() => setContrastRatio(calculateContrast(color, bgColor))}
                >
                  <div className="text-center">
                    <p className="font-medium">Text</p>
                    <p className="text-sm opacity-80">on Background</p>
                    {contrastRatio && (
                      <p className={`mt-1 text-xs ${
                        contrastRatio >= 4.5 ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {contrastRatio.toFixed(2)}:1
                      </p>
                    )}
                  </div>
                </div>
              ))
            ))}
          </div>

          <h4 className={`mt-6 mb-3 font-medium ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Color Blindness Simulator
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {['Protanopia', 'Deuteranopia', 'Tritanopia', 'Achromatopsia'].map(type => (
              <motion.button
                key={type}
                className={`p-2 rounded-md text-sm flex items-center justify-center ${
                  theme === 'dark' ? 'bg-gray-700' : 'bg-white'
                } ${
                  colorBlindMode === type 
                    ? theme === 'dark' 
                      ? 'ring-2 ring-purple-400' 
                      : 'ring-2 ring-purple-600'
                    : ''
                }`}
                onClick={() => setColorBlindMode(type === colorBlindMode ? null : type)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <EyeOff size={16} className="mr-2" />
                {type}
              </motion.button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorAdjustmentTools;