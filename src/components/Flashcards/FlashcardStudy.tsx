import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft,
  RotateCcw,
  CheckCircle,
  XCircle,
  Eye,
  EyeOff,
  Trophy,
  Target
} from 'lucide-react';
import { Flashcard } from '../../types';
import { addDays } from 'date-fns';

interface FlashcardStudyProps {
  flashcards: Flashcard[];
  onComplete: (updatedCards: Flashcard[]) => void;
  onExit: () => void;
}

const FlashcardStudy: React.FC<FlashcardStudyProps> = ({ flashcards, onComplete, onExit }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [studiedCards, setStudiedCards] = useState<Flashcard[]>([]);
  const [sessionStats, setSessionStats] = useState({ correct: 0, total: 0 });

  const currentCard = flashcards[currentIndex];
  const progress = ((currentIndex + 1) / flashcards.length) * 100;

  const handleAnswer = (isCorrect: boolean) => {
    if (!currentCard) return;

    const updatedCard: Flashcard = {
      ...currentCard,
      reviewCount: currentCard.reviewCount + 1,
      correctCount: currentCard.correctCount + (isCorrect ? 1 : 0),
      nextReview: addDays(new Date(), isCorrect ? 3 : 1),
      difficulty: isCorrect 
        ? (currentCard.difficulty === 'hard' ? 'medium' : currentCard.difficulty === 'medium' ? 'easy' : 'easy')
        : (currentCard.difficulty === 'easy' ? 'medium' : currentCard.difficulty === 'medium' ? 'hard' : 'hard')
    };

    setStudiedCards([...studiedCards, updatedCard]);
    setSessionStats(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1
    }));

    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
    } else {
      // Study session complete
      onComplete([...studiedCards, updatedCard]);
    }
  };

  const resetCard = () => {
    setShowAnswer(false);
  };

  const skipCard = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
    }
  };

  if (flashcards.length === 0) {
    return (
      <div className="p-8 bg-gray-50 min-h-full flex items-center justify-center">
        <div className="text-center">
          <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No cards to study</h2>
          <p className="text-gray-600 mb-8">All caught up! Great job on your studies.</p>
          <button
            onClick={onExit}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200"
          >
            Back to Flashcards
          </button>
        </div>
      </div>
    );
  }

  if (currentIndex >= flashcards.length) {
    const accuracy = Math.round((sessionStats.correct / sessionStats.total) * 100);
    
    return (
      <div className="p-8 bg-gray-50 min-h-full flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Trophy className="w-10 h-10 text-white" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Study Session Complete!</h2>
            <p className="text-gray-600 mb-6">Great job on completing your flashcard review</p>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                <span className="text-gray-600">Cards Studied</span>
                <span className="font-bold text-gray-900">{sessionStats.total}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                <span className="text-gray-600">Correct Answers</span>
                <span className="font-bold text-green-600">{sessionStats.correct}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                <span className="text-gray-600">Accuracy</span>
                <span className={`font-bold ${
                  accuracy >= 80 ? 'text-green-600' :
                  accuracy >= 60 ? 'text-yellow-600' :
                  'text-red-600'
                }`}>
                  {accuracy}%
                </span>
              </div>
            </div>
            
            <button
              onClick={onExit}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl font-medium transition-all duration-200"
            >
              Finish Session
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-full">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onExit}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Exit Study</span>
          </button>
          
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">
              Card {currentIndex + 1} of {flashcards.length}
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Target className="w-4 h-4" />
              <span>{sessionStats.correct}/{sessionStats.total} correct</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Flashcard */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 min-h-96">
          <div className="p-8">
            {/* Card Header */}
            <div className="flex items-center justify-between mb-6">
              <span className={`px-3 py-1 text-sm rounded-full ${
                currentCard.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                currentCard.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {currentCard.difficulty}
              </span>
              
              <button
                onClick={() => setShowAnswer(!showAnswer)}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
              >
                {showAnswer ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                <span>{showAnswer ? 'Hide Answer' : 'Show Answer'}</span>
              </button>
            </div>

            {/* Question */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Question:</h3>
              <p className="text-xl text-gray-800 leading-relaxed">{currentCard.question}</p>
            </div>

            {/* Answer */}
            <div className={`transition-all duration-300 ${showAnswer ? 'opacity-100' : 'opacity-30'}`}>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Answer:</h3>
              <p className="text-xl text-gray-700 leading-relaxed">{currentCard.answer}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="border-t border-gray-100 p-6">
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={resetCard}
                className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors flex items-center space-x-2"
              >
                <RotateCcw className="w-5 h-5" />
                <span>Reset</span>
              </button>

              <button
                onClick={() => handleAnswer(false)}
                className="px-6 py-3 bg-red-100 hover:bg-red-200 text-red-700 rounded-xl font-medium transition-colors flex items-center space-x-2"
              >
                <XCircle className="w-5 h-5" />
                <span>Incorrect</span>
              </button>

              <button
                onClick={() => handleAnswer(true)}
                className="px-6 py-3 bg-green-100 hover:bg-green-200 text-green-700 rounded-xl font-medium transition-colors flex items-center space-x-2"
              >
                <CheckCircle className="w-5 h-5" />
                <span>Correct</span>
              </button>
            </div>

            <div className="mt-4 text-center">
              <button
                onClick={skipCard}
                className="text-gray-500 hover:text-gray-700 text-sm transition-colors"
              >
                Skip this card
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashcardStudy;