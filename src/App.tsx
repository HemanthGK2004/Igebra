import React, { useState } from 'react';
import Sidebar from './components/Layout/Sidebar';
import Dashboard from './components/Dashboard/Dashboard';
import NotesManager from './components/Notes/NotesManager';
import AudioNotes from './components/Audio/AudioNotes';
import FlashcardsManager from './components/Flashcards/FlashcardsManager';
import StudyPlanner from './components/Study/StudyPlanner';
import QuizManager from './components/Quiz/QuizManager';
import PomodoroTimer from './components/Pomodoro/PomodoroTimer';
import StudyAnalytics from './components/Analytics/StudyAnalytics';
import CommunityHub from './components/Community/CommunityHub';
import StudyGroups from './components/Community/StudyGroups';
import StudyBuddies from './components/Community/StudyBuddies';
import Challenges from './components/Community/Challenges';
import Leaderboard from './components/Community/Leaderboard';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'notes':
        return <NotesManager />;
      case 'audio':
        return <AudioNotes />;
      case 'flashcards':
        return <FlashcardsManager />;
      case 'quiz':
        return <QuizManager />;
      case 'pomodoro':
        return <PomodoroTimer />;
      case 'study':
        return <StudyPlanner />;
      case 'analytics':
        return <StudyAnalytics />;
      case 'community':
        return <CommunityHub />;
      case 'study-groups':
        return <StudyGroups />;
      case 'discussions':
        return <CommunityHub />;
      case 'study-buddies':
        return <StudyBuddies />;
      case 'events':
        return <CommunityHub />;
      case 'challenges':
        return <Challenges />;
      case 'leaderboard':
        return <Leaderboard />;
      case 'library':
        return (
          <div className="p-8 bg-gray-50 min-h-full flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Library Coming Soon</h2>
              <p className="text-gray-600">Organize and browse all your study materials</p>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="p-8 bg-gray-50 min-h-full flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Settings Coming Soon</h2>
              <p className="text-gray-600">Customize your study experience</p>
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default App;