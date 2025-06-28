import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, History, Trash2, X } from 'lucide-react';
import { Component } from 'react';
import { PaletteType } from '../types/palette';

interface PaletteHistoryProps {
  currentPalette: PaletteType;
  onSelectPalette: (palette: PaletteType) => void;
  theme?: 'light' | 'dark';
}

interface PaletteHistoryState {
  history: PaletteType[];
  currentIndex: number;
  isDeleting: number | null;
}

class PaletteHistory extends Component<PaletteHistoryProps, PaletteHistoryState> {
  constructor(props: PaletteHistoryProps) {
    super(props);
    
    this.state = {
      history: [],
      currentIndex: -1,
      isDeleting: null
    };
  }

  componentDidMount() {
    this.loadHistory();
  }

  componentDidUpdate(prevProps: PaletteHistoryProps) {
    if (
      this.props.currentPalette.length > 0 && 
      JSON.stringify(prevProps.currentPalette) !== JSON.stringify(this.props.currentPalette)
    ) {
      this.addToHistory(this.props.currentPalette);
    }
  }

  loadHistory = () => {
    const savedHistory = localStorage.getItem('paletteHistory');
    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory) as PaletteType[];
        this.setState({ 
          history: parsedHistory,
          currentIndex: parsedHistory.length - 1
        });
      } catch (e) {
        console.error('Failed to parse palette history', e);
      }
    }
  };

  addToHistory = (palette: PaletteType) => {
    if (palette.length === 0) return;
    
    const { history, currentIndex } = this.state;
    
    const newHistory = currentIndex < history.length - 1 
      ? history.slice(0, currentIndex + 1) 
      : [...history];
    
    if (newHistory.length === 0 || 
        JSON.stringify(newHistory[newHistory.length - 1]) !== JSON.stringify(palette)) {
      
      const updatedHistory = [...newHistory, palette].slice(-20);
      
      this.setState({
        history: updatedHistory,
        currentIndex: updatedHistory.length - 1
      });
      
      localStorage.setItem('paletteHistory', JSON.stringify(updatedHistory));
    }
  };

  handleUndo = () => {
    const { history, currentIndex } = this.state;
    
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      this.setState({ currentIndex: newIndex });
      this.props.onSelectPalette(history[newIndex]);
    }
  };

  handleRedo = () => {
    const { history, currentIndex } = this.state;
    
    if (currentIndex < history.length - 1) {
      const newIndex = currentIndex + 1;
      this.setState({ currentIndex: newIndex });
      this.props.onSelectPalette(history[newIndex]);
    }
  };

  handleDelete = async (index: number) => {
    this.setState({ isDeleting: index });
    
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const { history, currentIndex } = this.state;
    const newHistory = history.filter((_, i) => i !== index);
    
    let newIndex = currentIndex;
    if (index === currentIndex) {
      newIndex = Math.max(0, currentIndex - 1);
    } else if (index < currentIndex) {
      newIndex = currentIndex - 1;
    }
    
    this.setState({
      history: newHistory,
      currentIndex: newHistory.length > 0 ? newIndex : -1,
      isDeleting: null
    });
    
    localStorage.setItem('paletteHistory', JSON.stringify(newHistory));
    
    if (newHistory.length > 0) {
      this.props.onSelectPalette(newHistory[newIndex]);
    }
  };

  handleClearHistory = () => {
    this.setState({
      history: [],
      currentIndex: -1
    });
    localStorage.removeItem('paletteHistory');
  };

  handleSelectPalette = (index: number) => {
    const { history } = this.state;
    this.setState({ currentIndex: index });
    this.props.onSelectPalette(history[index]);
  };

  render() {
    const { history, currentIndex, isDeleting } = this.state;
    const { theme = 'light' } = this.props;
    
    return (
      <motion.div
        className={`rounded-xl shadow-lg transition-all duration-300 ${
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
                <History className={
                  theme === 'dark' ? 'text-purple-300' : 'text-purple-600'
                } size={20} />
              </div>
              <h2 className={`text-xl font-semibold ${
                theme === 'dark' ? 'text-gray-100' : 'text-gray-800'
              }`}>
                Palette History
              </h2>
            </div>

            <div className="flex gap-2">
              {history.length > 0 && (
                <motion.button
                  onClick={this.handleClearHistory}
                  className={`flex items-center gap-1 px-3 py-1 text-sm rounded-lg transition-colors ${
                    theme === 'dark'
                      ? 'text-gray-300 hover:text-red-400 bg-gray-700 hover:bg-gray-600'
                      : 'text-gray-600 hover:text-red-500 bg-gray-100 hover:bg-gray-200'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X size={16} />
                  <span>Clear</span>
                </motion.button>
              )}
              
              <div className="flex gap-1">
                <motion.button 
                  onClick={this.handleUndo}
                  disabled={currentIndex <= 0}
                  className={`p-2 rounded-lg transition-colors ${
                    currentIndex <= 0 
                      ? theme === 'dark'
                        ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : theme === 'dark'
                        ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                  }`}
                  whileHover={currentIndex > 0 ? { scale: 1.1 } : {}}
                  whileTap={currentIndex > 0 ? { scale: 0.9 } : {}}
                >
                  <ChevronLeft size={18} />
                </motion.button>
                <motion.button 
                  onClick={this.handleRedo}
                  disabled={currentIndex >= history.length - 1}
                  className={`p-2 rounded-lg transition-colors ${
                    currentIndex >= history.length - 1
                      ? theme === 'dark'
                        ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : theme === 'dark'
                        ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                  }`}
                  whileHover={currentIndex < history.length - 1 ? { scale: 1.1 } : {}}
                  whileTap={currentIndex < history.length - 1 ? { scale: 0.9 } : {}}
                >
                  <ChevronRight size={18} />
                </motion.button>
              </div>
            </div>
          </div>

          <AnimatePresence>
            {history.length > 0 ? (
              <motion.div
                className="space-y-3 max-h-[500px] overflow-y-auto pr-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {history.map((palette, index) => (
                  <motion.div
                    key={index}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ 
                      opacity: isDeleting === index ? 0 : 1, 
                      y: 0,
                      scale: isDeleting === index ? 0.9 : 1
                    }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`group flex items-center p-3 rounded-lg transition-all ${
                      index === currentIndex 
                        ? theme === 'dark'
                          ? 'bg-indigo-900/30 border-indigo-800'
                          : 'bg-indigo-50 border-indigo-200'
                        : theme === 'dark'
                          ? 'bg-gray-700/50 hover:bg-gray-700'
                          : 'bg-gray-50 hover:bg-gray-100'
                    } border ${
                      index === currentIndex 
                        ? 'border-opacity-100'
                        : 'border-transparent hover:border-gray-200 dark:hover:border-gray-600'
                    }`}
                  >
                    <button 
                      onClick={() => this.handleSelectPalette(index)}
                      className="flex items-center flex-1"
                    >
                      <div className="flex flex-1 h-8 gap-1">
                        {palette.map((color, colorIndex) => (
                          <motion.div
                            key={colorIndex}
                            className="flex-1 transition-all rounded-md"
                            initial={{ scale: 1 }}
                            whileHover={{ scale: 1.1 }}
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </button>
                    
                    <motion.button
                      onClick={() => this.handleDelete(index)}
                      className={`ml-2 p-2 rounded-full transition-colors ${
                        theme === 'dark'
                          ? 'text-gray-400 hover:text-red-400 hover:bg-red-900/20'
                          : 'text-gray-500 hover:text-red-500 hover:bg-red-100'
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Trash2 size={16} />
                    </motion.button>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                className={`flex flex-col items-center justify-center h-32 rounded-lg gap-3 ${
                  theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-100'
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <History className={
                  theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                } size={32} />
                <p className={
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }>
                  No history yet
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    );
  }
}

export default PaletteHistory;