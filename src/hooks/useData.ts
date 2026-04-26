import { useState, useEffect } from 'react';
import { Goal } from '../types';
import { toast } from 'sonner';
import { db, auth } from '../lib/firebase';
import { collection, doc, query, where, orderBy, getDocs, setDoc, deleteDoc } from 'firebase/firestore';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export function useData(userId: string | undefined) {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<{message: string, code?: string} | null>(null);

  const fetchGoals = async () => {
    if (!userId) {
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      const q = query(
        collection(db, 'goals'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const fetchedGoals: Goal[] = [];
      querySnapshot.forEach((doc) => {
        fetchedGoals.push(doc.data() as Goal);
      });
      
      // Update logic for expiration
      const now = new Date();
      let hasUpdates = false;
      const updatedGoals = fetchedGoals.map(g => {
        if (g.deadline && g.status === 'active' && new Date(g.deadline) < now) {
          hasUpdates = true;
          return { ...g, status: 'invalid' as 'invalid' };
        }
        return g;
      });

      if (hasUpdates) {
        // Sync expired goals back to db silently
        updatedGoals.forEach(g => {
          if (g.status === 'invalid' && fetchedGoals.find(fg => fg.id === g.id)?.status !== 'invalid') {
            setDoc(doc(db, 'goals', g.id), { ...g, updatedAt: Date.now() }, { merge: true }).catch(console.error);
          }
        });
      }

      setGoals(updatedGoals);
      setError(null);
    } catch (err: any) {
      console.error('Fetch error:', err);
      toast.error('Failed to load cloud nodes.');
      handleFirestoreError(err, OperationType.LIST, 'goals');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, [userId]);

  const saveGoal = async (goal: Goal) => {
    if (!userId) return goal;
    try {
      const isNew = !goals.find(g => g.id === goal.id);
      const payload = {
        ...goal,
        userId,
        updatedAt: Date.now(),
        createdAt: isNew ? Date.now() : (goal.createdAt || Date.now())
      };

      await setDoc(doc(db, 'goals', goal.id), payload);
      
      setGoals(prev => {
        const index = prev.findIndex(g => g.id === goal.id);
        if (index > -1) {
          const newGoals = [...prev];
          newGoals[index] = payload as Goal;
          return newGoals;
        }
        return [payload as Goal, ...prev];
      });
      return payload as Goal;
    } catch (err: any) {
      toast.error('Cloud synchronization failed.');
      handleFirestoreError(err, OperationType.WRITE, `goals/${goal.id}`);
      throw err; // rethrow to keep existing behavior if anything relies on it
    }
  };

  const removeGoal = async (id: string) => {
    if (!userId) return;
    try {
      await deleteDoc(doc(db, 'goals', id));
      setGoals(prev => prev.filter(g => g.id !== id));
      toast.success('Node removed from strategy map.');
    } catch (err: any) {
      toast.error('Cloud removal failed.');
      handleFirestoreError(err, OperationType.DELETE, `goals/${id}`);
    }
  };

  return { goals, loading, error, saveGoal, removeGoal, refresh: fetchGoals };
}
