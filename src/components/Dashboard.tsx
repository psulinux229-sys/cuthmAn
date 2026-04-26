import React from 'react';
import { MoreHorizontal, TrendingUp } from 'lucide-react';
import { Goal, UserProfile } from '../types';
import { toast } from 'sonner';

interface DashboardProps {
  onGoalClick: (goal: Goal) => void;
  goals: Goal[];
  userProfile?: UserProfile;
}

export default function Dashboard({ onGoalClick, goals, userProfile }: DashboardProps) {
  const totalProgress = goals.length > 0 
    ? Math.round(goals.reduce((acc, goal) => acc + (goal.progress || 0), 0) / goals.length)
    : 0;

  const handleMoreOptions = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast.info('Strategic configuration access is restricted.');
  };

  const handleViewAll = () => {
    toast.info('Expanding focus viewport...', {
      description: 'Loading all active architectural nodes.'
    });
  };

  return (
    <div className="flex-1 p-6 lg:p-10 max-w-7xl mx-auto w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <p className="text-[10px] font-black font-sans text-gray-400 uppercase tracking-[0.2em] mb-2">Dashboard</p>
          <h1 className="text-4xl lg:text-6xl font-bold font-display text-gray-900 tracking-tight">
            Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 18 ? 'Afternoon' : 'Evening'}{userProfile ? `, ${userProfile.firstName}` : ''}.
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10 lg:mb-12">
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 lg:p-8 border border-border shadow-sm">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Overall Progress</h3>
            <button onClick={() => toast.info('Metrics refresh initiated.')}>
              <TrendingUp size={20} className="text-brand-primary" />
            </button>
          </div>
          <div className="flex items-end gap-3 mb-6">
            <span className="text-5xl lg:text-7xl font-bold font-display leading-none">{totalProgress}%</span>
            <p className="text-xs lg:text-sm text-gray-500 mb-2 font-medium">Of strategic objectives completed.</p>
          </div>
          <div className="h-2.5 lg:h-3 w-full bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-success transition-all duration-1000" style={{ width: `${totalProgress}%` }} />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 lg:p-8 border border-border shadow-sm flex flex-col justify-center cursor-pointer hover:bg-brand-light transition-colors" onClick={handleViewAll}>
          <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6">Active Focus</h3>
          <span className="text-5xl lg:text-7xl font-bold font-display leading-none">{goals.length}</span>
          <p className="text-xs lg:text-sm text-gray-500 mt-3 font-medium">Strategic nodes in progress</p>
        </div>
      </div>

      <div className="mb-10 flex justify-between items-center">
        <h2 className="text-2xl font-bold font-display text-gray-900">Active Goals</h2>
        <button 
          onClick={handleViewAll}
          className="text-sm font-semibold text-brand-primary hover:underline transition-all"
        >
          View All
        </button>
      </div>

      {goals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {goals.map((goal) => (
            <div 
              key={goal.id}
              onClick={() => onGoalClick(goal)}
              className="group bg-white rounded-2xl p-6 border border-border shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex gap-2 items-center">
                  <span className={`px-3 py-1 text-[10px] font-bold rounded-full tracking-wider uppercase ${
                    goal.status === 'invalid' ? 'bg-red-50 text-red-500' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {goal.category}
                  </span>
                  {goal.status === 'invalid' && (
                    <span className="px-3 py-1 text-[10px] font-bold rounded-full tracking-wider uppercase bg-red-500 text-white">
                      EXPIRED
                    </span>
                  )}
                </div>
                <button 
                  onClick={handleMoreOptions}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <MoreHorizontal size={20} />
                </button>
              </div>
              
              <h3 className="text-lg font-bold font-display text-gray-900 mb-2 group-hover:text-brand-primary transition-colors">
                {goal.title}
              </h3>
              <p className="text-sm text-gray-500 mb-8 line-clamp-2 h-10">
                {goal.description}
              </p>
              
              <div className="flex justify-between items-end mb-2">
                <span className="text-sm font-bold text-gray-900">{goal.progress || 0}%</span>
                <span className="text-[11px] font-medium text-gray-400">{goal.dueDate}</span>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-success transition-all duration-500" 
                  style={{ width: `${goal.progress || 0}%` }} 
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border border-black/5">
          <p className="text-gray-400 font-medium">No strategic goals found. Initialize your first focus node.</p>
        </div>
      )}
    </div>
  );
}
