import { Pipette } from 'lucide-react'; // Using Pipette as a fallback
import React, { useState } from 'react';
import { ChromePicker } from 'react-color';

interface ColorPickerProps {
  currentColor: string;
  onColorChange: (color: string) => void;
  theme?: 'light' | 'dark';
}

const ColorPicker: React.FC<ColorPickerProps> = ({ 
  currentColor, 
  onColorChange,
  theme = 'light'
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [pickerColor, setPickerColor] = useState(currentColor);

  const handleEyeDropper = async () => {
    try {
      // Check if EyeDropper API is available
      if (!('EyeDropper' in window)) {
        throw new Error('EyeDropper API not supported');
      }
      
      // @ts-ignore - TypeScript doesn't know about EyeDropper API yet
      const eyeDropper = new window.EyeDropper();
      const { sRGBHex } = await eyeDropper.open();
      onColorChange(sRGBHex);
    } catch (e) {
      console.error("EyeDropper error:", e);
      // Fallback to color picker
      setShowPicker(true);
    }
  };

  return (
    <div className="relative">
      <div className="flex gap-2">
        <button
          onClick={() => setShowPicker(!showPicker)}
          className={`p-2 rounded-lg ${
            theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
          }`}
          aria-label="Open color picker"
        >
          <div 
            className="w-6 h-6 border border-gray-400 rounded-md"
            style={{ backgroundColor: currentColor }}
          />
        </button>
        
        {/* Eyedropper button with fallback */}
        <button
          onClick={handleEyeDropper}
          className={`p-2 rounded-lg ${
            theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
          } transition-colors`}
          aria-label="Pick color from screen"
          title="Pick color from screen (Browser support required)"
        >
          {/* Using text as fallback if Pipette icon isn't available */}
          {'Pipette' in Pipette ? (
            <Pipette size={18} />
          ) : (
            <span className="text-xs">Pick</span>
          )}
        </button>
      </div>

      {showPicker && (
        <div className="absolute z-10 mt-2">
          <ChromePicker
            color={pickerColor}
            onChange={(color) => setPickerColor(color.hex)}
            onChangeComplete={(color) => {
              onColorChange(color.hex);
              setShowPicker(false);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ColorPicker;