import { PaletteType } from '../types/palette';

interface FavoritesPanelProps {
  favorites: PaletteType[];
  onSelect: (palette: PaletteType) => void;
  onRemove: (palette: PaletteType) => void;
  theme: 'light' | 'dark';
}

export default function FavoritesPanel({ 
  favorites, 
  onSelect, 
  onRemove,
  theme 
}: FavoritesPanelProps) {
  return (
    <div className={`p-6 rounded-xl shadow-lg ${
      theme === 'dark' ? 'bg-gray-800' : 'bg-white'
    }`}>
      <h2 className="flex items-center gap-2 mb-4 text-xl font-semibold">
        <span className={`inline-block w-3 h-3 rounded-full ${
          theme === 'dark' ? 'bg-yellow-400' : 'bg-yellow-500'
        }`}></span>
        Favorite Palettes
      </h2>
      
      {favorites.length === 0 ? (
        <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
          No favorites yet. Save some palettes to see them here!
        </p>
      ) : (
        <div className="space-y-4">
          {favorites.map((palette, index) => (
            <div 
              key={index} 
              className={`p-3 rounded-lg cursor-pointer transition-colors ${
                theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <div className="flex flex-wrap gap-1 mb-2">
                {palette.map((color, colorIndex) => (
                  <div 
                    key={colorIndex}
                    className="w-8 h-8 rounded-full shadow-md"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <div className="flex justify-between">
                <button
                  onClick={() => onSelect(palette)}
                  className={`text-sm px-2 py-1 rounded ${
                    theme === 'dark' 
                      ? 'bg-blue-600 hover:bg-blue-500' 
                      : 'bg-blue-500 hover:bg-blue-400'
                  } text-white`}
                >
                  Use
                </button>
                <button
                  onClick={() => onRemove(palette)}
                  className={`text-sm px-2 py-1 rounded ${
                    theme === 'dark' 
                      ? 'bg-red-600 hover:bg-red-500' 
                      : 'bg-red-500 hover:bg-red-400'
                  } text-white`}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}