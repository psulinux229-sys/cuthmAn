import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Goal, Milestone, Note } from '../types';
import { MOCK_GOALS } from '../mockData';

interface GoalContextType {
  goals: Goal[];
  addGoal: (goal: Omit<Goal, 'id' | 'milestones' | 'notes'>) => void;
  updateGoalProgress: (id: string, progress: number) => void;
  addMilestone: (goalId: string, milestone: Omit<Milestone, 'id'>) => void;
  toggleMilestone: (goalId: string, milestoneId: string) => void;
  addNote: (goalId: string, note: Omit<Note, 'id' | 'date'>) => void;
  deleteGoal: (id: string) => void;
}

const GoalContext = createContext<GoalContextType | undefined>(undefined);

export function GoalProvider({ children }: { children: ReactNode }) {
  const [goals, setGoals] = useState<Goal[]>(() => {
    const saved = localStorage.getItem('axiom-goals');
    return saved ? JSON.parse(saved) : MOCK_GOALS;
  });

  useEffect(() => {
    localStorage.setItem('axiom-goals', JSON.stringify(goals));
  }, [goals]);

  const addGoal = (goalData: Omit<Goal, 'id' | 'milestones' | 'notes'>) => {
    const newGoal: Goal = {
      ...goalData,
      id: crypto.randomUUID(),
      milestones: [],
      notes: [],
    };
    setGoals((prev) => [newGoal, ...prev]);
  };

  const updateGoalProgress = (id: string, progress: number) => {
    setGoals((prev) =>
      prev.map((g) => (g.id === id ? { ...g, progress: Math.min(100, Math.max(0, progress)) } : g))
    );
  };

  const addMilestone = (goalId: string, milestone: Omit<Milestone, 'id'>) => {
    setGoals((prev) =>
      prev.map((g) => {
        if (g.id === goalId) {
          const newMilestone: Milestone = {
            ...milestone,
            id: crypto.randomUUID(),
          };
          return { ...g, milestones: [...g.milestones, newMilestone] };
        }
        return g;
      })
    );
  };

  const toggleMilestone = (goalId: string, milestoneId: string) => {
    setGoals((prev) =>
      prev.map((g) => {
        if (g.id === goalId) {
          const updatedMilestones = g.milestones.map((m) =>
            m.id === milestoneId ? { ...m, completed: !m.completed } : m
          );
          
          // Auto-calculate progress based on milestones if milestones exist
          const completedCount = updatedMilestones.filter(m => m.completed).length;
          const progress = updatedMilestones.length > 0 
            ? Math.round((completedCount / updatedMilestones.length) * 100) 
            : g.progress;

          return { ...g, milestones: updatedMilestones, progress };
        }
        return g;
      })
    );
  };

  const addNote = (goalId: string, noteData: Omit<Note, 'id' | 'date'>) => {
    setGoals((prev) =>
      prev.map((g) => {
        if (g.id === goalId) {
          const newNote: Note = {
            ...noteData,
            id: crypto.randomUUID(),
            date: new Date().toLocaleDateString(),
          };
          return { ...g, notes: [newNote, ...g.notes] };
        }
        return g;
      })
    );
  };

  const deleteGoal = (id: string) => {
    setGoals((prev) => prev.filter((g) => g.id !== id));
  };

  return (
    <GoalContext.Provider value={{
      goals,
      addGoal,
      updateGoalProgress,
      addMilestone,
      toggleMilestone,
      addNote,
      deleteGoal
    }}>
      {children}
    </GoalContext.Provider>
  );
}

export function useGoals() {
  const context = useContext(GoalContext);
  if (context === undefined) {
    throw new Error('useGoals must be used within a GoalProvider');
  }
  return context;
}
