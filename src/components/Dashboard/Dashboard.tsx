import { format, isThisWeek, isToday } from 'date-fns';
import {
  Award,
  BarChart3,
  BookOpen,
  Brain,
  Calendar,
  ChevronRight,
  Clock,
  Sparkles,
  Star,
  Target,
  Timer,
  Users,
  Zap
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Note, StudyGoal, StudySession } from '../../types';
import { storage } from '../../utils/storage';

const Dashboard: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [goals, setGoals] = useState<StudyGoal[]>([]);

  useEffect(() => {
    setNotes(storage.getNotes());
    setSessions(storage.getSessions());
    setGoals(storage.getGoals());
  }, []);

  const todaysSessions = sessions.filter(session => isToday(session.date));
  const weekSessions = sessions.filter(session => isThisWeek(session.date));
  const recentNotes = notes.slice(0, 5);
  const activeGoals = goals.filter(goal => !goal.isCompleted);

  const stats = [
    {
      label: 'Notes Created',
      value: notes.length,
      icon: BookOpen,
      color: 'from-blue-500 to-blue-600',
      change: '+12%',
      bgColor: 'from-blue-50 to-blue-100',
      iconBg: 'from-blue-500 to-blue-600'
    },
    {
      label: 'Study Time Today',
      value: `${todaysSessions.reduce((acc, s) => acc + s.duration, 0)}min`,
      icon: Clock,
      color: 'from-purple-500 to-purple-600',
      change: '+25%',
      bgColor: 'from-purple-50 to-purple-100',
      iconBg: 'from-purple-500 to-purple-600'
    },
    {
      label: 'Active Goals',
      value: activeGoals.length,
      icon: Target,
      color: 'from-green-500 to-green-600',
      change: '+5%',
      bgColor: 'from-green-50 to-green-100',
      iconBg: 'from-green-500 to-green-600'
    },
    {
      label: 'Weekly Accuracy',
      value: weekSessions.length > 0 
        ? `${Math.round(weekSessions.reduce((acc, s) => acc + s.accuracy, 0) / weekSessions.length)}%`
        : '0%',
      icon: Brain,
      color: 'from-orange-500 to-orange-600',
      change: '+8%',
      bgColor: 'from-orange-50 to-orange-100',
      iconBg: 'from-orange-500 to-orange-600'
    }
  ];

  const quickActions = [
    { label: 'Create Note', icon: BookOpen, color: 'from-blue-500 to-blue-600', action: () => {} },
    { label: 'Start Flashcards', icon: Brain, color: 'from-purple-500 to-purple-600', action: () => {} },
    { label: 'Pomodoro Timer', icon: Timer, color: 'from-green-500 to-green-600', action: () => {} },
    { label: 'Take Quiz', icon: Award, color: 'from-orange-500 to-orange-600', action: () => {} },
    { label: 'Join Study Group', icon: Users, color: 'from-pink-500 to-pink-600', action: () => {} },
    { label: 'View Analytics', icon: BarChart3, color: 'from-indigo-500 to-indigo-600', action: () => {} }
  ];

  const upcomingEvents = [
    { title: 'Math Study Group', time: 'Today, 3:00 PM', participants: 12 },
    { title: 'Physics Quiz Challenge', time: 'Tomorrow, 7:00 PM', participants: 45 },
    { title: 'Chemistry Workshop', time: 'Friday, 2:00 PM', participants: 23 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute rounded-full -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 blur-3xl animate-pulse"></div>
        <div className="absolute delay-1000 rounded-full -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-green-400/20 to-blue-600/20 blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10 p-8">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center mb-4 space-x-3">
              <div className="flex items-center justify-center w-12 h-12 shadow-lg bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-transparent bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text">
                  Welcome back, Alex! 🎯
                </h1>
                <p className="text-lg text-slate-600">Ready to continue your learning journey?</p>
              </div>
            </div>
            
            {/* Motivational Banner */}
            <div className="p-6 text-white shadow-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="mb-2 text-2xl font-bold">🔥 15-Day Study Streak!</h2>
                  <p className="text-blue-100">You're on fire! Keep up the amazing work.</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">Level 12</div>
                  <div className="text-blue-100">2,450 XP</div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="group">
                  <div className={`bg-gradient-to-br ${stat.bgColor} rounded-2xl p-6 shadow-lg border border-white/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${stat.iconBg} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="text-white w-7 h-7" />
                      </div>
                      <span className="px-2 py-1 text-sm font-semibold text-green-600 bg-green-100 rounded-full">
                        {stat.change}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <p className="text-3xl font-bold text-slate-800">{stat.value}</p>
                      <p className="text-sm font-medium text-slate-600">{stat.label}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="flex items-center mb-6 text-2xl font-bold text-slate-800">
              <Zap className="w-6 h-6 mr-2 text-yellow-500" />
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <button
                    key={index}
                    onClick={action.action}
                    className="p-6 transition-all duration-300 border shadow-lg group bg-white/80 backdrop-blur-sm rounded-2xl border-white/50 hover:shadow-xl hover:-translate-y-1 hover:bg-white"
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${action.color} flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-sm font-semibold text-center text-slate-700">{action.label}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Recent Notes */}
            <div className="lg:col-span-2">
              <div className="border shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl border-white/50">
                <div className="p-6 border-b border-slate-100">
                  <div className="flex items-center justify-between">
                    <h2 className="flex items-center text-xl font-bold text-slate-800">
                      <BookOpen className="w-5 h-5 mr-2 text-blue-500" />
                      Recent Notes
                    </h2>
                    <button className="flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700 group">
                      View All 
                      <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  {recentNotes.length > 0 ? (
                    <div className="space-y-4">
                      {recentNotes.map((note) => (
                        <div key={note.id} className="flex items-center p-4 space-x-4 transition-all duration-200 border border-transparent cursor-pointer group rounded-xl hover:bg-slate-50 hover:border-slate-200">
                          <div className="flex items-center justify-center w-12 h-12 transition-transform duration-200 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl group-hover:scale-110">
                            <BookOpen className="w-6 h-6 text-blue-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center mb-1 space-x-2">
                              <h3 className="font-semibold truncate transition-colors text-slate-800 group-hover:text-blue-600">
                                {note.title}
                              </h3>
                              {note.isStarred && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                            </div>
                            <p className="text-sm truncate text-slate-600">{note.content}</p>
                            <p className="mt-1 text-xs text-slate-400">{format(note.updatedAt, 'MMM d, yyyy')}</p>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {note.tags.slice(0, 2).map((tag) => (
                              <span key={tag} className="px-2 py-1 text-xs text-blue-700 bg-blue-100 rounded-full">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-12 text-center">
                      <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl">
                        <BookOpen className="w-8 h-8 text-slate-400" />
                      </div>
                      <p className="mb-4 text-slate-500">No notes yet. Create your first note to get started!</p>
                      <button className="px-6 py-3 font-semibold text-white transition-all duration-200 shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-xl hover:shadow-xl">
                        Create Note
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Active Goals */}
              <div className="border shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl border-white/50">
                <div className="p-6 border-b border-slate-100">
                  <h2 className="flex items-center text-xl font-bold text-slate-800">
                    <Target className="w-5 h-5 mr-2 text-green-500" />
                    Active Goals
                  </h2>
                </div>
                <div className="p-6">
                  {activeGoals.length > 0 ? (
                    <div className="space-y-4">
                      {activeGoals.slice(0, 3).map((goal) => (
                        <div key={goal.id} className="p-4 space-y-3 border border-green-100 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-semibold text-slate-800">{goal.title}</h3>
                            <span className="text-sm font-bold text-green-600">{goal.progress}%</span>
                          </div>
                          <div className="w-full h-2 overflow-hidden rounded-full bg-slate-200">
                            <div 
                              className="h-2 transition-all duration-500 rounded-full shadow-sm bg-gradient-to-r from-green-500 to-blue-500"
                              style={{ width: `${goal.progress}%` }}
                            />
                          </div>
                          <p className="text-xs text-slate-500">Due {format(goal.targetDate, 'MMM d')}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-8 text-center">
                      <Target className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                      <p className="mb-4 text-sm text-slate-500">Set your first study goal!</p>
                      <button className="px-4 py-2 text-sm font-medium text-white transition-all duration-200 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-xl">
                        Create Goal
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Upcoming Events */}
              <div className="border shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl border-white/50">
                <div className="p-6 border-b border-slate-100">
                  <h2 className="flex items-center text-xl font-bold text-slate-800">
                    <Calendar className="w-5 h-5 mr-2 text-purple-500" />
                    Upcoming Events
                  </h2>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {upcomingEvents.map((event, index) => (
                      <div key={index} className="flex items-center p-3 space-x-3 transition-all duration-200 border border-purple-100 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl hover:shadow-md">
                        <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
                          <Calendar className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-semibold text-slate-800">{event.title}</h4>
                          <p className="text-xs text-slate-500">{event.time}</p>
                          <p className="text-xs text-purple-600">{event.participants} participants</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Achievement Showcase */}
              <div className="p-6 border border-yellow-200 shadow-xl bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl">
                <h3 className="flex items-center mb-4 font-bold text-slate-800">
                  <Award className="w-5 h-5 mr-2 text-yellow-500" />
                  Latest Achievement
                </h3>
                <div className="text-center">
                  <div className="flex items-center justify-center w-16 h-16 mx-auto mb-3 shadow-lg bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="mb-1 font-bold text-slate-800">Study Streak Master</h4>
                  <p className="mb-3 text-sm text-slate-600">15 consecutive days of studying</p>
                  <div className="text-xs font-semibold text-yellow-600">+500 XP</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;