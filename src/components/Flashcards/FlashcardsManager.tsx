import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Brain,
  Play,
  RotateCcw,
  Star,
  Calendar,
  Target,
  Zap,
  BookOpen,
  TrendingUp,
  Award,
  Clock,
  Filter,
  Grid3X3,
  List
} from 'lucide-react';
import { storage } from '../../utils/storage';
import { Flashcard, Note } from '../../types';
import { aiService } from '../../services/aiService';
import FlashcardStudy from './FlashcardStudy';
import { addDays, isBefore } from 'date-fns';

const FlashcardsManager: React.FC = () => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNote, setSelectedNote] = useState<string>('all');
  const [showStudy, setShowStudy] = useState(false);
  const [studyCards, setStudyCards] = useState<Flashcard[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');

  useEffect(() => {
    setFlashcards(storage.getFlashcards());
    setNotes(storage.getNotes());
  }, []);

  const filteredFlashcards = flashcards.filter(card => {
    const matchesSearch = searchTerm === '' || 
      card.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.answer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesNote = selectedNote === 'all' || card.noteId === selectedNote;
    const matchesDifficulty = difficultyFilter === 'all' || card.difficulty === difficultyFilter;
    
    return matchesSearch && matchesNote && matchesDifficulty;
  });

  const generateFlashcards = async (noteId: string) => {
    const note = notes.find(n => n.id === noteId);
    if (!note) return;

    setIsGenerating(true);
    try {
      const generatedCards = await aiService.generateFlashcards(note.content);
      const newFlashcards: Flashcard[] = generatedCards.map((card, index) => ({
        id: `${noteId}-${Date.now()}-${index}`,
        noteId,
        question: card.question,
        answer: card.answer,
        difficulty: 'medium' as const,
        nextReview: new Date(),
        reviewCount: 0,
        correctCount: 0,
        createdAt: new Date(),
        tags: note.tags
      }));

      const updatedFlashcards = [...flashcards, ...newFlashcards];
      setFlashcards(updatedFlashcards);
      storage.saveFlashcards(updatedFlashcards);
    } catch (error) {
      console.error('Error generating flashcards:', error);
      alert('Failed to generate flashcards. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const getDueCards = () => {
    const now = new Date();
    return flashcards.filter(card => isBefore(card.nextReview, now) || card.reviewCount === 0);
  };

  const startStudySession = (cards: Flashcard[]) => {
    setStudyCards(cards);
    setShowStudy(true);
  };

  const handleStudyComplete = (updatedCards: Flashcard[]) => {
    const cardMap = new Map(updatedCards.map(card => [card.id, card]));
    const updatedFlashcards = flashcards.map(card => cardMap.get(card.id) || card);
    
    setFlashcards(updatedFlashcards);
    storage.saveFlashcards(updatedFlashcards);
    setShowStudy(false);
  };

  const dueCards = getDueCards();
  const totalCards = flashcards.length;
  const avgAccuracy = totalCards > 0 
    ? Math.round(flashcards.reduce((acc, card) => acc + (card.reviewCount > 0 ? card.correctCount / card.reviewCount : 0), 0) / totalCards * 100)
    : 0;

  if (showStudy) {
    return (
      <FlashcardStudy
        flashcards={studyCards}
        onComplete={handleStudyComplete}
        onExit={() => setShowStudy(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-100">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
                Flashcards 🧠
              </h1>
              <p className="text-slate-600 text-lg">Study smarter with AI-generated flashcards</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Brain className="w-7 h-7 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-slate-800">{totalCards}</div>
                  <div className="text-sm text-slate-600">Total Cards</div>
                </div>
              </div>
              <div className="w-full bg-blue-100 rounded-full h-2">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Calendar className="w-7 h-7 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-slate-800">{dueCards.length}</div>
                  <div className="text-sm text-slate-600">Due for Review</div>
                </div>
              </div>
              <div className="w-full bg-red-100 rounded-full h-2">
                <div className="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full" style={{ width: `${Math.min((dueCards.length / Math.max(totalCards, 1)) * 100, 100)}%` }}></div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-slate-800">{avgAccuracy}%</div>
                  <div className="text-sm text-slate-600">Accuracy</div>
                </div>
              </div>
              <div className="w-full bg-green-100 rounded-full h-2">
                <div className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full" style={{ width: `${avgAccuracy}%` }}></div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Zap className="w-7 h-7 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-slate-800">
                    {flashcards.filter(card => card.reviewCount > 0).length}
                  </div>
                  <div className="text-sm text-slate-600">Studied</div>
                </div>
              </div>
              <div className="w-full bg-purple-100 rounded-full h-2">
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-6 mb-8">
            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
              <Zap className="w-6 h-6 mr-2 text-yellow-500" />
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => startStudySession(dueCards)}
                disabled={dueCards.length === 0}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white p-6 rounded-2xl font-semibold transition-all duration-300 flex items-center space-x-4 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                <Play className="w-8 h-8" />
                <div className="text-left">
                  <p className="text-lg">Study Due Cards</p>
                  <p className="text-sm opacity-90">{dueCards.length} cards ready</p>
                </div>
              </button>

              <button
                onClick={() => startStudySession(flashcards)}
                disabled={flashcards.length === 0}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-6 rounded-2xl font-semibold transition-all duration-300 flex items-center space-x-4 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                <RotateCcw className="w-8 h-8" />
                <div className="text-left">
                  <p className="text-lg">Review All</p>
                  <p className="text-sm opacity-90">{flashcards.length} total cards</p>
                </div>
              </button>

              <div className="relative">
                <select
                  onChange={(e) => e.target.value && generateFlashcards(e.target.value)}
                  className="w-full p-6 rounded-2xl border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 appearance-none bg-white/50 backdrop-blur-sm font-semibold text-slate-800"
                  disabled={isGenerating}
                >
                  <option value="">🤖 Generate from Note</option>
                  {notes.map(note => (
                    <option key={note.id} value={note.id}>{note.title}</option>
                  ))}
                </select>
                {isGenerating && (
                  <div className="absolute right-6 top-1/2 transform -translate-y-1/2">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-6 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search flashcards..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <select
                  value={selectedNote}
                  onChange={(e) => setSelectedNote(e.target.value)}
                  className="px-4 py-4 rounded-xl border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                >
                  <option value="all">All Notes</option>
                  {notes.map(note => (
                    <option key={note.id} value={note.id}>{note.title}</option>
                  ))}
                </select>

                <select
                  value={difficultyFilter}
                  onChange={(e) => setDifficultyFilter(e.target.value as any)}
                  className="px-4 py-4 rounded-xl border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                >
                  <option value="all">All Difficulties</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>

                <div className="flex bg-slate-100 rounded-xl p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-3 rounded-lg transition-all duration-200 ${
                      viewMode === 'grid' ? 'bg-white shadow-sm text-purple-600' : 'text-slate-600 hover:text-slate-800'
                    }`}
                  >
                    <Grid3X3 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-3 rounded-lg transition-all duration-200 ${
                      viewMode === 'list' ? 'bg-white shadow-sm text-purple-600' : 'text-slate-600 hover:text-slate-800'
                    }`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Flashcards Grid */}
          {filteredFlashcards.length > 0 ? (
            <div className={viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
              : "space-y-4"
            }>
              {filteredFlashcards.map((card) => {
                const note = notes.find(n => n.id === card.noteId);
                const isDue = isBefore(card.nextReview, new Date()) || card.reviewCount === 0;
                const accuracy = card.reviewCount > 0 ? Math.round((card.correctCount / card.reviewCount) * 100) : 0;

                return (
                  <div key={card.id} className={`group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                    viewMode === 'list' ? 'flex items-center p-6' : ''
                  }`}>
                    {viewMode === 'grid' ? (
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-3">
                              <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                                card.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                                card.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-red-100 text-red-700'
                              }`}>
                                {card.difficulty}
                              </span>
                              {isDue && (
                                <span className="px-3 py-1 bg-red-100 text-red-700 text-xs rounded-full font-medium animate-pulse">
                                  Due Now
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-slate-500 font-medium">{note?.title || 'Unknown Note'}</p>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                            <p className="text-sm font-semibold text-blue-800 mb-2">Question:</p>
                            <p className="text-slate-800 font-medium">{card.question}</p>
                          </div>
                          
                          <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                            <p className="text-sm font-semibold text-green-800 mb-2">Answer:</p>
                            <p className="text-slate-700">{card.answer}</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100">
                          <span className="text-xs text-slate-500">Reviewed {card.reviewCount} times</span>
                          {card.reviewCount > 0 && (
                            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                              accuracy >= 80 ? 'bg-green-100 text-green-700' :
                              accuracy >= 60 ? 'bg-yellow-100 text-yellow-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {accuracy}% accuracy
                            </span>
                          )}
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center space-x-4 flex-1">
                          <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center">
                            <Brain className="w-6 h-6 text-purple-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="font-semibold text-slate-800 truncate">{card.question}</h3>
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                card.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                                card.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-red-100 text-red-700'
                              }`}>
                                {card.difficulty}
                              </span>
                            </div>
                            <p className="text-sm text-slate-600 truncate">{card.answer}</p>
                            <div className="flex items-center space-x-4 mt-2">
                              <span className="text-xs text-slate-500">{note?.title}</span>
                              <span className="text-xs text-slate-500">{card.reviewCount} reviews</span>
                              {card.reviewCount > 0 && (
                                <span className="text-xs text-green-600">{accuracy}% accuracy</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-pink-200 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Brain className="w-12 h-12 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">No flashcards found</h3>
              <p className="text-slate-500 mb-8 text-lg">
                {searchTerm || selectedNote !== 'all' 
                  ? 'Try adjusting your search or filters'
                  : 'Generate flashcards from your notes to get started'
                }
              </p>
              {notes.length > 0 && (
                <div className="max-w-sm mx-auto">
                  <select
                    onChange={(e) => e.target.value && generateFlashcards(e.target.value)}
                    className="w-full p-4 rounded-xl border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                    disabled={isGenerating}
                  >
                    <option value="">Select a note to generate flashcards</option>
                    {notes.map(note => (
                      <option key={note.id} value={note.id}>{note.title}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlashcardsManager;