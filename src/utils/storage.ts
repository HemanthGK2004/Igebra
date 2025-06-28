import { Note, Flashcard, StudySession, StudyGoal, Quiz, StudyStreak, PomodoroSession, StudyAnalytics, Reminder } from '../types';

const STORAGE_KEYS = {
  NOTES: 'ai-study-notes',
  FLASHCARDS: 'ai-study-flashcards',
  SESSIONS: 'ai-study-sessions',
  GOALS: 'ai-study-goals',
  SETTINGS: 'ai-study-settings',
  QUIZZES: 'ai-study-quizzes',
  STREAK: 'ai-study-streak',
  POMODORO: 'ai-study-pomodoro',
  ANALYTICS: 'ai-study-analytics',
  REMINDERS: 'ai-study-reminders'
};

export const storage = {
  getNotes: (): Note[] => {
    const data = localStorage.getItem(STORAGE_KEYS.NOTES);
    return data ? JSON.parse(data).map((note: any) => ({
      ...note,
      createdAt: new Date(note.createdAt),
      updatedAt: new Date(note.updatedAt)
    })) : [];
  },

  saveNotes: (notes: Note[]) => {
    localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(notes));
  },

  getFlashcards: (): Flashcard[] => {
    const data = localStorage.getItem(STORAGE_KEYS.FLASHCARDS);
    return data ? JSON.parse(data).map((card: any) => ({
      ...card,
      nextReview: new Date(card.nextReview),
      createdAt: new Date(card.createdAt)
    })) : [];
  },

  saveFlashcards: (flashcards: Flashcard[]) => {
    localStorage.setItem(STORAGE_KEYS.FLASHCARDS, JSON.stringify(flashcards));
  },

  getSessions: (): StudySession[] => {
    const data = localStorage.getItem(STORAGE_KEYS.SESSIONS);
    return data ? JSON.parse(data).map((session: any) => ({
      ...session,
      date: new Date(session.date)
    })) : [];
  },

  saveSessions: (sessions: StudySession[]) => {
    localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessions));
  },

  getGoals: (): StudyGoal[] => {
    const data = localStorage.getItem(STORAGE_KEYS.GOALS);
    return data ? JSON.parse(data).map((goal: any) => ({
      ...goal,
      targetDate: new Date(goal.targetDate),
      createdAt: new Date(goal.createdAt)
    })) : [];
  },

  saveGoals: (goals: StudyGoal[]) => {
    localStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify(goals));
  },

  getQuizzes: (): Quiz[] => {
    const data = localStorage.getItem(STORAGE_KEYS.QUIZZES);
    return data ? JSON.parse(data).map((quiz: any) => ({
      ...quiz,
      createdAt: new Date(quiz.createdAt),
      attempts: quiz.attempts.map((attempt: any) => ({
        ...attempt,
        startTime: new Date(attempt.startTime),
        endTime: new Date(attempt.endTime)
      }))
    })) : [];
  },

  saveQuizzes: (quizzes: Quiz[]) => {
    localStorage.setItem(STORAGE_KEYS.QUIZZES, JSON.stringify(quizzes));
  },

  getStreak: (): StudyStreak => {
    const data = localStorage.getItem(STORAGE_KEYS.STREAK);
    return data ? {
      ...JSON.parse(data),
      lastStudyDate: new Date(JSON.parse(data).lastStudyDate)
    } : {
      currentStreak: 0,
      longestStreak: 0,
      lastStudyDate: new Date(),
      totalDays: 0
    };
  },

  saveStreak: (streak: StudyStreak) => {
    localStorage.setItem(STORAGE_KEYS.STREAK, JSON.stringify(streak));
  },

  getPomodoroSessions: (): PomodoroSession[] => {
    const data = localStorage.getItem(STORAGE_KEYS.POMODORO);
    return data ? JSON.parse(data).map((session: any) => ({
      ...session,
      startTime: new Date(session.startTime),
      endTime: session.endTime ? new Date(session.endTime) : undefined
    })) : [];
  },

  savePomodoroSessions: (sessions: PomodoroSession[]) => {
    localStorage.setItem(STORAGE_KEYS.POMODORO, JSON.stringify(sessions));
  },

  getAnalytics: (): StudyAnalytics => {
    const data = localStorage.getItem(STORAGE_KEYS.ANALYTICS);
    return data ? JSON.parse(data) : {
      totalStudyTime: 0,
      averageSessionLength: 0,
      mostProductiveHour: 14,
      subjectDistribution: {},
      weeklyProgress: [0, 0, 0, 0, 0, 0, 0],
      accuracyTrend: []
    };
  },

  saveAnalytics: (analytics: StudyAnalytics) => {
    localStorage.setItem(STORAGE_KEYS.ANALYTICS, JSON.stringify(analytics));
  },

  getReminders: (): Reminder[] => {
    const data = localStorage.getItem(STORAGE_KEYS.REMINDERS);
    return data ? JSON.parse(data).map((reminder: any) => ({
      ...reminder,
      dueDate: new Date(reminder.dueDate)
    })) : [];
  },

  saveReminders: (reminders: Reminder[]) => {
    localStorage.setItem(STORAGE_KEYS.REMINDERS, JSON.stringify(reminders));
  }
};