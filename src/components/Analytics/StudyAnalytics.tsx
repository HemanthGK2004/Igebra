import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Clock, 
  Target, 
  Calendar,
  BarChart3,
  PieChart,
  Activity,
  Award
} from 'lucide-react';
import { storage } from '../../utils/storage';
import { StudySession, Note, Flashcard, StudyStreak } from '../../types';
import { format, subDays, isWithinInterval, startOfWeek, endOfWeek } from 'date-fns';

const StudyAnalytics: React.FC = () => {
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [streak, setStreak] = useState<StudyStreak>({
    currentStreak: 0,
    longestStreak: 0,
    lastStudyDate: new Date(),
    totalDays: 0
  });
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('week');

  useEffect(() => {
    setSessions(storage.getSessions());
    setNotes(storage.getNotes());
    setFlashcards(storage.getFlashcards());
    setStreak(storage.getStreak());
  }, []);

  const getFilteredSessions = () => {
    const now = new Date();
    const startDate = timeRange === 'week' 
      ? subDays(now, 7)
      : timeRange === 'month'
      ? subDays(now, 30)
      : subDays(now, 365);

    return sessions.filter(session => 
      isWithinInterval(session.date, { start: startDate, end: now })
    );
  };

  const filteredSessions = getFilteredSessions();
  const totalStudyTime = filteredSessions.reduce((acc, session) => acc + session.duration, 0);
  const averageAccuracy = filteredSessions.length > 0 
    ? Math.round(filteredSessions.reduce((acc, session) => acc + session.accuracy, 0) / filteredSessions.length)
    : 0;
  const averageSessionLength = filteredSessions.length > 0
    ? Math.round(totalStudyTime / filteredSessions.length)
    : 0;

  // Weekly progress data
  const weeklyData = Array.from({ length: 7 }, (_, i) => {
    const date = subDays(new Date(), 6 - i);
    const dayName = format(date, 'EEE');
    const dayStudyTime = sessions
      .filter(session => format(session.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd'))
      .reduce((acc, session) => acc + session.duration, 0);
    
    return { day: dayName, time: dayStudyTime };
  });

  // Subject distribution
  const subjectData = notes.reduce((acc, note) => {
    acc[note.category] = (acc[note.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const subjectColors = [
    'bg-blue-500', 'bg-purple-500', 'bg-green-500', 'bg-yellow-500', 
    'bg-red-500', 'bg-indigo-500', 'bg-pink-500', 'bg-teal-500'
  ];

  const maxWeeklyTime = Math.max(...weeklyData.map(d => d.time), 1);

  return (
    <div className="p-8 bg-gray-50 min-h-full">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Study Analytics</h1>
            <p className="text-gray-600">Track your learning progress and insights</p>
          </div>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as 'week' | 'month' | 'year')}
            className="px-4 py-2 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
          >
            <option value="week">Last 7 Days</option>
            <option value="month">Last 30 Days</option>
            <option value="year">Last Year</option>
          </select>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-medium text-green-600">+12%</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{Math.round(totalStudyTime / 60)}h</p>
            <p className="text-sm text-gray-500">Total Study Time</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-medium text-green-600">+5%</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{averageAccuracy}%</p>
            <p className="text-sm text-gray-500">Average Accuracy</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-medium text-green-600">+8%</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{averageSessionLength}min</p>
            <p className="text-sm text-gray-500">Avg Session</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-medium text-green-600">+2</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{streak.currentStreak}</p>
            <p className="text-sm text-gray-500">Day Streak</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Weekly Progress Chart */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Weekly Progress</h2>
                <BarChart3 className="w-5 h-5 text-gray-400" />
              </div>
              
              <div className="space-y-4">
                {weeklyData.map((data, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-12 text-sm font-medium text-gray-600">{data.day}</div>
                    <div className="flex-1 bg-gray-200 rounded-full h-3 relative">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${(data.time / maxWeeklyTime) * 100}%` }}
                      />
                    </div>
                    <div className="w-16 text-sm font-medium text-gray-900 text-right">
                      {data.time}min
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-blue-900">Weekly Insights</span>
                </div>
                <p className="text-sm text-blue-700">
                  Your most productive day this week was {weeklyData.reduce((max, day) => 
                    day.time > max.time ? day : max
                  ).day} with {Math.max(...weeklyData.map(d => d.time))} minutes of study time.
                </p>
              </div>
            </div>
          </div>

          {/* Subject Distribution & Streak */}
          <div className="space-y-6">
            {/* Subject Distribution */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-gray-900">Subject Distribution</h3>
                <PieChart className="w-5 h-5 text-gray-400" />
              </div>
              
              <div className="space-y-3">
                {Object.entries(subjectData).map(([subject, count], index) => {
                  const percentage = Math.round((count / notes.length) * 100);
                  return (
                    <div key={subject} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${subjectColors[index % subjectColors.length]}`} />
                        <span className="text-sm font-medium text-gray-900">{subject}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${subjectColors[index % subjectColors.length]}`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600 w-8">{count}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Study Streak */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-100">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Study Streak</h3>
                  <p className="text-sm text-gray-600">Keep the momentum going!</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Current Streak</span>
                  <span className="text-2xl font-bold text-orange-600">{streak.currentStreak} days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Longest Streak</span>
                  <span className="font-semibold text-gray-900">{streak.longestStreak} days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Study Days</span>
                  <span className="font-semibold text-gray-900">{streak.totalDays} days</span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Notes</span>
                  <span className="font-semibold text-gray-900">{notes.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Flashcards</span>
                  <span className="font-semibold text-gray-900">{flashcards.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Study Sessions</span>
                  <span className="font-semibold text-gray-900">{sessions.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Flashcard Accuracy</span>
                  <span className="font-semibold text-green-600">
                    {flashcards.length > 0 
                      ? Math.round(flashcards.reduce((acc, card) => 
                          acc + (card.reviewCount > 0 ? card.correctCount / card.reviewCount : 0), 0
                        ) / flashcards.length * 100)
                      : 0
                    }%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyAnalytics;