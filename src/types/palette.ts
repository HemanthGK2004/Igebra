/**
 * Represents a color palette as an array of hex color strings
 * @example ['#FF5733', '#33FF57', '#3357FF']
 */
export type PaletteType = string[];

/**
 * Represents a saved palette in the history with metadata
 */
export interface PaletteHistoryItem {
  /** Unique identifier for the history item */
  id: string;
  /** The color palette */
  palette: PaletteType;
  /** Creation timestamp in milliseconds */
  timestamp: number;
  /** Optional name for the palette */
  name?: string;
  /** Color harmony type used to generate the palette */
  harmonyType?: 'analogous' | 'complementary' | 'triadic' | 'monochromatic';
  /** Whether this palette is marked as a favorite */
  favorite?: boolean;
}

/**
 * Represents the different color harmony types available
 */
export type HarmonyType = 
  | 'analogous' 
  | 'complementary' 
  | 'triadic' 
  | 'monochromatic'
  | 'splitComplementary'
  | 'tetradic'
  | 'square';

/**
 * Options for exporting palettes
 */
export type ExportFormat = 
  | 'json' 
  | 'css' 
  | 'scss' 
  | 'less' 
  | 'svg' 
  | 'png';

/**
 * Configuration for palette generation
 */
export interface PaletteGenerationConfig {
  /** Base color for the palette (hex format) */
  baseColor: string;
  /** Type of color harmony to use */
  harmonyType: HarmonyType;
  /** Number of colors to generate (default 5) */
  colorCount?: number;
  /** Whether to include shades and tints */
  includeVariants?: boolean;
}

/**
 * Represents a color in various formats
 */
export interface ColorFormats {
  hex: string;
  rgb: string;
  hsl: string;
  cmyk?: string;
  lab?: string;
}

/**
 * Extended color information including different formats
 */
export interface ColorInfo extends ColorFormats {
  name?: string;
  contrastRatio?: number;
  accessibleTextColor?: string;
}