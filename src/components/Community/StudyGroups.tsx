import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Search, 
  Filter,
  MapPin,
  Clock,
  Star,
  Lock,
  Globe,
  Calendar,
  BookOpen,
  MessageCircle,
  UserPlus,
  Settings
} from 'lucide-react';

const StudyGroups: React.FC = () => {
  const [activeTab, setActiveTab] = useState('discover');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');

  const myGroups = [
    {
      id: 1,
      name: 'Advanced Calculus Study Circle',
      subject: 'Mathematics',
      members: 24,
      maxMembers: 30,
      isPrivate: false,
      avatar: 'AC',
      description: 'Weekly sessions focusing on advanced calculus concepts and problem-solving',
      nextSession: 'Tomorrow, 7:00 PM',
      role: 'admin',
      unreadMessages: 5,
      isActive: true
    },
    {
      id: 2,
      name: 'Organic Chemistry Lab Partners',
      subject: 'Chemistry',
      members: 12,
      maxMembers: 15,
      isPrivate: true,
      avatar: 'OC',
      description: 'Collaborative lab work and exam preparation for organic chemistry',
      nextSession: 'Friday, 3:00 PM',
      role: 'member',
      unreadMessages: 2,
      isActive: true
    },
    {
      id: 3,
      name: 'Data Structures & Algorithms',
      subject: 'Computer Science',
      members: 45,
      maxMembers: 50,
      isPrivate: false,
      avatar: 'DS',
      description: 'Coding practice sessions and algorithm discussions',
      nextSession: 'Sunday, 2:00 PM',
      role: 'moderator',
      unreadMessages: 12,
      isActive: false
    }
  ];

  const discoverGroups = [
    {
      id: 4,
      name: 'Physics Problem Solvers',
      subject: 'Physics',
      members: 18,
      maxMembers: 25,
      isPrivate: false,
      avatar: 'PP',
      description: 'Tackle challenging physics problems together and share solving strategies',
      rating: 4.8,
      tags: ['Problem Solving', 'Mechanics', 'Thermodynamics'],
      recentActivity: '2 hours ago',
      isPopular: true
    },
    {
      id: 5,
      name: 'Spanish Conversation Practice',
      subject: 'Languages',
      members: 32,
      maxMembers: 40,
      isPrivate: false,
      avatar: 'SP',
      description: 'Practice Spanish conversation skills in a supportive environment',
      rating: 4.9,
      tags: ['Conversation', 'Grammar', 'Culture'],
      recentActivity: '1 hour ago',
      isPopular: true
    },
    {
      id: 6,
      name: 'Medical School Prep',
      subject: 'Medicine',
      members: 67,
      maxMembers: 80,
      isPrivate: false,
      avatar: 'MS',
      description: 'MCAT preparation and medical school application support',
      rating: 4.7,
      tags: ['MCAT', 'Applications', 'Study Tips'],
      recentActivity: '30 minutes ago',
      isPopular: false
    },
    {
      id: 7,
      name: 'History Essay Writing Workshop',
      subject: 'History',
      members: 15,
      maxMembers: 20,
      isPrivate: false,
      avatar: 'HE',
      description: 'Improve your historical analysis and essay writing skills',
      rating: 4.6,
      tags: ['Essay Writing', 'Research', 'Analysis'],
      recentActivity: '4 hours ago',
      isPopular: false
    }
  ];

  const subjects = ['all', 'Mathematics', 'Chemistry', 'Physics', 'Computer Science', 'Languages', 'Medicine', 'History', 'Biology', 'Literature'];

  const filteredGroups = discoverGroups.filter(group => {
    const matchesSearch = searchTerm === '' || 
      group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSubject = selectedSubject === 'all' || group.subject === selectedSubject;
    
    return matchesSearch && matchesSubject;
  });

  return (
    <div className="p-8 bg-gray-50 min-h-full">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Study Groups</h1>
            <p className="text-gray-600">Join or create study groups to learn together</p>
          </div>
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl">
            <Plus className="w-5 h-5" />
            <span>Create Group</span>
          </button>
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
              Discover Groups
            </button>
            <button
              onClick={() => setActiveTab('my-groups')}
              className={`flex-1 px-6 py-4 font-medium transition-colors relative ${
                activeTab === 'my-groups'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              My Groups
              {myGroups.reduce((acc, group) => acc + group.unreadMessages, 0) > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {myGroups.reduce((acc, group) => acc + group.unreadMessages, 0)}
                </span>
              )}
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
                      placeholder="Search study groups..."
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

              {/* Groups Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGroups.map((group) => (
                  <div key={group.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-200 group">
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                            <span className="text-white font-bold">{group.avatar}</span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{group.name}</h3>
                            <p className="text-sm text-gray-500">{group.subject}</p>
                          </div>
                        </div>
                        {group.isPopular && (
                          <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full flex items-center">
                            🔥 Popular
                          </span>
                        )}
                      </div>

                      <p className="text-gray-600 text-sm mb-4">{group.description}</p>

                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                        <span className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {group.members}/{group.maxMembers}
                        </span>
                        <span className="flex items-center">
                          <Star className="w-4 h-4 mr-1 text-yellow-500" />
                          {group.rating}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {group.recentActivity}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {group.tags.map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="w-full bg-gray-200 rounded-full h-2 mr-3">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full" 
                            style={{ width: `${(group.members / group.maxMembers) * 100}%` }}
                          ></div>
                        </div>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 whitespace-nowrap">
                          <UserPlus className="w-4 h-4" />
                          <span>Join</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'my-groups' && (
            <div className="p-6">
              <div className="space-y-4">
                {myGroups.map((group) => (
                  <div key={group.id} className="bg-white rounded-xl border border-gray-200 hover:border-blue-300 transition-colors p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                          <span className="text-white font-bold">{group.avatar}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-semibold text-gray-900">{group.name}</h3>
                            {group.isPrivate ? (
                              <Lock className="w-4 h-4 text-gray-400" />
                            ) : (
                              <Globe className="w-4 h-4 text-gray-400" />
                            )}
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              group.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                              group.role === 'moderator' ? 'bg-blue-100 text-blue-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {group.role}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{group.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <Users className="w-4 h-4 mr-1" />
                              {group.members}/{group.maxMembers} members
                            </span>
                            <span className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {group.nextSession}
                            </span>
                            {group.unreadMessages > 0 && (
                              <span className="flex items-center text-blue-600">
                                <MessageCircle className="w-4 h-4 mr-1" />
                                {group.unreadMessages} new messages
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${group.isActive ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <Settings className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    </div>
                    <div className="mt-4 flex space-x-3">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2">
                        <MessageCircle className="w-4 h-4" />
                        <span>Open Chat</span>
                      </button>
                      <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2">
                        <BookOpen className="w-4 h-4" />
                        <span>View Resources</span>
                      </button>
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

export default StudyGroups;