import { PaletteType } from '../types/palette';

// Export palette as JSON
export const exportAsJson = (palette: PaletteType): void => {
  const fileName = `color-palette-${Date.now()}.json`;
  
  // Format palette as JSON with named colors
  const formattedPalette = palette.map((color, index) => ({
    name: `Color ${index + 1}`,
    hex: color
  }));
  
  const jsonContent = JSON.stringify(formattedPalette, null, 2);
  
  // Create a blob and download link
  const blob = new Blob([jsonContent], { type: 'application/json' });
  downloadFile(blob, fileName);
};

// Export palette as CSS
export const exportAsCss = (palette: PaletteType): void => {
  const fileName = `color-palette-${Date.now()}.css`;
  
  // Create CSS variables
  let cssContent = `:root {\n`;
  
  palette.forEach((color, index) => {
    cssContent += `  --color-${index + 1}: ${color};\n`;
  });
  
  cssContent += `}\n\n`;
  
  // Add some helpful usage examples
  cssContent += `/* Example usage */\n`;
  cssContent += `.primary-bg { background-color: var(--color-1); }\n`;
  cssContent += `.accent-color { color: var(--color-3); }\n`;
  
  // Create a blob and download link
  const blob = new Blob([cssContent], { type: 'text/css' });
  downloadFile(blob, fileName);
};

// Helper function to trigger download
const downloadFile = (blob: Blob, fileName: string): void => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  
  // Clean up
  setTimeout(() => {
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 100);
};