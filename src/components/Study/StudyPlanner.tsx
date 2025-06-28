import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Calendar, 
  Target, 
  Clock,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Star,
  BarChart3
} from 'lucide-react';
import { storage } from '../../utils/storage';
import { StudyGoal, StudySession } from '../../types';
import { format, isToday, addDays, isBefore } from 'date-fns';

const StudyPlanner: React.FC = () => {
  const [goals, setGoals] = useState<StudyGoal[]>([]);
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    targetDate: format(addDays(new Date(), 7), 'yyyy-MM-dd')
  });

  useEffect(() => {
    setGoals(storage.getGoals());
    setSessions(storage.getSessions());
  }, []);

  const handleAddGoal = () => {
    if (!newGoal.title.trim()) return;

    const goal: StudyGoal = {
      id: Date.now().toString(),
      title: newGoal.title.trim(),
      description: newGoal.description.trim(),
      targetDate: new Date(newGoal.targetDate),
      progress: 0,
      isCompleted: false,
      createdAt: new Date()
    };

    const updatedGoals = [goal, ...goals];
    setGoals(updatedGoals);
    storage.saveGoals(updatedGoals);

    setNewGoal({
      title: '',
      description: '',
      targetDate: format(addDays(new Date(), 7), 'yyyy-MM-dd')
    });
    setShowAddGoal(false);
  };

  const updateGoalProgress = (goalId: string, progress: number) => {
    const updatedGoals = goals.map(goal =>
      goal.id === goalId
        ? { ...goal, progress: Math.min(100, Math.max(0, progress)), isCompleted: progress >= 100 }
        : goal
    );
    setGoals(updatedGoals);
    storage.saveGoals(updatedGoals);
  };

  const deleteGoal = (goalId: string) => {
    const updatedGoals = goals.filter(goal => goal.id !== goalId);
    setGoals(updatedGoals);
    storage.saveGoals(updatedGoals);
  };

  const startStudyTimer = () => {
    const startTime = Date.now();
    const sessionId = Date.now().toString();
    
    // This would integrate with a timer component in a full implementation
    alert('Study timer started! (This would be a proper timer in the full app)');
  };

  const todaySessions = sessions.filter(session => isToday(session.date));
  const totalStudyTime = todaySessions.reduce((acc, session) => acc + session.duration, 0);
  const activeGoals = goals.filter(goal => !goal.isCompleted);
  const overdue = goals.filter(goal => !goal.isCompleted && isBefore(goal.targetDate, new Date()));

  return (
    <div className="p-8 bg-gray-50 min-h-full">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Study Planner</h1>
            <p className="text-gray-600">Set goals and track your study progress</p>
          </div>
          <button
            onClick={() => setShowAddGoal(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl"
          >
            <Plus className="w-5 h-5" />
            <span>New Goal</span>
          </button>
        </div>

        {/* Today's Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{totalStudyTime}min</p>
            <p className="text-sm text-gray-500">Today's Study Time</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{activeGoals.length}</p>
            <p className="text-sm text-gray-500">Active Goals</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{overdue.length}</p>
            <p className="text-sm text-gray-500">Overdue</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{todaySessions.length}</p>
            <p className="text-sm text-gray-500">Sessions Today</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Goals List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">Study Goals</h2>
              </div>
              <div className="p-6">
                {goals.length > 0 ? (
                  <div className="space-y-4">
                    {goals.map((goal) => (
                      <div key={goal.id} className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                        goal.isCompleted 
                          ? 'border-green-200 bg-green-50' 
                          : isBefore(goal.targetDate, new Date())
                          ? 'border-red-200 bg-red-50'
                          : 'border-gray-200 bg-white hover:border-blue-200'
                      }`}>
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="font-semibold text-gray-900">{goal.title}</h3>
                              {goal.isCompleted && <CheckCircle className="w-5 h-5 text-green-600" />}
                              {!goal.isCompleted && isBefore(goal.targetDate, new Date()) && (
                                <AlertCircle className="w-5 h-5 text-red-600" />
                              )}
                            </div>
                            {goal.description && (
                              <p className="text-sm text-gray-600 mb-2">{goal.description}</p>
                            )}
                            <p className="text-xs text-gray-500">
                              Due: {format(goal.targetDate, 'MMM d, yyyy')}
                            </p>
                          </div>
                          <button
                            onClick={() => deleteGoal(goal.id)}
                            className="text-gray-400 hover:text-red-600 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-600">Progress</span>
                            <span className="font-medium">{goal.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full transition-all duration-300 ${
                                goal.isCompleted 
                                  ? 'bg-green-500' 
                                  : 'bg-gradient-to-r from-blue-500 to-purple-500'
                              }`}
                              style={{ width: `${goal.progress}%` }}
                            />
                          </div>
                          
                          {!goal.isCompleted && (
                            <div className="flex items-center space-x-2 mt-3">
                              <button
                                onClick={() => updateGoalProgress(goal.id, goal.progress - 10)}
                                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm transition-colors"
                              >
                                -10%
                              </button>
                              <button
                                onClick={() => updateGoalProgress(goal.id, goal.progress + 10)}
                                className="px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg text-sm transition-colors"
                              >
                                +10%
                              </button>
                              <button
                                onClick={() => updateGoalProgress(goal.id, 100)}
                                className="px-3 py-1 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg text-sm transition-colors"
                              >
                                Complete
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Target className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No study goals yet. Create your first goal!</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Actions & Add Goal */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={startStudyTimer}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white p-3 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2"
                >
                  <Clock className="w-5 h-5" />
                  <span>Start Study Timer</span>
                </button>
                
                <div className="grid grid-cols-2 gap-2">
                  <button className="bg-blue-100 hover:bg-blue-200 text-blue-700 p-3 rounded-xl font-medium transition-colors text-sm">
                    View Stats
                  </button>
                  <button className="bg-purple-100 hover:bg-purple-200 text-purple-700 p-3 rounded-xl font-medium transition-colors text-sm">
                    Export Data
                  </button>
                </div>
              </div>
            </div>

            {/* Add Goal Form */}
            {showAddGoal && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">New Study Goal</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Goal title..."
                    value={newGoal.title}
                    onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  />
                  <textarea
                    placeholder="Description (optional)..."
                    value={newGoal.description}
                    onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 resize-none"
                  />
                  <input
                    type="date"
                    value={newGoal.targetDate}
                    onChange={(e) => setNewGoal({ ...newGoal, targetDate: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  />
                  <div className="flex space-x-3">
                    <button
                      onClick={handleAddGoal}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl font-medium transition-all duration-200"
                    >
                      Create Goal
                    </button>
                    <button
                      onClick={() => setShowAddGoal(false)}
                      className="px-4 py-3 border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl font-medium transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyPlanner;