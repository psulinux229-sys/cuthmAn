export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export type View = 'overview' | 'goals' | 'pricing' | 'dashboard' | 'preferences' | 'goal-detail';

export interface Goal {
  id: string;
  userId?: string;
  title: string;
  category: string;
  progress: number;
  description?: string;
  dueDate: string;
  deadline?: string;
  createdAt?: number;
  updatedAt?: number;
  status: 'active' | 'completed' | 'invalid';
  targetDate: string;
  milestones: Milestone[];
  notes: Note[];
}

export interface Milestone {
  id: string;
  title: string;
  completed: boolean;
  date?: string;
  description?: string;
}

export interface Note {
  id: string;
  type: 'progress' | 'motivation';
  content: string;
  author: string;
  date: string;
}
