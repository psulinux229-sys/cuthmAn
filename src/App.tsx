/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import GoalDetail from './components/GoalDetail';
import Profile from './components/Profile';
import MyGoalsView from './components/MyGoalsView';
import PricingView from './components/PricingView';
import DashboardView from './components/DashboardView';
import CreateGoalModal from './components/CreateGoalModal';
import { Toaster, toast } from 'sonner';
import { Goal, View } from './types';

import { GoalProvider, useGoals } from './contexts/GoalContext';

function AppContent() {
  const [currentView, setCurrentView] = useState<View>('overview');
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const { addGoal } = useGoals();

  const handleGoalClick = (goal: Goal) => {
    setSelectedGoal(goal);
    setCurrentView('goal-detail');
  };

  const handleCreateSave = (newGoal: any) => {
    addGoal(newGoal);
    toast.success('Goal Architectural Node established.', {
      description: `"${newGoal.title}" has been added to your strategic workspace.`
    });
  };

  const renderView = () => {
    switch (currentView) {
      case 'overview':
        return <Dashboard onGoalClick={handleGoalClick} />;
      case 'goals':
        return <MyGoalsView onGoalClick={handleGoalClick} onCreateGoal={() => setIsCreateModalOpen(true)} />;
      case 'pricing':
        return <PricingView />;
      case 'dashboard':
        return <DashboardView onGoalClick={handleGoalClick} />;
      case 'goal-detail':
        return selectedGoal ? (
          <GoalDetail 
            goal={selectedGoal} 
            onBack={() => setCurrentView('goals')} 
          />
        ) : <Dashboard onGoalClick={handleGoalClick} />;
      case 'preferences':
        return <Profile />;
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
        onSave={handleCreateSave} 
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
          <button onClick={() => toast.info('Privacy Protocols are strictly enforced.')} className="hover:text-brand-primary transition-colors">Privacy Policy</button>
          <button onClick={() => toast.info('Reviewing Architectural Terms of Service...')} className="hover:text-brand-primary transition-colors">Terms of Service</button>
          <button onClick={() => toast.info('Security Node Status: COMPROMISE-NULL')} className="hover:text-brand-primary transition-colors">Security</button>
          <button onClick={() => toast.info('Redirecting to Developer Nexus...')} className="hover:text-brand-primary transition-colors">API Documentation</button>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <GoalProvider>
      <AppContent />
    </GoalProvider>
  );
}

