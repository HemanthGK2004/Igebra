import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Play, 
  Trophy,
  Clock,
  Target,
  BookOpen,
  Edit3,
  Trash2,
  Award
} from 'lucide-react';
import { storage } from '../../utils/storage';
import { Quiz, Note } from '../../types';
import { format } from 'date-fns';
import QuizCreator from './QuizCreator';
import QuizTaker from './QuizTaker';

const QuizManager: React.FC = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreator, setShowCreator] = useState(false);
  const [showQuizTaker, setShowQuizTaker] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);

  useEffect(() => {
    setQuizzes(storage.getQuizzes());
    setNotes(storage.getNotes());
  }, []);

  const filteredQuizzes = quizzes.filter(quiz =>
    quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quiz.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSaveQuiz = (quiz: Quiz) => {
    const updatedQuizzes = [...quizzes, quiz];
    setQuizzes(updatedQuizzes);
    storage.saveQuizzes(updatedQuizzes);
    setShowCreator(false);
  };

  const handleDeleteQuiz = (quizId: string) => {
    const updatedQuizzes = quizzes.filter(q => q.id !== quizId);
    setQuizzes(updatedQuizzes);
    storage.saveQuizzes(updatedQuizzes);
  };

  const handleQuizComplete = (updatedQuiz: Quiz) => {
    const updatedQuizzes = quizzes.map(q => q.id === updatedQuiz.id ? updatedQuiz : q);
    setQuizzes(updatedQuizzes);
    storage.saveQuizzes(updatedQuizzes);
    setShowQuizTaker(false);
    setSelectedQuiz(null);
  };

  const startQuiz = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setShowQuizTaker(true);
  };

  if (showCreator) {
    return (
      <QuizCreator
        notes={notes}
        onSave={handleSaveQuiz}
        onCancel={() => setShowCreator(false)}
      />
    );
  }

  if (showQuizTaker && selectedQuiz) {
    return (
      <QuizTaker
        quiz={selectedQuiz}
        onComplete={handleQuizComplete}
        onExit={() => {
          setShowQuizTaker(false);
          setSelectedQuiz(null);
        }}
      />
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-full">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Quizzes</h1>
            <p className="text-gray-600">Test your knowledge with custom quizzes</p>
          </div>
          <button
            onClick={() => setShowCreator(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl"
          >
            <Plus className="w-5 h-5" />
            <span>Create Quiz</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{quizzes.length}</p>
            <p className="text-sm text-gray-500">Total Quizzes</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {quizzes.reduce((acc, quiz) => acc + quiz.attempts.length, 0)}
            </p>
            <p className="text-sm text-gray-500">Attempts</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {quizzes.length > 0 
                ? Math.round(quizzes.reduce((acc, quiz) => {
                    const avgScore = quiz.attempts.length > 0 
                      ? quiz.attempts.reduce((sum, attempt) => sum + attempt.score, 0) / quiz.attempts.length
                      : 0;
                    return acc + avgScore;
                  }, 0) / quizzes.length)
                : 0
              }%
            </p>
            <p className="text-sm text-gray-500">Avg Score</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {quizzes.reduce((acc, quiz) => acc + quiz.questions.length, 0)}
            </p>
            <p className="text-sm text-gray-500">Questions</p>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search quizzes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
            />
          </div>
        </div>

        {/* Quizzes Grid */}
        {filteredQuizzes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQuizzes.map((quiz) => {
              const bestScore = quiz.attempts.length > 0 
                ? Math.max(...quiz.attempts.map(a => a.score))
                : 0;
              const avgScore = quiz.attempts.length > 0
                ? Math.round(quiz.attempts.reduce((sum, a) => sum + a.score, 0) / quiz.attempts.length)
                : 0;

              return (
                <div key={quiz.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-200 group">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2">{quiz.title}</h3>
                        <p className="text-sm text-gray-600 mb-3">{quiz.description}</p>
                      </div>
                      <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleDeleteQuiz(quiz.id)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Questions:</span>
                        <span className="font-medium">{quiz.questions.length}</span>
                      </div>
                      {quiz.timeLimit && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Time Limit:</span>
                          <span className="font-medium">{quiz.timeLimit} min</span>
                        </div>
                      )}
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Attempts:</span>
                        <span className="font-medium">{quiz.attempts.length}</span>
                      </div>
                      {quiz.attempts.length > 0 && (
                        <>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Best Score:</span>
                            <span className="font-medium text-green-600">{bestScore}%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Avg Score:</span>
                            <span className="font-medium">{avgScore}%</span>
                          </div>
                        </>
                      )}
                    </div>

                    <button
                      onClick={() => startQuiz(quiz)}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center space-x-2"
                    >
                      <Play className="w-5 h-5" />
                      <span>Start Quiz</span>
                    </button>

                    <div className="mt-4 text-xs text-gray-500 text-center">
                      Created {format(quiz.createdAt, 'MMM d, yyyy')}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No quizzes found</h3>
            <p className="text-gray-500 mb-8">
              {searchTerm 
                ? 'Try adjusting your search terms'
                : 'Create your first quiz to test your knowledge'
              }
            </p>
            <button
              onClick={() => setShowCreator(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2 mx-auto"
            >
              <Plus className="w-5 h-5" />
              <span>Create Quiz</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizManager;