import React, { useState } from 'react';
import { 
  Trophy, 
  Medal, 
  Award,
  TrendingUp,
  TrendingDown,
  Minus,
  Crown,
  Star,
  Target,
  Calendar,
  Users,
  Zap
} from 'lucide-react';

const Leaderboard: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('weekly');
  const [selectedCategory, setSelectedCategory] = useState('overall');

  const leaderboardData = {
    weekly: [
      { rank: 1, userId: '1', username: 'Sarah Chen', avatar: 'SC', score: 2450, change: 2, badge: 'Study Master', streak: 15, level: 12 },
      { rank: 2, userId: '2', username: 'Mike Johnson', avatar: 'MJ', score: 2380, change: -1, badge: 'Quiz Champion', streak: 8, level: 11 },
      { rank: 3, userId: '3', username: 'Emma Wilson', avatar: 'EW', score: 2290, change: 1, badge: 'Note Ninja', streak: 23, level: 10 },
      { rank: 4, userId: '4', username: 'David Lee', avatar: 'DL', score: 2150, change: 3, badge: 'Flashcard Pro', streak: 12, level: 9 },
      { rank: 5, userId: '5', username: 'Lisa Zhang', avatar: 'LZ', score: 2080, change: -2, badge: 'Community Helper', streak: 6, level: 8 },
      { rank: 6, userId: '6', username: 'Alex Rodriguez', avatar: 'AR', score: 1950, change: 0, badge: 'Focus Master', streak: 4, level: 7 },
      { rank: 7, userId: '7', username: 'Kate Smith', avatar: 'KS', score: 1890, change: 4, badge: 'Study Buddy', streak: 9, level: 7 },
      { rank: 8, userId: '8', username: 'John Doe', avatar: 'JD', score: 1820, change: -1, badge: 'Knowledge Seeker', streak: 3, level: 6 },
      { rank: 9, userId: '9', username: 'Ryan Taylor', avatar: 'RT', score: 1750, change: 2, badge: 'Goal Crusher', streak: 11, level: 6 },
      { rank: 10, userId: '10', username: 'Amy Brown', avatar: 'AB', score: 1680, change: -3, badge: 'Time Manager', streak: 7, level: 5 }
    ]
  };

  const currentUserRank = 15;
  const currentUserScore = 1420;

  const categories = [
    { id: 'overall', label: 'Overall Score', icon: Trophy },
    { id: 'study-time', label: 'Study Time', icon: Target },
    { id: 'quiz-scores', label: 'Quiz Scores', icon: Award },
    { id: 'community', label: 'Community Points', icon: Users },
    { id: 'streaks', label: 'Study Streaks', icon: Zap }
  ];

  const periods = [
    { id: 'daily', label: 'Today' },
    { id: 'weekly', label: 'This Week' },
    { id: 'monthly', label: 'This Month' },
    { id: 'all-time', label: 'All Time' }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="text-lg font-bold text-gray-600">#{rank}</span>;
    }
  };

  const getChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (change < 0) return <TrendingDown className="w-4 h-4 text-red-500" />;
    return <Minus className="w-4 h-4 text-gray-400" />;
  };

  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-green-600';
    if (change < 0) return 'text-red-600';
    return 'text-gray-500';
  };

  const getRankBadgeColor = (rank: number) => {
    if (rank === 1) return 'from-yellow-400 to-yellow-500';
    if (rank === 2) return 'from-gray-300 to-gray-400';
    if (rank === 3) return 'from-amber-500 to-amber-600';
    if (rank <= 10) return 'from-blue-500 to-blue-600';
    return 'from-gray-400 to-gray-500';
  };

  return (
    <div className="p-8 bg-gray-50 min-h-full">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Leaderboard</h1>
          <p className="text-gray-600">See how you rank among fellow students</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                      selectedCategory === category.id
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{category.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex space-x-2">
              {periods.map((period) => (
                <button
                  key={period.id}
                  onClick={() => setSelectedPeriod(period.id)}
                  className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                    selectedPeriod === period.id
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {period.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Top 3 Podium */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">Top Performers</h2>
          <div className="flex items-end justify-center space-x-8">
            {/* 2nd Place */}
            <div className="text-center">
              <div className="relative mb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-white text-xl font-bold">{leaderboardData.weekly[1].avatar}</span>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">2</span>
                </div>
              </div>
              <h3 className="font-semibold text-gray-900">{leaderboardData.weekly[1].username}</h3>
              <p className="text-sm text-gray-500 mb-2">{leaderboardData.weekly[1].score} points</p>
              <div className="w-16 h-20 bg-gradient-to-t from-gray-300 to-gray-200 rounded-t-lg mx-auto"></div>
            </div>

            {/* 1st Place */}
            <div className="text-center">
              <div className="relative mb-4">
                <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-white text-2xl font-bold">{leaderboardData.weekly[0].avatar}</span>
                </div>
                <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center">
                  <Crown className="w-5 h-5 text-white" />
                </div>
              </div>
              <h3 className="font-semibold text-gray-900">{leaderboardData.weekly[0].username}</h3>
              <p className="text-sm text-gray-500 mb-2">{leaderboardData.weekly[0].score} points</p>
              <div className="w-16 h-24 bg-gradient-to-t from-yellow-400 to-yellow-300 rounded-t-lg mx-auto"></div>
            </div>

            {/* 3rd Place */}
            <div className="text-center">
              <div className="relative mb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-white text-xl font-bold">{leaderboardData.weekly[2].avatar}</span>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">3</span>
                </div>
              </div>
              <h3 className="font-semibold text-gray-900">{leaderboardData.weekly[2].username}</h3>
              <p className="text-sm text-gray-500 mb-2">{leaderboardData.weekly[2].score} points</p>
              <div className="w-16 h-16 bg-gradient-to-t from-amber-500 to-amber-400 rounded-t-lg mx-auto"></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Full Leaderboard */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">Full Rankings</h2>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {leaderboardData.weekly.map((user, index) => (
                    <div key={user.userId} className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-200 ${
                      user.rank <= 3 ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200' : 'hover:bg-gray-50'
                    }`}>
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 bg-gradient-to-br ${getRankBadgeColor(user.rank)} rounded-full flex items-center justify-center`}>
                          {user.rank <= 3 ? (
                            getRankIcon(user.rank)
                          ) : (
                            <span className="text-white font-bold">#{user.rank}</span>
                          )}
                        </div>
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold">{user.avatar}</span>
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-gray-900">{user.username}</h3>
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                            {user.badge}
                          </span>
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                            Level {user.level}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>{user.score} points</span>
                          <span className="flex items-center">
                            <Zap className="w-3 h-3 mr-1" />
                            {user.streak} day streak
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        {getChangeIcon(user.change)}
                        <span className={`text-sm font-medium ${getChangeColor(user.change)}`}>
                          {user.change > 0 ? `+${user.change}` : user.change}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Current User Position */}
                <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">#{currentUserRank}</span>
                      </div>
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">AS</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Alex Student (You)</h3>
                        <p className="text-sm text-gray-600">{currentUserScore} points</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Your Rank</p>
                      <p className="text-2xl font-bold text-blue-600">#{currentUserRank}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Stats */}
          <div className="space-y-6">
            {/* Weekly Stats */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-blue-500" />
                This Week's Stats
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Points Earned</span>
                  <span className="font-semibold text-gray-900">+245</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Rank Change</span>
                  <span className="font-semibold text-green-600">+3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Study Time</span>
                  <span className="font-semibold text-gray-900">12.5h</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Challenges Won</span>
                  <span className="font-semibold text-gray-900">2</span>
                </div>
              </div>
            </div>

            {/* Achievement Progress */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Star className="w-5 h-5 mr-2 text-yellow-500" />
                Next Achievement
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Top 10 Climber</h4>
                    <p className="text-sm text-gray-600">Reach top 10 ranking</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium">Rank 15/10</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full" style={{ width: '50%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
              <h3 className="font-semibold text-gray-900 mb-4">Boost Your Rank</h3>
              <div className="space-y-3">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors text-sm">
                  Take a Quiz (+50 pts)
                </button>
                <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition-colors text-sm">
                  Study Session (+30 pts)
                </button>
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-medium transition-colors text-sm">
                  Help Others (+25 pts)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;