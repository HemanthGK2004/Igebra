import React, { useState } from 'react';
import { 
  Zap, 
  Trophy, 
  Calendar,
  Users,
  Target,
  Clock,
  Star,
  TrendingUp,
  Award,
  CheckCircle,
  Play,
  Flag
} from 'lucide-react';

const Challenges: React.FC = () => {
  const [activeTab, setActiveTab] = useState('active');

  const activeChallenges = [
    {
      id: 1,
      title: '7-Day Study Streak',
      description: 'Study for at least 30 minutes every day for 7 consecutive days',
      type: 'weekly',
      category: 'Consistency',
      points: 500,
      startDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      endDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
      participants: 1247,
      progress: 60,
      isJoined: true,
      requirements: [
        { type: 'study_time', target: 210, current: 126 }, // 7 days * 30 minutes
        { type: 'streak_days', target: 7, current: 4 }
      ],
      rewards: ['Study Streak Badge', '500 XP', 'Leaderboard Recognition']
    },
    {
      id: 2,
      title: 'Flashcard Master',
      description: 'Review 100 flashcards with 80%+ accuracy this week',
      type: 'weekly',
      category: 'Learning',
      points: 300,
      startDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      participants: 892,
      progress: 45,
      isJoined: true,
      requirements: [
        { type: 'flashcards_reviewed', target: 100, current: 45 }
      ],
      rewards: ['Flashcard Expert Badge', '300 XP', 'Study Tips Guide']
    },
    {
      id: 3,
      title: 'Quiz Champion',
      description: 'Score 90%+ on 5 different quizzes this month',
      type: 'monthly',
      category: 'Assessment',
      points: 750,
      startDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      endDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
      participants: 2156,
      progress: 40,
      isJoined: false,
      requirements: [
        { type: 'quiz_score', target: 5, current: 2 }
      ],
      rewards: ['Quiz Master Badge', '750 XP', 'Premium Features Access']
    }
  ];

  const availableChallenges = [
    {
      id: 4,
      title: 'Note Taking Pro',
      description: 'Create 20 well-structured notes with summaries',
      type: 'weekly',
      category: 'Organization',
      points: 400,
      startDate: new Date(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      participants: 567,
      difficulty: 'Medium',
      estimatedTime: '2-3 hours',
      requirements: [
        { type: 'notes_created', target: 20, current: 0 }
      ],
      rewards: ['Organization Expert Badge', '400 XP', 'Note Templates']
    },
    {
      id: 5,
      title: 'Community Helper',
      description: 'Help 10 students by answering their questions',
      type: 'monthly',
      category: 'Community',
      points: 600,
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      participants: 234,
      difficulty: 'Easy',
      estimatedTime: '1-2 hours',
      requirements: [
        { type: 'helpful_answers', target: 10, current: 0 }
      ],
      rewards: ['Community Star Badge', '600 XP', 'Mentor Status']
    },
    {
      id: 6,
      title: 'Focus Master',
      description: 'Complete 25 Pomodoro sessions with 90%+ focus score',
      type: 'weekly',
      category: 'Productivity',
      points: 450,
      startDate: new Date(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      participants: 789,
      difficulty: 'Hard',
      estimatedTime: '10+ hours',
      requirements: [
        { type: 'pomodoro_sessions', target: 25, current: 0 }
      ],
      rewards: ['Focus Expert Badge', '450 XP', 'Productivity Tools']
    }
  ];

  const completedChallenges = [
    {
      id: 7,
      title: 'Study Buddy Connector',
      description: 'Connect with 5 new study buddies',
      type: 'monthly',
      category: 'Social',
      points: 350,
      completedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      finalScore: 100,
      rank: 23,
      totalParticipants: 1456,
      rewards: ['Social Butterfly Badge', '350 XP', 'Profile Boost']
    },
    {
      id: 8,
      title: 'Knowledge Sharer',
      description: 'Share 10 helpful resources with the community',
      type: 'weekly',
      category: 'Community',
      points: 250,
      completedDate: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
      finalScore: 100,
      rank: 8,
      totalParticipants: 567,
      rewards: ['Knowledge Guru Badge', '250 XP', 'Featured Profile']
    }
  ];

  const getDaysRemaining = (endDate: Date) => {
    const now = new Date();
    const diffTime = endDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'from-green-500 to-green-600';
    if (progress >= 50) return 'from-yellow-500 to-yellow-600';
    return 'from-blue-500 to-blue-600';
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-700';
      case 'Medium': return 'bg-yellow-100 text-yellow-700';
      case 'Hard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-full">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Study Challenges</h1>
          <p className="text-gray-600">Join challenges to boost your learning and earn rewards</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{activeChallenges.filter(c => c.isJoined).length}</p>
            <p className="text-sm text-gray-500">Active Challenges</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{completedChallenges.length}</p>
            <p className="text-sm text-gray-500">Completed</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {activeChallenges.filter(c => c.isJoined).reduce((acc, c) => acc + c.points, 0) + 
               completedChallenges.reduce((acc, c) => acc + c.points, 0)}
            </p>
            <p className="text-sm text-gray-500">Total Points</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">12</p>
            <p className="text-sm text-gray-500">Badges Earned</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-8">
          <div className="flex border-b border-gray-100">
            <button
              onClick={() => setActiveTab('active')}
              className={`flex-1 px-6 py-4 font-medium transition-colors ${
                activeTab === 'active'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              My Challenges ({activeChallenges.filter(c => c.isJoined).length})
            </button>
            <button
              onClick={() => setActiveTab('available')}
              className={`flex-1 px-6 py-4 font-medium transition-colors ${
                activeTab === 'available'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Available Challenges
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`flex-1 px-6 py-4 font-medium transition-colors ${
                activeTab === 'completed'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Completed ({completedChallenges.length})
            </button>
          </div>

          {activeTab === 'active' && (
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {activeChallenges.filter(challenge => challenge.isJoined).map((challenge) => (
                  <div key={challenge.id} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{challenge.title}</h3>
                        <p className="text-sm text-gray-600">{challenge.description}</p>
                      </div>
                      <span className={`px-3 py-1 text-xs rounded-full ${
                        challenge.type === 'daily' ? 'bg-green-100 text-green-700' :
                        challenge.type === 'weekly' ? 'bg-blue-100 text-blue-700' :
                        'bg-purple-100 text-purple-700'
                      }`}>
                        {challenge.type}
                      </span>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-medium">{challenge.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full bg-gradient-to-r ${getProgressColor(challenge.progress)}`}
                          style={{ width: `${challenge.progress}%` }}
                        />
                      </div>

                      {challenge.requirements.map((req, index) => (
                        <div key={index} className="flex justify-between items-center text-sm">
                          <span className="text-gray-600 capitalize">
                            {req.type.replace('_', ' ')}
                          </span>
                          <span className="font-medium">
                            {req.current}/{req.target}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {challenge.participants} participants
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {getDaysRemaining(challenge.endDate)} days left
                      </span>
                      <span className="flex items-center">
                        <Star className="w-4 h-4 mr-1" />
                        {challenge.points} points
                      </span>
                    </div>

                    <div className="flex space-x-3">
                      <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors">
                        View Progress
                      </button>
                      <button className="px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 rounded-lg font-medium transition-colors">
                        Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'available' && (
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {availableChallenges.map((challenge) => (
                  <div key={challenge.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-200">
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">{challenge.title}</h3>
                          <p className="text-sm text-gray-600">{challenge.description}</p>
                        </div>
                        <span className={`px-2 py-1 text-xs rounded-full ${getDifficultyColor(challenge.difficulty)}`}>
                          {challenge.difficulty}
                        </span>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-600">Category</span>
                          <span className="font-medium">{challenge.category}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-600">Duration</span>
                          <span className="font-medium">{challenge.type}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-600">Est. Time</span>
                          <span className="font-medium">{challenge.estimatedTime}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <span className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {challenge.participants} joined
                        </span>
                        <span className="flex items-center">
                          <Star className="w-4 h-4 mr-1" />
                          {challenge.points} points
                        </span>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm text-gray-600 mb-2">Rewards:</p>
                        <div className="flex flex-wrap gap-1">
                          {challenge.rewards.map((reward, index) => (
                            <span key={index} className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">
                              {reward}
                            </span>
                          ))}
                        </div>
                      </div>

                      <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2">
                        <Play className="w-4 h-4" />
                        <span>Join Challenge</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'completed' && (
            <div className="p-6">
              <div className="space-y-4">
                {completedChallenges.map((challenge) => (
                  <div key={challenge.id} className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                          <CheckCircle className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">{challenge.title}</h3>
                          <p className="text-sm text-gray-600 mb-2">{challenge.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>Completed {challenge.completedDate.toLocaleDateString()}</span>
                            <span>Rank #{challenge.rank} of {challenge.totalParticipants}</span>
                            <span className="flex items-center">
                              <Star className="w-4 h-4 mr-1" />
                              {challenge.points} points earned
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600 mb-1">{challenge.finalScore}%</div>
                        <div className="text-sm text-gray-500">Final Score</div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-sm text-gray-600 mb-2">Rewards Earned:</p>
                      <div className="flex flex-wrap gap-2">
                        {challenge.rewards.map((reward, index) => (
                          <span key={index} className="px-3 py-1 bg-green-200 text-green-800 text-sm rounded-full">
                            ✓ {reward}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Challenges;