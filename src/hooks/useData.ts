import { useState, useEffect } from 'react';
import { Goal } from '../types';
import { toast } from 'sonner';

// Using a stable UID for the "Axiom" demo if no auth is present
const DEMO_USER_ID = '00000000-0000-0000-0000-000000000001';

export function useData() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<{message: string, code?: string} | null>(null);

  const fetchGoals = async () => {
    try {
      const response = await fetch('/api/goals', {
        headers: { 'x-user-id': DEMO_USER_ID }
      });
      
      const contentType = response.headers.get("content-type");
      if (!response.ok) {
        if (contentType && contentType.indexOf("application/json") !== -1) {
          const data = await response.json();
          throw { message: data.error || 'Server error', code: data.code };
        } else {
          const text = await response.text();
          throw { message: `Server returned ${response.status}: ${text.slice(0, 100)}` };
        }
      }

      if (contentType && contentType.indexOf("application/json") !== -1) {
        const data = await response.json();
        setGoals(data);
        setError(null);
      } else {
        throw { message: 'Expected JSON response from server' };
      }
    } catch (err: any) {
      console.error('Fetch error:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  const saveGoal = async (goal: Goal) => {
    try {
      const response = await fetch('/api/goals', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-user-id': DEMO_USER_ID 
        },
        body: JSON.stringify(goal),
      });
      if (!response.ok) throw new Error('Failed to save to cloud.');
      const savedGoal = await response.json();
      setGoals(prev => {
        const index = prev.findIndex(g => g.id === savedGoal.id);
        if (index > -1) {
          const newGoals = [...prev];
          newGoals[index] = savedGoal;
          return newGoals;
        }
        return [savedGoal, ...prev];
      });
      return savedGoal;
    } catch (err: any) {
      toast.error('Cloud synchronization failed.');
      throw err;
    }
  };

  const removeGoal = async (id: string) => {
    try {
      const response = await fetch(`/api/goals/${id}`, {
        method: 'DELETE',
        headers: { 'x-user-id': DEMO_USER_ID }
      });
      if (!response.ok) throw new Error('Failed to remove from cloud.');
      setGoals(prev => prev.filter(g => g.id !== id));
      toast.success('Node removed from strategy map.');
    } catch (err: any) {
      toast.error('Cloud removal failed.');
    }
  };

  return { goals, loading, error, saveGoal, removeGoal, refresh: fetchGoals };
}
