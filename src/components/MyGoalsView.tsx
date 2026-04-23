import React from 'react';
import { MOCK_GOALS } from '../mockData';
import { Goal } from '../types';
import { ArrowRight, MoreHorizontal } from 'lucide-react';
import { toast } from 'sonner';

interface MyGoalsViewProps {
  onGoalClick: (goal: Goal) => void;
  onCreateGoal: () => void;
}

export default function MyGoalsView({ onGoalClick, onCreateGoal }: MyGoalsViewProps) {
  const handleMoreOptions = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast.info('Goal configuration access is restricted.');
  };

  return (
    <div className="flex-1 p-6 lg:p-10 max-w-7xl mx-auto w-full">
      <div className="flex justify-between items-center mb-10 lg:mb-12">
        <div>
          <p className="text-[10px] font-black font-sans text-gray-400 uppercase tracking-[0.2em] mb-2">Workspace</p>
          <h1 className="text-4xl lg:text-5xl font-bold font-display text-gray-900 tracking-tight">My Goals</h1>
        </div>
        <button 
          onClick={onCreateGoal}
          className="px-6 py-3 bg-[#0036C1] text-white font-bold rounded-lg text-sm hover:bg-[#002ba1] transition-all uppercase tracking-widest shadow-lg shadow-[#0036C1]/20"
        >
          Create Goal
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {MOCK_GOALS.map((goal) => (
          <div 
            key={goal.id}
            onClick={() => onGoalClick(goal)}
            className="group bg-white rounded-3xl p-8 lg:p-10 border border-black/5 shadow-sm hover:shadow-xl transition-all cursor-pointer relative overflow-hidden flex flex-col h-full"
          >
            <div className="flex justify-between items-start mb-8">
              <span className="px-4 py-1.5 bg-[#F8F9FF] text-[10px] font-black text-[#0036C1] rounded-full tracking-wider uppercase border border-[#DEE5FF]">
                {goal.category}
              </span>
              <button 
                onClick={handleMoreOptions}
                className="text-gray-300 hover:text-gray-900 p-2 -mr-2"
              >
                <MoreHorizontal size={24} />
              </button>
            </div>
            
            <div className="flex-1">
              <h3 className="text-2xl lg:text-3xl font-extrabold font-display text-gray-900 mb-4 group-hover:text-[#0036C1] transition-colors leading-tight">
                {goal.title}
              </h3>
              <p className="text-gray-500 font-medium mb-10 leading-relaxed max-w-md">
                {goal.description}
              </p>
            </div>
            
            <div className="mt-auto">
              <div className="flex justify-between items-end mb-4">
                <div>
                  <span className="text-3xl lg:text-4xl font-black font-display text-[#0036C1]">{goal.progress}%</span>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Completion</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-gray-900">{goal.dueDate}</span>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Deadline</p>
                </div>
              </div>
              
              <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden mb-8">
                <div 
                  className="h-full bg-[#50FFC2] transition-all duration-700 ease-out shadow-[0_0_10px_rgba(80,255,194,0.3)]" 
                  style={{ width: `${goal.progress}%` }} 
                />
              </div>

              <div className="flex items-center gap-2 text-[#0036C1] font-black text-[10px] uppercase tracking-[0.2em] group-hover:gap-3 transition-all">
                <span>View ARCHITECTURE</span>
                <ArrowRight size={14} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
