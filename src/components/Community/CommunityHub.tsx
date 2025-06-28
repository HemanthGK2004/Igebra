import React, { useState, useEffect } from 'react';
import { 
  Users, 
  MessageCircle, 
  TrendingUp, 
  Calendar,
  Award,
  Search,
  Filter,
  Plus,
  Star,
  Clock,
  Eye,
  ThumbsUp,
  BookOpen,
  Target,
  Zap,
  Bell,
  Globe,
  Heart,
  Share2,
  Bookmark
} from 'lucide-react';

const CommunityHub: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const communityStats = [
    { label: 'Active Students', value: '12,450', icon: Users, color: 'from-blue-500 to-blue-600', change: '+5.2%' },
    { label: 'Study Groups', value: '1,234', icon: Users, color: 'from-green-500 to-green-600', change: '+12%' },
    { label: 'Discussions', value: '8,901', icon: MessageCircle, color: 'from-purple-500 to-purple-600', change: '+8%' },
    { label: 'Resources Shared', value: '5,678', icon: BookOpen, color: 'from-orange-500 to-orange-600', change: '+15%' }
  ];

  const trendingTopics = [
    { title: 'Machine Learning Basics', posts: 234, trend: '+15%', category: 'AI/ML' },
    { title: 'Calculus Study Tips', posts: 189, trend: '+8%', category: 'Mathematics' },
    { title: 'Chemistry Lab Reports', posts: 156, trend: '+12%', category: 'Chemistry' },
    { title: 'History Essay Writing', posts: 143, trend: '+5%', category: 'History' },
    { title: 'Programming Fundamentals', posts: 128, trend: '+20%', category: 'Computer Science' }
  ];

  const recentDiscussions = [
    {
      id: 1,
      title: 'Best strategies for memorizing complex formulas?',
      author: 'Sarah Chen',
      avatar: 'SC',
      time: '2 hours ago',
      replies: 23,
      likes: 45,
      views: 156,
      category: 'Study Tips',
      isHot: true,
      tags: ['memory', 'formulas', 'tips']
    },
    {
      id: 2,
      title: 'Looking for study group - Data Structures & Algorithms',
      author: 'Mike Johnson',
      avatar: 'MJ',
      time: '4 hours ago',
      replies: 12,
      likes: 28,
      views: 89,
      category: 'Study Groups',
      isHot: false,
      tags: ['algorithms', 'programming', 'group']
    },
    {
      id: 3,
      title: 'Free resources for learning organic chemistry',
      author: 'Emma Wilson',
      avatar: 'EW',
      time: '6 hours ago',
      replies: 34,
      likes: 67,
      views: 234,
      category: 'Resources',
      isHot: true,
      tags: ['chemistry', 'resources', 'free']
    },
    {
      id: 4,
      title: 'How to stay motivated during exam season?',
      author: 'David Lee',
      avatar: 'DL',
      time: '8 hours ago',
      replies: 56,
      likes: 89,
      views: 312,
      category: 'Motivation',
      isHot: true,
      tags: ['motivation', 'exams', 'mental-health']
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'Virtual Study Session: Calculus II',
      time: 'Today, 7:00 PM',
      participants: 45,
      maxParticipants: 50,
      host: 'Prof. Anderson',
      type: 'study-session'
    },
    {
      id: 2,
      title: 'Group Quiz: World History',
      time: 'Tomorrow, 3:00 PM',
      participants: 23,
      maxParticipants: 30,
      host: 'History Club',
      type: 'quiz'
    },
    {
      id: 3,
      title: 'Coding Workshop: React Basics',
      time: 'Friday, 6:00 PM',
      participants: 67,
      maxParticipants: 100,
      host: 'Tech Society',
      type: 'workshop'
    }
  ];

  const quickActions = [
    { label: 'Start Discussion', icon: MessageCircle, color: 'from-blue-600 to-blue-700', description: 'Ask questions or share insights' },
    { label: 'Create Study Group', icon: Users, color: 'from-green-600 to-green-700', description: 'Find study partners' },
    { label: 'Share Resources', icon: BookOpen, color: 'from-purple-600 to-purple-700', description: 'Help others learn' },
    { label: 'Join Challenge', icon: Zap, color: 'from-orange-600 to-orange-700', description: 'Compete and improve' }
  ];

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
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  Community Hub 🌟
                </h1>
                <p className="text-slate-600 text-lg">Connect, collaborate, and learn together with fellow students</p>
              </div>
            </div>
            
            {/* Community Banner */}
            <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl p-6 text-white shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">🎉 Welcome to StudyAI Community!</h2>
                  <p className="text-blue-100">Join thousands of students on their learning journey</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">12.4K</div>
                  <div className="text-blue-100">Active Members</div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {communityStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="group">
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${stat.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <span className="text-sm font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                        {stat.change}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <p className="text-3xl font-bold text-slate-800">{stat.value}</p>
                      <p className="text-sm text-slate-600 font-medium">{stat.label}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Actions */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-6 mb-8">
            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
              <Zap className="w-6 h-6 mr-2 text-yellow-500" />
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <button
                    key={index}
                    className={`bg-gradient-to-r ${action.color} hover:shadow-lg text-white p-6 rounded-2xl font-semibold transition-all duration-300 hover:-translate-y-1 text-left group`}
                  >
                    <Icon className="w-8 h-8 mb-3 group-hover:scale-110 transition-transform duration-200" />
                    <div className="text-lg font-bold mb-1">{action.label}</div>
                    <div className="text-sm opacity-90">{action.description}</div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Discussions */}
            <div className="lg:col-span-2">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50">
                <div className="p-6 border-b border-slate-100">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-slate-800 flex items-center">
                      <MessageCircle className="w-6 h-6 mr-2 text-blue-500" />
                      Recent Discussions
                    </h2>
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                        <input
                          type="text"
                          placeholder="Search discussions..."
                          className="pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-sm bg-white/50 backdrop-blur-sm"
                        />
                      </div>
                      <select
                        value={activeFilter}
                        onChange={(e) => setActiveFilter(e.target.value)}
                        className="px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-sm bg-white/50 backdrop-blur-sm"
                      >
                        <option value="all">All Categories</option>
                        <option value="study-tips">Study Tips</option>
                        <option value="study-groups">Study Groups</option>
                        <option value="resources">Resources</option>
                        <option value="motivation">Motivation</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {recentDiscussions.map((discussion) => (
                      <div key={discussion.id} className="group p-6 rounded-2xl hover:bg-slate-50 transition-all duration-200 cursor-pointer border border-transparent hover:border-slate-200 hover:shadow-lg">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                            <span className="text-white text-sm font-bold">{discussion.avatar}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="font-bold text-slate-800 truncate group-hover:text-blue-600 transition-colors">
                                {discussion.title}
                              </h3>
                              {discussion.isHot && (
                                <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full flex items-center font-medium">
                                  🔥 Hot
                                </span>
                              )}
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-slate-500 mb-3">
                              <span className="font-medium text-slate-700">by {discussion.author}</span>
                              <span className="flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                {discussion.time}
                              </span>
                              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                                {discussion.category}
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-2 mb-3">
                              {discussion.tags.map((tag, index) => (
                                <span key={index} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                                  #{tag}
                                </span>
                              ))}
                            </div>
                            <div className="flex items-center space-x-6 text-sm text-slate-600">
                              <span className="flex items-center hover:text-blue-600 transition-colors">
                                <MessageCircle className="w-4 h-4 mr-1" />
                                {discussion.replies} replies
                              </span>
                              <span className="flex items-center hover:text-red-600 transition-colors">
                                <Heart className="w-4 h-4 mr-1" />
                                {discussion.likes} likes
                              </span>
                              <span className="flex items-center">
                                <Eye className="w-4 h-4 mr-1" />
                                {discussion.views} views
                              </span>
                              <button className="flex items-center hover:text-blue-600 transition-colors ml-auto">
                                <Share2 className="w-4 h-4 mr-1" />
                                Share
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 text-center">
                    <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl">
                      View All Discussions
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Trending Topics */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-6">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-orange-500" />
                  Trending Topics
                </h3>
                <div className="space-y-3">
                  {trendingTopics.map((topic, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer border border-transparent hover:border-slate-200">
                      <div className="flex-1">
                        <p className="font-semibold text-slate-800 text-sm mb-1">{topic.title}</p>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-slate-500">{topic.posts} posts</span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                            {topic.category}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                        {topic.trend}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Events */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-6">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-blue-500" />
                  Upcoming Events
                </h3>
                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="p-4 rounded-xl border border-slate-200 hover:border-blue-300 transition-all duration-200 cursor-pointer hover:shadow-lg bg-gradient-to-r from-blue-50 to-purple-50">
                      <h4 className="font-bold text-slate-800 text-sm mb-2">{event.title}</h4>
                      <p className="text-xs text-slate-600 mb-2">{event.time}</p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-600">by {event.host}</span>
                        <span className="text-blue-600 font-semibold">
                          {event.participants}/{event.maxParticipants} joined
                        </span>
                      </div>
                      <div className="mt-3 w-full bg-slate-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${(event.participants / event.maxParticipants) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <button className="w-full bg-blue-100 hover:bg-blue-200 text-blue-700 py-3 rounded-xl font-semibold transition-colors text-sm">
                    View All Events
                  </button>
                </div>
              </div>

              {/* Community Guidelines */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100 shadow-xl">
                <h3 className="font-bold text-slate-800 mb-3 flex items-center">
                  <Award className="w-5 h-5 mr-2 text-purple-500" />
                  Community Guidelines
                </h3>
                <ul className="space-y-3 text-sm text-slate-700">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Be respectful and supportive to all members</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Share knowledge and resources freely</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Help others learn and grow together</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Keep discussions relevant and constructive</span>
                  </li>
                </ul>
                <button className="w-full mt-4 bg-purple-100 hover:bg-purple-200 text-purple-700 py-2 rounded-xl font-medium transition-colors text-sm">
                  Read Full Guidelines
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityHub;