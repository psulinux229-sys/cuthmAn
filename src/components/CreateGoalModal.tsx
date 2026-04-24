import React, { useState } from 'react';
import { X, Calendar, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';

interface CreateGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (goalData: any) => Promise<void>;
}

export default function CreateGoalModal({ isOpen, onClose, onSave }: CreateGoalModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Fitness');
  const [deadline, setDeadline] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || isSaving) return;
    
    setIsSaving(true);
    try {
      await onSave({
        title,
        description,
        category,
        dueDate: deadline ? `Due ${new Date(deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}` : 'No date',
        targetDate: deadline ? new Date(deadline).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : '',
        progress: 0,
        status: 'active',
      });
      
      // Reset fields
      setTitle('');
      setDescription('');
      setCategory('Fitness');
      setDeadline('');
    } catch (error) {
      // Error handled by parent
    } finally {
      setIsSaving(false);
    }
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
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-900 mb-2">Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe your objective and key results..."
                    rows={4}
                    className="w-full px-5 py-4 bg-[#F8F9FA] border border-black/5 rounded-xl focus:ring-2 focus:ring-[#0036C1]/20 outline-none transition-all text-sm font-medium resize-none"
                  />
                </div>

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
                    disabled={isSaving}
                    className="flex-1 py-4 bg-[#0036C1] text-white font-black rounded-xl text-xs uppercase tracking-widest hover:bg-[#002ba1] transition-all shadow-lg shadow-[#0036C1]/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSaving ? 'Establishing...' : 'Save Goal'}
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
