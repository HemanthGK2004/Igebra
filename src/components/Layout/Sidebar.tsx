import React, { useState } from 'react';
import { 
  BookOpen, 
  BrainCircuit, 
  Target, 
  BarChart3, 
  Settings,
  FileText,
  Mic,
  Trophy,
  Timer,
  TrendingUp,
  Users,
  MessageCircle,
  UserPlus,
  Calendar,
  Award,
  Zap,
  X,
  ChevronDown,
  Bell,
  Search
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const [showProfile, setShowProfile] = useState(true);
  const [expandedSection, setExpandedSection] = useState<string | null>('study');

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'notes', label: 'Notes', icon: FileText },
    { id: 'audio', label: 'Audio Notes', icon: Mic },
    { id: 'flashcards', label: 'Flashcards', icon: BrainCircuit },
    { id: 'quiz', label: 'Quizzes', icon: Trophy },
    { id: 'pomodoro', label: 'Pomodoro', icon: Timer },
    { id: 'study', label: 'Study Plan', icon: Target },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
  ];

  const communityItems = [
    { id: 'community', label: 'Community', icon: Users },
    { id: 'study-groups', label: 'Study Groups', icon: Users },
    { id: 'discussions', label: 'Discussions', icon: MessageCircle },
    { id: 'study-buddies', label: 'Study Buddies', icon: UserPlus },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'challenges', label: 'Challenges', icon: Zap },
    { id: 'leaderboard', label: 'Leaderboard', icon: Award },
  ];

  const otherItems = [
    { id: 'library', label: 'Library', icon: BookOpen },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="w-72 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 shadow-2xl border-r border-slate-700 h-full flex flex-col relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }}></div>
      </div>

      {/* Header */}
      <div className="p-6 relative z-10">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
            <BrainCircuit className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              StudyAI
            </h1>
            <p className="text-sm text-slate-400">Smart Learning Platform</p>
          </div>
        </div>

        {/* Quick Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Quick search..."
            className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-600 rounded-xl text-slate-200 placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 pb-6 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent relative z-10">
        {/* Study Tools */}
        <div className="mb-6">
          <button
            onClick={() => toggleSection('study')}
            className="w-full flex items-center justify-between px-4 py-2 text-slate-300 hover:text-white transition-colors mb-3"
          >
            <span className="text-xs font-semibold uppercase tracking-wider">Study Tools</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${expandedSection === 'study' ? 'rotate-180' : ''}`} />
          </button>
          {expandedSection === 'study' && (
            <div className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => onTabChange(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 group ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 shadow-lg border border-blue-500/30'
                        : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'text-blue-400' : 'group-hover:text-blue-400'} transition-colors`} />
                    <span className="font-medium">{item.label}</span>
                    {isActive && <div className="w-2 h-2 bg-blue-400 rounded-full ml-auto"></div>}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Community */}
        <div className="mb-6">
          <button
            onClick={() => toggleSection('community')}
            className="w-full flex items-center justify-between px-4 py-2 text-slate-300 hover:text-white transition-colors mb-3"
          >
            <span className="text-xs font-semibold uppercase tracking-wider">Community</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${expandedSection === 'community' ? 'rotate-180' : ''}`} />
          </button>
          {expandedSection === 'community' && (
            <div className="space-y-1">
              {communityItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => onTabChange(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 group ${
                      isActive
                        ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 shadow-lg border border-purple-500/30'
                        : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'text-purple-400' : 'group-hover:text-purple-400'} transition-colors`} />
                    <span className="font-medium">{item.label}</span>
                    {isActive && <div className="w-2 h-2 bg-purple-400 rounded-full ml-auto"></div>}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Other */}
        <div>
          <button
            onClick={() => toggleSection('other')}
            className="w-full flex items-center justify-between px-4 py-2 text-slate-300 hover:text-white transition-colors mb-3"
          >
            <span className="text-xs font-semibold uppercase tracking-wider">Other</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${expandedSection === 'other' ? 'rotate-180' : ''}`} />
          </button>
          {expandedSection === 'other' && (
            <div className="space-y-1">
              {otherItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => onTabChange(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 group ${
                      isActive
                        ? 'bg-gradient-to-r from-green-500/20 to-teal-500/20 text-green-300 shadow-lg border border-green-500/30'
                        : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'text-green-400' : 'group-hover:text-green-400'} transition-colors`} />
                    <span className="font-medium">{item.label}</span>
                    {isActive && <div className="w-2 h-2 bg-green-400 rounded-full ml-auto"></div>}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </nav>

      {/* User Profile - Collapsible */}
      {showProfile && (
        <div className="p-4 border-t border-slate-700 relative z-10">
          <div className="bg-gradient-to-br from-slate-800/80 to-slate-700/80 backdrop-blur-sm rounded-2xl p-4 border border-slate-600/50 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-lg font-bold">AS</span>
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-800"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-white truncate">Alex Student</p>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                    <p className="text-xs text-yellow-400 font-medium">Premium Active</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowProfile(false)}
                className="p-1 hover:bg-slate-600 rounded-lg transition-colors"
              >
                <X className="w-4 h-4 text-slate-400 hover:text-white" />
              </button>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Level 12</span>
                <span className="text-blue-400 font-semibold">2,450 XP</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full shadow-sm" style={{ width: '65%' }}>
                  <div className="w-full h-full bg-gradient-to-r from-white/20 to-transparent rounded-full"></div>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>2,400 XP</span>
                <span>2,800 XP</span>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-600/50">
              <div className="text-center">
                <div className="text-sm font-bold text-white">15</div>
                <div className="text-xs text-slate-400">Streak</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-bold text-white">89%</div>
                <div className="text-xs text-slate-400">Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-bold text-white">12</div>
                <div className="text-xs text-slate-400">Badges</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Collapsed Profile Toggle */}
      {!showProfile && (
        <div className="p-4 border-t border-slate-700 relative z-10">
          <button
            onClick={() => setShowProfile(true)}
            className="w-full flex items-center justify-center p-3 bg-slate-800/50 hover:bg-slate-700/50 rounded-xl transition-colors border border-slate-600/50"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">AS</span>
            </div>
          </button>
        </div>
      )}

      {/* Notification Bell */}
      <div className="absolute top-6 right-6 z-20">
        <button className="relative p-2 bg-slate-800/50 hover:bg-slate-700/50 rounded-xl transition-colors border border-slate-600/50">
          <Bell className="w-5 h-5 text-slate-300" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;