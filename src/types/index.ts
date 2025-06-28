export interface Note {
  id: string;
  title: string;
  content: string;
  summary?: string;
  tags: string[];
  category: string;
  createdAt: Date;
  updatedAt: Date;
  audioUrl?: string;
  isStarred: boolean;
  attachments?: Attachment[];
  collaborators?: string[];
  version: number;
  isArchived: boolean;
  isPublic?: boolean;
  likes?: number;
  downloads?: number;
  authorId?: string;
  authorName?: string;
}

export interface Attachment {
  id: string;
  name: string;
  type: 'image' | 'pdf' | 'document';
  url: string;
  size: number;
}

export interface Flashcard {
  id: string;
  noteId: string;
  question: string;
  answer: string;
  difficulty: 'easy' | 'medium' | 'hard';
  nextReview: Date;
  reviewCount: number;
  correctCount: number;
  createdAt: Date;
  tags: string[];
  hint?: string;
  isPublic?: boolean;
  authorId?: string;
  authorName?: string;
  likes?: number;
}

export interface StudySession {
  id: string;
  date: Date;
  duration: number;
  notesReviewed: number;
  flashcardsStudied: number;
  accuracy: number;
  focusScore: number;
  topicsStudied: string[];
  sessionType: 'solo' | 'group';
  groupId?: string;
}

export interface StudyGoal {
  id: string;
  title: string;
  description: string;
  targetDate: Date;
  progress: number;
  isCompleted: boolean;
  createdAt: Date;
  priority: 'low' | 'medium' | 'high';
  category: string;
  isPublic?: boolean;
  collaborators?: string[];
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
  timeLimit?: number;
  createdAt: Date;
  attempts: QuizAttempt[];
  isPublic?: boolean;
  authorId?: string;
  authorName?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  subject: string;
  likes?: number;
  downloads?: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  points: number;
}

export interface QuizAttempt {
  id: string;
  startTime: Date;
  endTime: Date;
  score: number;
  answers: number[];
  timeSpent: number;
}

export interface StudyStreak {
  currentStreak: number;
  longestStreak: number;
  lastStudyDate: Date;
  totalDays: number;
}

export interface PomodoroSession {
  id: string;
  startTime: Date;
  endTime?: Date;
  duration: number;
  type: 'work' | 'short-break' | 'long-break';
  completed: boolean;
  task?: string;
}

export interface StudyAnalytics {
  totalStudyTime: number;
  averageSessionLength: number;
  mostProductiveHour: number;
  subjectDistribution: Record<string, number>;
  weeklyProgress: number[];
  accuracyTrend: number[];
}

export interface Reminder {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  isCompleted: boolean;
  priority: 'low' | 'medium' | 'high';
  type: 'study' | 'review' | 'deadline' | 'exam';
}

// New Community Features
export interface StudyGroup {
  id: string;
  name: string;
  description: string;
  subject: string;
  createdBy: string;
  createdAt: Date;
  members: GroupMember[];
  isPrivate: boolean;
  maxMembers: number;
  tags: string[];
  avatar?: string;
  rules?: string[];
}

export interface GroupMember {
  userId: string;
  username: string;
  role: 'admin' | 'moderator' | 'member';
  joinedAt: Date;
  avatar?: string;
  studyStreak: number;
  contributionScore: number;
}

export interface Discussion {
  id: string;
  groupId?: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  createdAt: Date;
  updatedAt: Date;
  replies: Reply[];
  likes: number;
  tags: string[];
  isResolved?: boolean;
  isPinned?: boolean;
  category: 'question' | 'discussion' | 'announcement' | 'resource';
}

export interface Reply {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  createdAt: Date;
  likes: number;
  isAnswer?: boolean;
}

export interface StudyBuddy {
  id: string;
  name: string;
  avatar?: string;
  subjects: string[];
  studyLevel: 'beginner' | 'intermediate' | 'advanced';
  timezone: string;
  preferredStudyTimes: string[];
  studyGoals: string[];
  isOnline: boolean;
  lastSeen: Date;
  matchScore?: number;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'monthly';
  category: string;
  points: number;
  startDate: Date;
  endDate: Date;
  participants: number;
  isCompleted?: boolean;
  progress?: number;
  requirements: ChallengeRequirement[];
}

export interface ChallengeRequirement {
  type: 'study_time' | 'notes_created' | 'flashcards_reviewed' | 'quiz_score' | 'streak_days';
  target: number;
  current?: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'study' | 'social' | 'streak' | 'quiz' | 'notes';
  points: number;
  unlockedAt?: Date;
  isUnlocked: boolean;
  progress?: number;
  maxProgress?: number;
}

export interface Leaderboard {
  id: string;
  type: 'global' | 'group' | 'subject';
  period: 'daily' | 'weekly' | 'monthly' | 'all-time';
  entries: LeaderboardEntry[];
  lastUpdated: Date;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  avatar?: string;
  score: number;
  change: number; // position change from last period
  badge?: string;
}

export interface StudyEvent {
  id: string;
  title: string;
  description: string;
  type: 'study_session' | 'quiz_competition' | 'group_study' | 'workshop';
  startTime: Date;
  endTime: Date;
  organizer: string;
  participants: string[];
  maxParticipants?: number;
  isPublic: boolean;
  subject: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  meetingLink?: string;
  resources?: string[];
}

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  bio?: string;
  subjects: string[];
  studyLevel: 'beginner' | 'intermediate' | 'advanced';
  joinedAt: Date;
  totalStudyTime: number;
  currentStreak: number;
  longestStreak: number;
  points: number;
  rank: number;
  achievements: Achievement[];
  badges: string[];
  preferences: UserPreferences;
  stats: UserStats;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  notifications: NotificationSettings;
  privacy: PrivacySettings;
  studyReminders: boolean;
  weeklyReports: boolean;
  communityUpdates: boolean;
}

export interface NotificationSettings {
  studyReminders: boolean;
  groupMessages: boolean;
  achievements: boolean;
  challenges: boolean;
  studyBuddyRequests: boolean;
  eventInvitations: boolean;
}

export interface PrivacySettings {
  profileVisibility: 'public' | 'friends' | 'private';
  showStudyStats: boolean;
  showOnlineStatus: boolean;
  allowStudyBuddyRequests: boolean;
}

export interface UserStats {
  totalNotes: number;
  totalFlashcards: number;
  totalQuizzes: number;
  averageQuizScore: number;
  favoriteSubject: string;
  studySessionsThisWeek: number;
  contributionsToGroups: number;
  helpfulAnswers: number;
}