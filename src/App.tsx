import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, AlertCircle, RefreshCw } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import GoalDetail from './components/GoalDetail';
import Profile from './components/Profile';
import MyGoalsView from './components/MyGoalsView';
import PricingView from './components/PricingView';
import DashboardView from './components/DashboardView';
import CreateGoalModal from './components/CreateGoalModal';
import Login from './components/Login';
import { Toaster, toast } from 'sonner';
import { Goal, View, UserProfile } from './types';
import { useData } from './hooks/useData';
import { auth, db } from './lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

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
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export default function App() {
  const [currentView, setCurrentView] = useState<View>(() => {
    const saved = localStorage.getItem('axiom_current_view');
    return (saved as View) || 'overview';
  });
  
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [authUid, setAuthUid] = useState<string | undefined>(undefined);
  const [authLoading, setAuthLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setAuthUid(user.uid);
        // fetch profile
        try {
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserProfile(docSnap.data() as UserProfile);
          }
        } catch (err: any) {
          handleFirestoreError(err, OperationType.GET, `users/${user.uid}`);
        }
      } else {
        setAuthUid(undefined);
        setUserProfile(null);
      }
      setAuthLoading(false);
    });
    return unsubscribe;
  }, []);

  const { goals, loading, error, saveGoal, refresh } = useData(authUid);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleLogin = async (profileData: { firstName: string; lastName: string; email: string; role: string; uid: string }) => {
    try {
      const payload: UserProfile = {
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        email: profileData.email,
        role: profileData.role,
        createdAt: Date.now(),
        updatedAt: Date.now()
      };
      await setDoc(doc(db, 'users', profileData.uid), payload);
      setUserProfile(payload);
    } catch (err: any) {
      console.error('Login error', err);
      toast.error('Failed to save profile: ' + (err.message || ''));
      handleFirestoreError(err, OperationType.WRITE, `users/${profileData.uid}`);
    }
  };

  const handleUpdateProfile = async (profile: UserProfile) => {
    if (!authUid) return;
    try {
      const payload = {
        ...profile,
        updatedAt: Date.now()
      };
      await setDoc(doc(db, 'users', authUid), payload, { merge: true });
      setUserProfile(payload);
      toast.success('Profile updated');
    } catch (err: any) {
      toast.error('Failed to update profile');
      handleFirestoreError(err, OperationType.WRITE, `users/${authUid}`);
    }
  };

  useEffect(() => {
    localStorage.setItem('axiom_current_view', currentView);
  }, [currentView]);

  const handleGoalClick = (goal: Goal) => {
    setSelectedGoal(goal);
    setCurrentView('goal-detail');
  };

  const handleCreateGoal = async (data: any) => {
    const newGoal: Partial<Goal> = {
      id: crypto.randomUUID(),
      ...data,
      progress: 0,
      status: 'active',
      milestones: [],
      notes: []
    };
    
    try {
      await saveGoal(newGoal as Goal);
      setIsCreateModalOpen(false);
      toast.success('Goal established successfully.', {
        description: 'New node integrated into your cloud strategy map.'
      });
    } catch (err) {
      // Error handled by hook
    }
  };

  const handleGoalUpdate = async (goalId: string, updates: Partial<Goal>) => {
    const goal = goals.find(g => g.id === goalId);
    if (!goal) return;
    await saveGoal({ ...goal, ...updates });
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-brand-primary border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-primary">Initializing Synapse...</p>
      </div>
    );
  }

  if (!userProfile && authUid) {
    return <Login onLogin={handleLogin} />;
  }

  if (!authUid) {
    return <Login onLogin={handleLogin} />;
  }

  const renderView = () => {
    if (error) {
      return (
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto">
          <div className={`w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6`}>
            <AlertCircle size={32} />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Cloud Synapse Disconnected</h2>
          <p className="text-gray-500 text-sm mb-8">{error.message}</p>
          <div className="flex gap-4">
            <button 
              onClick={() => refresh()}
              className="flex items-center gap-2 px-6 py-3 bg-brand-primary text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all"
            >
              <RefreshCw size={14} />
              Retry Connection
            </button>
          </div>
        </div>
      );
    }

    if (loading && goals.length === 0) {
      return (
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="w-12 h-12 border-4 border-brand-primary border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-primary">Synchronizing Architectural Nodes...</p>
        </div>
      );
    }

    switch (currentView) {
      case 'overview':
        return <Dashboard onGoalClick={handleGoalClick} goals={goals} userProfile={userProfile!} />;
      case 'goals':
        return <MyGoalsView onGoalClick={handleGoalClick} onCreateGoal={() => setIsCreateModalOpen(true)} goals={goals} />;
      case 'pricing':
        return <PricingView />;
      case 'dashboard':
        return <DashboardView onGoalClick={handleGoalClick} goals={goals} userProfile={userProfile!} />;
      case 'goal-detail':
        return selectedGoal ? (
          <GoalDetail 
            goal={goals.find(g => g.id === selectedGoal.id) || selectedGoal} 
            onBack={() => setCurrentView('goals')}
            onUpdate={(updates) => handleGoalUpdate(selectedGoal.id, updates)}
          />
        ) : <Dashboard onGoalClick={handleGoalClick} goals={goals} userProfile={userProfile!} />;
      case 'preferences':
        return <Profile userProfile={userProfile!} onUpdateProfile={handleUpdateProfile} />;
      default:
        return (
          <div className="flex-1 flex items-center justify-center text-gray-400 font-medium px-6">
            <p className="text-center">View "{currentView}" is coming soon.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-surface relative">
      <Toaster position="top-center" richColors />
      <CreateGoalModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
        onSave={handleCreateGoal} 
      />
      
      {/* Mobile Top Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-border z-30 flex items-center justify-between px-6">
        <h1 className="text-lg font-bold text-brand-primary">Axiom Focus</h1>
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Menu size={24} />
        </button>
      </div>

      <Sidebar 
        currentView={currentView} 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onCreateGoal={() => {
          setIsCreateModalOpen(true);
          setIsSidebarOpen(false);
        }}
        onNavigate={(view) => {
          setCurrentView(view);
          setSelectedGoal(null);
          setIsSidebarOpen(false);
        }} 
        userProfile={userProfile}
      />
      
      <main className="flex-1 lg:ml-64 min-h-screen pt-16 lg:pt-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView + (selectedGoal?.id || '')}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="w-full h-full pb-24"
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="fixed bottom-0 lg:left-64 left-0 right-0 p-4 lg:p-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 bg-surface/80 backdrop-blur-sm border-t border-black/5 z-20">
        <span className="text-center md:text-left">© 2024 AXIOM GOAL SYSTEMS. ARCHITECTURAL CLARITY ASSURED.</span>
        <div className="flex gap-4 md:gap-8 flex-wrap justify-center">
          <button onClick={() => toast.info('Cloud Backup: Status ACTIVE')} className="hover:text-brand-primary transition-colors">Storage Protocol</button>
          <button onClick={() => toast.info('Reviewing Architectural Terms of Service...')} className="hover:text-brand-primary transition-colors">Terms of Service</button>
          <button onClick={() => toast.info('Security Node Status: COMPROMISE-NULL')} className="hover:text-brand-primary transition-colors">Security</button>
          <button onClick={() => toast.info('Syncing with Developer Nexus...')} className="hover:text-brand-primary transition-colors">API Documentation</button>
        </div>
      </footer>
    </div>
  );
}
