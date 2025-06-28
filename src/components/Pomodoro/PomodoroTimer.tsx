import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Settings,
  Coffee,
  Target,
  Clock,
  TrendingUp
} from 'lucide-react';
import { storage } from '../../utils/storage';
import { PomodoroSession } from '../../types';

const PomodoroTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [sessionType, setSessionType] = useState<'work' | 'short-break' | 'long-break'>('work');
  const [sessions, setSessions] = useState<PomodoroSession[]>([]);
  const [currentTask, setCurrentTask] = useState('');
  const [completedPomodoros, setCompletedPomodoros] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({
    workDuration: 25,
    shortBreakDuration: 5,
    longBreakDuration: 15,
    longBreakInterval: 4
  });

  useEffect(() => {
    setSessions(storage.getPomodoroSessions());
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleSessionComplete();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSessionComplete = () => {
    const session: PomodoroSession = {
      id: Date.now().toString(),
      startTime: new Date(Date.now() - (getDurationForType(sessionType) * 60 * 1000)),
      endTime: new Date(),
      duration: getDurationForType(sessionType),
      type: sessionType,
      completed: true,
      task: currentTask || undefined
    };

    const updatedSessions = [...sessions, session];
    setSessions(updatedSessions);
    storage.savePomodoroSessions(updatedSessions);

    if (sessionType === 'work') {
      setCompletedPomodoros(prev => prev + 1);
      // Auto-switch to break
      if ((completedPomodoros + 1) % settings.longBreakInterval === 0) {
        switchToSession('long-break');
      } else {
        switchToSession('short-break');
      }
    } else {
      switchToSession('work');
    }

    setIsActive(false);
    
    // Show notification (if supported)
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(`${sessionType === 'work' ? 'Work' : 'Break'} session complete!`, {
        body: sessionType === 'work' ? 'Time for a break!' : 'Ready to get back to work?',
        icon: '/favicon.ico'
      });
    }
  };

  const getDurationForType = (type: 'work' | 'short-break' | 'long-break') => {
    switch (type) {
      case 'work': return settings.workDuration;
      case 'short-break': return settings.shortBreakDuration;
      case 'long-break': return settings.longBreakDuration;
    }
  };

  const switchToSession = (type: 'work' | 'short-break' | 'long-break') => {
    setSessionType(type);
    setTimeLeft(getDurationForType(type) * 60);
    setIsActive(false);
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(getDurationForType(sessionType) * 60);
  };

  const requestNotificationPermission = () => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  };

  const todaySessions = sessions.filter(session => {
    const today = new Date();
    const sessionDate = new Date(session.startTime);
    return sessionDate.toDateString() === today.toDateString();
  });

  const todayWorkTime = todaySessions
    .filter(session => session.type === 'work')
    .reduce((acc, session) => acc + session.duration, 0);

  const progress = ((getDurationForType(sessionType) * 60 - timeLeft) / (getDurationForType(sessionType) * 60)) * 100;

  return (
    <div className="p-8 bg-gray-50 min-h-full">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Pomodoro Timer</h1>
            <p className="text-gray-600">Stay focused with the Pomodoro Technique</p>
          </div>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-3 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200"
          >
            <Settings className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{completedPomodoros}</p>
            <p className="text-sm text-gray-500">Today's Pomodoros</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{todayWorkTime}min</p>
            <p className="text-sm text-gray-500">Focus Time</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                <Coffee className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {todaySessions.filter(s => s.type !== 'work').length}
            </p>
            <p className="text-sm text-gray-500">Breaks Taken</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{sessions.length}</p>
            <p className="text-sm text-gray-500">Total Sessions</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Timer */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              {/* Session Type Selector */}
              <div className="flex justify-center mb-8">
                <div className="bg-gray-100 rounded-xl p-1 flex">
                  <button
                    onClick={() => switchToSession('work')}
                    className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                      sessionType === 'work'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Work
                  </button>
                  <button
                    onClick={() => switchToSession('short-break')}
                    className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                      sessionType === 'short-break'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Short Break
                  </button>
                  <button
                    onClick={() => switchToSession('long-break')}
                    className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                      sessionType === 'long-break'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Long Break
                  </button>
                </div>
              </div>

              {/* Timer Display */}
              <div className="text-center mb-8">
                <div className="relative w-64 h-64 mx-auto mb-6">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      className="text-gray-200"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 45}`}
                      strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
                      className={`transition-all duration-1000 ${
                        sessionType === 'work' ? 'text-red-500' :
                        sessionType === 'short-break' ? 'text-green-500' :
                        'text-blue-500'
                      }`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-gray-900 mb-2">
                        {formatTime(timeLeft)}
                      </div>
                      <div className="text-sm text-gray-500 capitalize">
                        {sessionType.replace('-', ' ')}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={toggleTimer}
                    className={`w-16 h-16 rounded-full flex items-center justify-center font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                        : sessionType === 'work'
                        ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white'
                        : sessionType === 'short-break'
                        ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white'
                        : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white'
                    }`}
                  >
                    {isActive ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                  </button>
                  <button
                    onClick={resetTimer}
                    className="w-16 h-16 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-colors"
                  >
                    <RotateCcw className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Current Task */}
              {sessionType === 'work' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What are you working on?
                  </label>
                  <input
                    type="text"
                    value={currentTask}
                    onChange={(e) => setCurrentTask(e.target.value)}
                    placeholder="Enter your current task..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Settings & History */}
          <div className="space-y-6">
            {/* Settings */}
            {showSettings && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Timer Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Work Duration (minutes)
                    </label>
                    <input
                      type="number"
                      value={settings.workDuration}
                      onChange={(e) => setSettings({...settings, workDuration: parseInt(e.target.value) || 25})}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Short Break (minutes)
                    </label>
                    <input
                      type="number"
                      value={settings.shortBreakDuration}
                      onChange={(e) => setSettings({...settings, shortBreakDuration: parseInt(e.target.value) || 5})}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Long Break (minutes)
                    </label>
                    <input
                      type="number"
                      value={settings.longBreakDuration}
                      onChange={(e) => setSettings({...settings, longBreakDuration: parseInt(e.target.value) || 15})}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                    />
                  </div>
                </div>
                <button
                  onClick={requestNotificationPermission}
                  className="w-full mt-4 bg-blue-100 hover:bg-blue-200 text-blue-700 py-2 rounded-lg font-medium transition-colors text-sm"
                >
                  Enable Notifications
                </button>
              </div>
            )}

            {/* Today's Sessions */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Today's Sessions</h3>
              {todaySessions.length > 0 ? (
                <div className="space-y-3">
                  {todaySessions.slice(-5).map((session) => (
                    <div key={session.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          session.type === 'work' ? 'bg-red-500' :
                          session.type === 'short-break' ? 'bg-green-500' :
                          'bg-blue-500'
                        }`} />
                        <div>
                          <p className="text-sm font-medium text-gray-900 capitalize">
                            {session.type.replace('-', ' ')}
                          </p>
                          {session.task && (
                            <p className="text-xs text-gray-500">{session.task}</p>
                          )}
                        </div>
                      </div>
                      <span className="text-sm text-gray-600">{session.duration}min</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No sessions today yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;