import { ArrowLeft, CheckCircle2, ChevronRight, Clock, Plus } from 'lucide-react';
import { Goal, Milestone, Note } from '../types';
import ProgressBar from './ProgressBar';
import { toast } from 'sonner';
import { useState } from 'react';
import { useGoals } from '../contexts/GoalContext';

interface GoalDetailProps {
  goal: Goal;
  onBack: () => void;
}

export default function GoalDetail({ goal: initialGoal, onBack }: GoalDetailProps) {
  const { goals, toggleMilestone, addNote, addMilestone } = useGoals();
  const goal = goals.find(g => g.id === initialGoal.id) || initialGoal;

  const progressValue = goal.progress;

  const handleToggleMilestone = (milestoneId: string) => {
    toggleMilestone(goal.id, milestoneId);
  };

  const handleEdit = () => {
    toast.info('Editing mode restricted to administrative nodes.');
  };

  const handleLogProgress = () => {
    toast.success('Strategy progress logged successfully.', {
      description: 'Calculating architectural alignment...'
    });
  };

  const handleAddTask = () => {
    const title = window.prompt('Enter task title:');
    if (title) {
      addMilestone(goal.id, {
        title,
        completed: false,
        description: 'Added via strategic override.'
      });
      toast.success('Task integrated into architecture.');
    }
  };

  const handleAddNote = () => {
    const content = window.prompt('Enter note content:');
    if (content) {
      addNote(goal.id, {
        content: `"${content}"`,
        type: 'progress',
        author: 'User'
      });
      toast.success('Note archived in strategy logs.');
    }
  };

  return (
    <div className="flex-1 p-6 lg:p-10 max-w-7xl mx-auto w-full">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-gray-900 mb-8 transition-colors group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        <span>Back to My Goals</span>
      </button>

      <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-10">
        <div>
          <span className="px-3 py-1 bg-[#DEE5FF] text-[10px] font-black text-[#2D5BFF] rounded-full tracking-[0.2em] uppercase mb-4 inline-block">
            {goal.category}
          </span>
          <h1 className="text-5xl lg:text-7xl font-black font-display text-gray-900 tracking-tight mb-3">
            {goal.title}
          </h1>
          <p className="text-gray-500 font-semibold text-sm lg:text-base">Target Date: {goal.targetDate}</p>
        </div>
        <div className="flex gap-3 w-full lg:w-auto">
          <button 
            onClick={handleEdit}
            className="flex-1 lg:flex-none px-6 py-3.5 bg-[#E8E9EF] text-gray-700 font-bold rounded-lg text-sm hover:bg-gray-200 transition-all">
            Edit Goal
          </button>
          <button 
            onClick={handleLogProgress}
            className="flex-2 lg:flex-none px-8 py-3.5 bg-[#0036C1] text-white font-bold rounded-lg text-sm hover:bg-[#002ba1] transition-all uppercase tracking-widest">
            LOG PROGRESS
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-10">
        <div className="lg:col-span-2 bg-white rounded-2xl p-8 lg:p-12 border border-black/5 shadow-sm flex flex-col justify-center relative overflow-hidden">
          <div className="flex justify-between items-start mb-12">
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">Overall Progress</h3>
              <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">14 weeks remaining</p>
            </div>
            <div className="text-right">
              <span className="text-6xl lg:text-8xl font-black font-display text-[#0036C1] leading-none block">{progressValue}%</span>
              <p className="text-gray-400 font-bold text-[10px] uppercase tracking-[0.15em] mt-2">0/26 Miles Target</p>
            </div>
          </div>
          <div className="mt-auto">
            <ProgressBar progress={progressValue} />
          </div>
        </div>

        <div className="relative overflow-hidden bg-[#1A3FB5] rounded-3xl p-10 text-white flex flex-col items-center justify-center text-center shadow-lg min-h-[320px]">
          {/* Diagonal pattern background */}
          <div 
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{ 
              backgroundImage: 'repeating-linear-gradient(45deg, #fff, #fff 1px, transparent 1px, transparent 10px)' 
            }}
          />
          
          <div className="relative z-10">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Clock size={32} className="text-white" />
            </div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-80 mb-4">TIME REMAINING</h3>
            <div className="flex flex-col items-center">
              <span className="text-8xl font-black font-display leading-none mb-2">98</span>
              <p className="text-sm font-black opacity-80 uppercase tracking-[0.3em]">Days</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-10">
        <div className="lg:col-span-3 bg-white rounded-3xl p-8 lg:p-12 border border-black/5 shadow-sm">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-extrabold font-display text-gray-900">Milestones & Tasks</h2>
            <button 
              onClick={handleAddTask}
              className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-[#0036C1] hover:underline"
            >
              <Plus size={20} />
              <span>Add Task</span>
            </button>
          </div>

          <div className="space-y-4">
            {goal.milestones.map((milestone) => (
              <div 
                key={milestone.id}
                onClick={() => handleToggleMilestone(milestone.id)}
                className={`p-6 lg:p-8 rounded-2xl border flex items-center justify-between transition-all cursor-pointer ${
                  milestone.completed 
                    ? 'bg-[#F8F9FF] border-transparent opacity-60' 
                    : (milestone as any).active
                      ? 'bg-[#F8F9FF] border-[#0036C1] border-l-8'
                      : 'bg-white border-black/5'
                }`}
              >
                <div className="flex items-center gap-6">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 ${
                    milestone.completed ? 'bg-[#50FFC2] border-transparent text-white' : 'border-gray-200 bg-white'
                  }`}>
                    {milestone.completed ? (
                      <CheckCircle2 size={24} className="text-[#0036C1]" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
                    )}
                  </div>
                  <div>
                    <h4 className={`font-extrabold text-lg lg:text-xl ${milestone.completed ? 'text-gray-400' : 'text-gray-900'}`}>{milestone.title}</h4>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">
                      {milestone.date || milestone.description || 'Pending Execution'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {goal.milestones.length === 0 && (
              <div className="text-center py-12 border border-dashed border-gray-200 rounded-2xl">
                <p className="text-gray-400 font-medium">No milestones established for this architectural node.</p>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-3xl p-8 lg:p-12 border border-black/5 shadow-sm">
            <h2 className="text-3xl font-extrabold font-display text-gray-900 mb-10">Recent Notes & Motivation</h2>
            
            <div className="space-y-8">
              {goal.notes.map((note) => (
                <div key={note.id} className="bg-[#F8F9FF] rounded-2xl p-8 border border-black/5">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">{note.type.toUpperCase()} NOTE</span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{note.date}</span>
                  </div>
                  <p className="text-sm lg:text-base font-medium italic text-gray-600 leading-relaxed">
                    {note.content}
                  </p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-4">AUTHOR: {note.author}</p>
                </div>
              ))}
              
              {goal.notes.length === 0 && (
                <div className="text-center py-8 border border-dashed border-gray-200 rounded-2xl">
                  <p className="text-xs text-gray-400 font-medium italic">Strategic logs are currently empty.</p>
                </div>
              )}

              <div className="relative rounded-3xl overflow-hidden aspect-square lg:aspect-video group cursor-pointer border border-black/5 shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?auto=format&fit=crop&q=80&w=800" 
                  alt="Motivation" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-8 text-center backdrop-blur-[1px]">
                  <p className="text-2xl lg:text-3xl font-bold italic text-white leading-tight">
                    "The miracle isn't that I finished. The miracle is that I had the courage to start."
                  </p>
                </div>
              </div>

              <button 
                onClick={handleAddNote}
                className="w-full py-5 bg-[#F1F3F9] text-[10px] font-black uppercase tracking-[0.3em] text-[#0036C1] rounded-xl hover:bg-gray-200 transition-all border border-black/5"
              >
                Add Note
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
