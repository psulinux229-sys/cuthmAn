import React, { useState } from 'react';
import { X, Calendar, ChevronDown, Sparkles, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getAiMilestoneSuggestions } from '../services/aiService';
import { toast } from 'sonner';

interface CreateGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (goal: any) => void;
}

export default function CreateGoalModal({ isOpen, onClose, onSave }: CreateGoalModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Fitness');
  const [deadline, setDeadline] = useState('');
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [suggestedMilestones, setSuggestedMilestones] = useState<any[]>([]);

  const handleAiSuggest = async () => {
    if (!title || !description) {
      toast.error('Title and Description are required for AI analysis.');
      return;
    }

    setIsSuggesting(true);
    try {
      const suggestions = await getAiMilestoneSuggestions(title, description, category);
      setSuggestedMilestones(suggestions);
      toast.success('Architectural Clarity achieved.', {
        description: 'AI has analyzed your goal and suggested strategic milestones.'
      });
    } catch (error) {
      toast.error('AI Guidance unavailable at this time.');
    } finally {
      setIsSuggesting(false);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    
    onSave({
      title,
      description,
      category,
      dueDate: deadline ? `Due ${new Date(deadline).toLocaleDateString()}` : 'No deadline',
      targetDate: deadline ? new Date(deadline).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Ongoing',
      progress: 0,
      milestones: suggestedMilestones.map(m => ({ ...m, completed: false, id: crypto.randomUUID() })),
      notes: [],
      status: 'active'
    });
    
    // Reset fields
    setTitle('');
    setDescription('');
    setCategory('Fitness');
    setDeadline('');
    setSuggestedMilestones([]);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          
          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-white rounded-[2rem] shadow-2xl overflow-hidden"
          >
            <div className="p-8 lg:p-10">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-black font-display text-gray-900">Create New Goal</h2>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-900"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-6">
                {/* Goal Title */}
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-900 mb-2">Goal Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., Run a Marathon"
                    className="w-full px-5 py-4 bg-[#F8F9FA] border border-black/5 rounded-xl focus:ring-2 focus:ring-[#0036C1]/20 outline-none transition-all text-sm font-medium"
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-900">Description</label>
                    <button 
                      type="button"
                      onClick={handleAiSuggest}
                      disabled={isSuggesting || !title || !description}
                      className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-brand-primary hover:text-brand-secondary disabled:opacity-50 transition-colors"
                    >
                      {isSuggesting ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
                      AI Guidance
                    </button>
                  </div>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe your objective and key results..."
                    rows={4}
                    className="w-full px-5 py-4 bg-[#F8F9FA] border border-black/5 rounded-xl focus:ring-2 focus:ring-[#0036C1]/20 outline-none transition-all text-sm font-medium resize-none"
                  />
                </div>

                {suggestedMilestones.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="bg-brand-light p-4 rounded-xl border border-brand-primary/20"
                  >
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-brand-primary mb-3">AI Suggested Milestones</h3>
                    <ul className="space-y-2">
                      {suggestedMilestones.map((m, i) => (
                        <li key={i} className="text-xs font-medium text-gray-700 flex gap-2">
                          <span className="text-brand-primary">•</span>
                          {m.title}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                <div className="grid grid-cols-2 gap-6">
                  {/* Category */}
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-900 mb-2">Category Selector</label>
                    <div className="relative">
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-5 py-4 bg-[#F8F9FA] border border-black/5 rounded-xl focus:ring-2 focus:ring-[#0036C1]/20 outline-none transition-all text-sm font-medium appearance-none cursor-pointer"
                      >
                        <option>Fitness</option>
                        <option>Professional</option>
                        <option>Personal</option>
                        <option>Finance</option>
                      </select>
                      <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Deadline Picker */}
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-900 mb-2">Deadline Picker</label>
                    <div className="relative">
                      <input
                        type="date"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        className="w-full px-5 py-4 bg-[#F8F9FA] border border-black/5 rounded-xl focus:ring-2 focus:ring-[#0036C1]/20 outline-none transition-all text-sm font-medium appearance-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Progress Preview */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-900">Progress Preview</label>
                    <span className="text-[10px] font-black text-success">0%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-success w-0 transition-all duration-500" />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4 pt-6">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 py-4 bg-[#E2E8F0] text-[#0036C1] font-black rounded-xl text-xs uppercase tracking-widest hover:bg-[#CBD5E1] transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-4 bg-[#0036C1] text-white font-black rounded-xl text-xs uppercase tracking-widest hover:bg-[#002ba1] transition-all shadow-lg shadow-[#0036C1]/20"
                  >
                    Save Goal
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
