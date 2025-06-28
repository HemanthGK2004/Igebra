import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Star, 
  Tag,
  Calendar,
  BookOpen,
  Edit3,
  Trash2,
  MoreHorizontal,
  Grid3X3,
  List,
  SortAsc,
  Eye,
  Share2,
  Download,
  Heart
} from 'lucide-react';
import { storage } from '../../utils/storage';
import { Note } from '../../types';
import { format } from 'date-fns';
import NoteEditor from './NoteEditor';

const NotesManager: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showEditor, setShowEditor] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [sortBy, setSortBy] = useState<'date' | 'title' | 'category'>('date');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    const loadedNotes = storage.getNotes();
    setNotes(loadedNotes);
    setFilteredNotes(loadedNotes);
  }, []);

  useEffect(() => {
    let filtered = notes;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(note => 
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(note => note.category === selectedCategory);
    }

    // Sort notes
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'category':
          return a.category.localeCompare(b.category);
        case 'date':
        default:
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      }
    });

    setFilteredNotes(filtered);
  }, [notes, searchTerm, selectedCategory, sortBy]);

  const categories = ['all', ...new Set(notes.map(note => note.category))];

  const handleSaveNote = (noteData: Partial<Note>) => {
    const now = new Date();
    let updatedNotes;

    if (editingNote) {
      // Update existing note
      updatedNotes = notes.map(note =>
        note.id === editingNote.id
          ? { ...note, ...noteData, updatedAt: now }
          : note
      );
    } else {
      // Create new note
      const newNote: Note = {
        id: Date.now().toString(),
        title: noteData.title || 'Untitled Note',
        content: noteData.content || '',
        tags: noteData.tags || [],
        category: noteData.category || 'General',
        createdAt: now,
        updatedAt: now,
        isStarred: false,
        version: 1,
        isArchived: false,
        ...noteData
      };
      updatedNotes = [newNote, ...notes];
    }

    setNotes(updatedNotes);
    storage.saveNotes(updatedNotes);
    setShowEditor(false);
    setEditingNote(null);
  };

  const handleDeleteNote = (noteId: string) => {
    const updatedNotes = notes.filter(note => note.id !== noteId);
    setNotes(updatedNotes);
    storage.saveNotes(updatedNotes);
  };

  const toggleStar = (noteId: string) => {
    const updatedNotes = notes.map(note =>
      note.id === noteId ? { ...note, isStarred: !note.isStarred } : note
    );
    setNotes(updatedNotes);
    storage.saveNotes(updatedNotes);
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setShowEditor(true);
  };

  if (showEditor) {
    return (
      <NoteEditor
        note={editingNote}
        onSave={handleSaveNote}
        onCancel={() => {
          setShowEditor(false);
          setEditingNote(null);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-green-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
                My Notes 📝
              </h1>
              <p className="text-slate-600 text-lg">Organize and manage your study notes</p>
            </div>
            <button
              onClick={() => setShowEditor(true)}
              className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center space-x-3 shadow-xl hover:shadow-2xl hover:-translate-y-1"
            >
              <Plus className="w-6 h-6" />
              <span>Create Note</span>
            </button>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-800">{notes.length}</div>
                  <div className="text-sm text-slate-600">Total Notes</div>
                </div>
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-800">{notes.filter(n => n.isStarred).length}</div>
                  <div className="text-sm text-slate-600">Starred</div>
                </div>
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                  <Tag className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-800">{new Set(notes.flatMap(n => n.tags)).size}</div>
                  <div className="text-sm text-slate-600">Unique Tags</div>
                </div>
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-800">{categories.length - 1}</div>
                  <div className="text-sm text-slate-600">Categories</div>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-6 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search notes, tags, content..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-4 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'date' | 'title' | 'category')}
                  className="px-4 py-4 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                >
                  <option value="date">Sort by Date</option>
                  <option value="title">Sort by Title</option>
                  <option value="category">Sort by Category</option>
                </select>

                <div className="flex bg-slate-100 rounded-xl p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-3 rounded-lg transition-all duration-200 ${
                      viewMode === 'grid' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-600 hover:text-slate-800'
                    }`}
                  >
                    <Grid3X3 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-3 rounded-lg transition-all duration-200 ${
                      viewMode === 'list' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-600 hover:text-slate-800'
                    }`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Notes Grid/List */}
          {filteredNotes.length > 0 ? (
            <div className={viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
              : "space-y-4"
            }>
              {filteredNotes.map((note) => (
                <div key={note.id} className={`group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                  viewMode === 'list' ? 'flex items-center p-6' : ''
                }`}>
                  {viewMode === 'grid' ? (
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-bold text-slate-800 truncate text-lg group-hover:text-blue-600 transition-colors">
                              {note.title}
                            </h3>
                            {note.isStarred && (
                              <Star className="w-5 h-5 text-yellow-500 fill-current flex-shrink-0" />
                            )}
                          </div>
                          <div className="flex items-center space-x-2 mb-3">
                            <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                              {note.category}
                            </span>
                            {note.audioUrl && (
                              <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                                🎵 Audio
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => toggleStar(note.id)}
                            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                          >
                            <Star className={`w-4 h-4 ${note.isStarred ? 'text-yellow-500 fill-current' : 'text-slate-400'}`} />
                          </button>
                          <button
                            onClick={() => handleEditNote(note)}
                            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                          >
                            <Edit3 className="w-4 h-4 text-slate-400 hover:text-blue-600" />
                          </button>
                          <button
                            onClick={() => handleDeleteNote(note.id)}
                            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4 text-slate-400 hover:text-red-600" />
                          </button>
                        </div>
                      </div>

                      <p className="text-slate-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                        {note.content}
                      </p>

                      {note.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {note.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                              #{tag}
                            </span>
                          ))}
                          {note.tags.length > 3 && (
                            <span className="px-2 py-1 bg-slate-100 text-slate-500 text-xs rounded-full">
                              +{note.tags.length - 3} more
                            </span>
                          )}
                        </div>
                      )}

                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{format(note.updatedAt, 'MMM d, yyyy')}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <button className="flex items-center space-x-1 hover:text-blue-600 transition-colors">
                            <Eye className="w-3 h-3" />
                            <span>View</span>
                          </button>
                          <button className="flex items-center space-x-1 hover:text-green-600 transition-colors">
                            <Share2 className="w-3 h-3" />
                            <span>Share</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center space-x-4 flex-1">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
                          <BookOpen className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-bold text-slate-800 truncate">{note.title}</h3>
                            {note.isStarred && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                          </div>
                          <p className="text-sm text-slate-600 truncate">{note.content}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-xs text-slate-500">{note.category}</span>
                            <span className="text-xs text-slate-500">{format(note.updatedAt, 'MMM d, yyyy')}</span>
                            <span className="text-xs text-slate-500">{note.tags.length} tags</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => toggleStar(note.id)}
                          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                          <Star className={`w-4 h-4 ${note.isStarred ? 'text-yellow-500 fill-current' : 'text-slate-400'}`} />
                        </button>
                        <button
                          onClick={() => handleEditNote(note)}
                          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                          <Edit3 className="w-4 h-4 text-slate-400 hover:text-blue-600" />
                        </button>
                        <button
                          onClick={() => handleDeleteNote(note.id)}
                          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-slate-400 hover:text-red-600" />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-12 h-12 text-slate-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">No notes found</h3>
              <p className="text-slate-500 mb-8 text-lg">
                {searchTerm || selectedCategory !== 'all' 
                  ? 'Try adjusting your search or filters'
                  : 'Create your first note to get started on your learning journey'
                }
              </p>
              <button
                onClick={() => setShowEditor(true)}
                className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center space-x-3 mx-auto shadow-xl hover:shadow-2xl hover:-translate-y-1"
              >
                <Plus className="w-6 h-6" />
                <span>Create Your First Note</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotesManager;