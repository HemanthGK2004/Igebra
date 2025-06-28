import { PaletteType } from '../types/palette';

// Generate a random hex color
export const getRandomColor = (): string => {
  return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
};

// Convert hex to HSL
export const hexToHSL = (hex: string): { h: number; s: number; l: number } => {
  // Remove the # if present
  hex = hex.replace('#', '');
  
  // Convert hex to RGB
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;
  
  // Find greatest and smallest channel values
  const cmin = Math.min(r, g, b);
  const cmax = Math.max(r, g, b);
  const delta = cmax - cmin;
  
  let h = 0;
  let s = 0;
  let l = 0;

  // Calculate hue
  if (delta === 0) {
    h = 0;
  } else if (cmax === r) {
    h = ((g - b) / delta) % 6;
  } else if (cmax === g) {
    h = (b - r) / delta + 2;
  } else {
    h = (r - g) / delta + 4;
  }

  h = Math.round(h * 60);
  if (h < 0) h += 360;

  // Calculate lightness
  l = (cmax + cmin) / 2;

  // Calculate saturation
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  // Convert to percentages
  s = Math.round(s * 100);
  l = Math.round(l * 100);

  return { h, s, l };
};

// Convert HSL to hex
export const hslToHex = (h: number, s: number, l: number): string => {
  h /= 360;
  s /= 100;
  l /= 100;
  
  let r, g, b;
  
  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  
  const toHex = (x: number) => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

// Generate an analogous color palette
export const generateAnalogousPalette = (baseColor: string): PaletteType => {
  const { h, s, l } = hexToHSL(baseColor);
  const colors: PaletteType = [];
  
  // Add the base color
  colors.push(baseColor);
  
  // Add analogous colors (adjacent on the color wheel)
  // For a 5-color palette, we'll use angles of -40, -20, 0, 20, 40
  for (let angle of [-40, -20, 20, 40]) {
    let newHue = (h + angle) % 360;
    if (newHue < 0) newHue += 360;
    
    // Vary saturation and lightness slightly for more interest
    const newSat = Math.min(Math.max(s + Math.random() * 10 - 5, 0), 100);
    const newLight = Math.min(Math.max(l + Math.random() * 10 - 5, 0), 100);
    
    colors.push(hslToHex(newHue, newSat, newLight));
  }
  
  // Ensure we have exactly 5 colors
  return colors.slice(0, 5);
};

// Generate a monochromatic color palette
export const generateMonochromaticPalette = (baseColor: string): PaletteType => {
  const { h, s, l } = hexToHSL(baseColor);
  const colors: PaletteType = [];
  
  // Generate 5 colors with the same hue but different saturation/lightness
  for (let i = 0; i < 5; i++) {
    // Vary the lightness from darker to lighter
    const newLight = Math.max(Math.min(l - 30 + i * 15, 90), 10);
    
    // Vary saturation slightly
    const newSat = Math.min(Math.max(s - 10 + i * 5, 0), 100);
    
    colors.push(hslToHex(h, newSat, newLight));
  }
  
  return colors;
};

// Generate a triadic color palette
export const generateTriadicPalette = (baseColor: string): PaletteType => {
  const { h, s, l } = hexToHSL(baseColor);
  const colors: PaletteType = [];
  
  // Add the primary color
  colors.push(baseColor);
  
  // Add the two triadic colors (120 degrees apart on the color wheel)
  const h1 = (h + 120) % 360;
  const h2 = (h + 240) % 360;
  
  // Add variations
  colors.push(hslToHex(h1, s, l));
  colors.push(hslToHex(h2, s, l));
  
  // Add variants of the triadic colors with slightly different saturation/lightness
  colors.push(hslToHex(h1, Math.min(s + 10, 100), Math.max(l - 10, 0)));
  colors.push(hslToHex(h2, Math.max(s - 10, 0), Math.min(l + 10, 100)));
  
  return colors;
};

// Generate a random palette with one of the harmony patterns
export const generateRandomPalette = (): PaletteType => {
  const baseColor = getRandomColor();
  const harmonyType = Math.floor(Math.random() * 3);
  
  switch (harmonyType) {
    case 0:
      return generateAnalogousPalette(baseColor);
    case 1:
      return generateMonochromaticPalette(baseColor);
    case 2:
      return generateTriadicPalette(baseColor);
    default:
      return generateAnalogousPalette(baseColor);
  }
};