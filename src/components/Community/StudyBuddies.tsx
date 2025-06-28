import React, { useState } from 'react';
import { 
  UserPlus, 
  Search, 
  Filter,
  MapPin,
  Clock,
  Star,
  MessageCircle,
  Calendar,
  BookOpen,
  Target,
  Globe,
  Users,
  Heart,
  CheckCircle,
  X
} from 'lucide-react';

const StudyBuddies: React.FC = () => {
  const [activeTab, setActiveTab] = useState('discover');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');

  const myBuddies = [
    {
      id: 1,
      name: 'Sarah Chen',
      avatar: 'SC',
      subjects: ['Mathematics', 'Physics'],
      studyLevel: 'advanced',
      timezone: 'EST',
      isOnline: true,
      lastSeen: new Date(),
      matchScore: 95,
      studyStreak: 15,
      preferredTimes: ['Morning', 'Evening'],
      studyGoals: ['Calculus Mastery', 'Physics Olympiad'],
      connectionDate: '2 weeks ago',
      sessionsCompleted: 8,
      mutualFriends: 3
    },
    {
      id: 2,
      name: 'Mike Johnson',
      avatar: 'MJ',
      subjects: ['Computer Science', 'Mathematics'],
      studyLevel: 'intermediate',
      timezone: 'PST',
      isOnline: false,
      lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      matchScore: 88,
      studyStreak: 7,
      preferredTimes: ['Afternoon', 'Evening'],
      studyGoals: ['Data Structures', 'Algorithm Design'],
      connectionDate: '1 month ago',
      sessionsCompleted: 12,
      mutualFriends: 1
    },
    {
      id: 3,
      name: 'Emma Wilson',
      avatar: 'EW',
      subjects: ['Chemistry', 'Biology'],
      studyLevel: 'intermediate',
      timezone: 'GMT',
      isOnline: true,
      lastSeen: new Date(),
      matchScore: 92,
      studyStreak: 23,
      preferredTimes: ['Morning', 'Afternoon'],
      studyGoals: ['Organic Chemistry', 'Medical School Prep'],
      connectionDate: '3 weeks ago',
      sessionsCompleted: 15,
      mutualFriends: 5
    }
  ];

  const suggestedBuddies = [
    {
      id: 4,
      name: 'David Lee',
      avatar: 'DL',
      subjects: ['Physics', 'Mathematics'],
      studyLevel: 'advanced',
      timezone: 'EST',
      isOnline: true,
      lastSeen: new Date(),
      matchScore: 94,
      studyStreak: 28,
      preferredTimes: ['Evening', 'Night'],
      studyGoals: ['Quantum Physics', 'Advanced Calculus'],
      mutualFriends: 2,
      commonInterests: ['Problem Solving', 'Research'],
      bio: 'Physics PhD student passionate about quantum mechanics and mathematical modeling.'
    },
    {
      id: 5,
      name: 'Lisa Zhang',
      avatar: 'LZ',
      subjects: ['Computer Science', 'Mathematics'],
      studyLevel: 'intermediate',
      timezone: 'PST',
      isOnline: false,
      lastSeen: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      matchScore: 87,
      studyStreak: 12,
      preferredTimes: ['Morning', 'Afternoon'],
      studyGoals: ['Machine Learning', 'Statistics'],
      mutualFriends: 4,
      commonInterests: ['AI/ML', 'Data Science'],
      bio: 'Computer Science major focusing on machine learning and data analysis.'
    },
    {
      id: 6,
      name: 'Alex Rodriguez',
      avatar: 'AR',
      subjects: ['Chemistry', 'Biology'],
      studyLevel: 'beginner',
      timezone: 'CST',
      isOnline: true,
      lastSeen: new Date(),
      matchScore: 82,
      studyStreak: 5,
      preferredTimes: ['Afternoon', 'Evening'],
      studyGoals: ['General Chemistry', 'Biology Fundamentals'],
      mutualFriends: 1,
      commonInterests: ['Lab Work', 'Study Groups'],
      bio: 'Pre-med student looking for study partners in chemistry and biology.'
    }
  ];

  const subjects = ['all', 'Mathematics', 'Physics', 'Computer Science', 'Chemistry', 'Biology', 'Literature', 'History'];
  const studyLevels = ['all', 'beginner', 'intermediate', 'advanced'];

  const formatLastSeen = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="p-8 bg-gray-50 min-h-full">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Study Buddies</h1>
          <p className="text-gray-600">Find and connect with study partners who share your academic goals</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-8">
          <div className="flex border-b border-gray-100">
            <button
              onClick={() => setActiveTab('discover')}
              className={`flex-1 px-6 py-4 font-medium transition-colors ${
                activeTab === 'discover'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Discover Buddies
            </button>
            <button
              onClick={() => setActiveTab('my-buddies')}
              className={`flex-1 px-6 py-4 font-medium transition-colors ${
                activeTab === 'my-buddies'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              My Study Buddies ({myBuddies.length})
            </button>
            <button
              onClick={() => setActiveTab('requests')}
              className={`flex-1 px-6 py-4 font-medium transition-colors relative ${
                activeTab === 'requests'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Requests
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </button>
          </div>

          {activeTab === 'discover' && (
            <div className="p-6">
              {/* Search and Filters */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 mb-6">
                <div className="flex-1 max-w-md">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search study buddies..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  >
                    {subjects.map(subject => (
                      <option key={subject} value={subject}>
                        {subject === 'all' ? 'All Subjects' : subject}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Suggested Buddies */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {suggestedBuddies.map((buddy) => (
                  <div key={buddy.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-200">
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="relative">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                              <span className="text-white font-bold">{buddy.avatar}</span>
                            </div>
                            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                              buddy.isOnline ? 'bg-green-500' : 'bg-gray-400'
                            }`}></div>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{buddy.name}</h3>
                            <p className="text-sm text-gray-500">{buddy.studyLevel} level</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-1 mb-1">
                            <Heart className="w-4 h-4 text-red-500" />
                            <span className="text-sm font-medium text-gray-900">{buddy.matchScore}%</span>
                          </div>
                          <p className="text-xs text-gray-500">match</p>
                        </div>
                      </div>

                      <p className="text-gray-600 text-sm mb-4">{buddy.bio}</p>

                      <div className="space-y-3 mb-4">
                        <div className="flex items-center space-x-2">
                          <BookOpen className="w-4 h-4 text-gray-400" />
                          <div className="flex flex-wrap gap-1">
                            {buddy.subjects.map((subject, index) => (
                              <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                                {subject}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center">
                            <Globe className="w-4 h-4 mr-1" />
                            {buddy.timezone}
                          </span>
                          <span className="flex items-center">
                            <Target className="w-4 h-4 mr-1" />
                            {buddy.studyStreak} day streak
                          </span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <div className="flex flex-wrap gap-1">
                            {buddy.preferredTimes.map((time, index) => (
                              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                                {time}
                              </span>
                            ))}
                          </div>
                        </div>

                        {buddy.mutualFriends > 0 && (
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <Users className="w-4 h-4" />
                            <span>{buddy.mutualFriends} mutual connections</span>
                          </div>
                        )}
                      </div>

                      <div className="flex space-x-2">
                        <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
                          <UserPlus className="w-4 h-4" />
                          <span>Connect</span>
                        </button>
                        <button className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors">
                          <MessageCircle className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'my-buddies' && (
            <div className="p-6">
              <div className="space-y-4">
                {myBuddies.map((buddy) => (
                  <div key={buddy.id} className="bg-white rounded-xl border border-gray-200 hover:border-blue-300 transition-colors p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="relative">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold">{buddy.avatar}</span>
                          </div>
                          <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                            buddy.isOnline ? 'bg-green-500' : 'bg-gray-400'
                          }`}></div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-semibold text-gray-900">{buddy.name}</h3>
                            <div className="flex items-center space-x-1">
                              <Heart className="w-4 h-4 text-red-500" />
                              <span className="text-sm font-medium text-gray-900">{buddy.matchScore}%</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                            <span>{buddy.isOnline ? 'Online now' : `Last seen ${formatLastSeen(buddy.lastSeen)}`}</span>
                            <span>Connected {buddy.connectionDate}</span>
                            <span>{buddy.sessionsCompleted} sessions completed</span>
                          </div>
                          <div className="flex flex-wrap gap-2 mb-2">
                            {buddy.subjects.map((subject, index) => (
                              <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                                {subject}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <Target className="w-4 h-4 mr-1" />
                              {buddy.studyStreak} day streak
                            </span>
                            <span className="flex items-center">
                              <Users className="w-4 h-4 mr-1" />
                              {buddy.mutualFriends} mutual friends
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex space-x-3">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2">
                        <MessageCircle className="w-4 h-4" />
                        <span>Message</span>
                      </button>
                      <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>Schedule Session</span>
                      </button>
                      <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors">
                        View Profile
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'requests' && (
            <div className="p-6">
              <div className="space-y-4">
                {/* Incoming Requests */}
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">JD</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">John Doe wants to connect</h3>
                        <p className="text-sm text-gray-600">Mathematics, Physics • Advanced level</p>
                        <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg text-sm transition-colors flex items-center space-x-1">
                        <CheckCircle className="w-4 h-4" />
                        <span>Accept</span>
                      </button>
                      <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded-lg text-sm transition-colors flex items-center space-x-1">
                        <X className="w-4 h-4" />
                        <span>Decline</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">KS</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">Kate Smith wants to connect</h3>
                        <p className="text-sm text-gray-600">Chemistry, Biology • Intermediate level</p>
                        <p className="text-xs text-gray-500 mt-1">5 hours ago</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg text-sm transition-colors flex items-center space-x-1">
                        <CheckCircle className="w-4 h-4" />
                        <span>Accept</span>
                      </button>
                      <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded-lg text-sm transition-colors flex items-center space-x-1">
                        <X className="w-4 h-4" />
                        <span>Decline</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">RT</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">Ryan Taylor wants to connect</h3>
                        <p className="text-sm text-gray-600">Computer Science • Beginner level</p>
                        <p className="text-xs text-gray-500 mt-1">1 day ago</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg text-sm transition-colors flex items-center space-x-1">
                        <CheckCircle className="w-4 h-4" />
                        <span>Accept</span>
                      </button>
                      <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded-lg text-sm transition-colors flex items-center space-x-1">
                        <X className="w-4 h-4" />
                        <span>Decline</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudyBuddies;