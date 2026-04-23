import { 
  Bell, 
  Home,
  LayoutDashboard, 
  Plus, 
  Settings, 
  Target,
  CircleHelp,
  Tag
} from 'lucide-react';
import { View } from '../types';
import { toast } from 'sonner';

interface SidebarProps {
  currentView: View;
  onNavigate: (view: View) => void;
  isOpen: boolean;
  onClose: () => void;
  onCreateGoal: () => void;
}

export default function Sidebar({ currentView, onNavigate, isOpen, onClose, onCreateGoal }: SidebarProps) {
  const handleHelp = () => {
    toast.info('Accessing Knowledge Base...', {
      description: 'Loading architectural support documentation.'
    });
  };

  const menuItems = [
    { id: 'overview' as View, icon: Home, label: 'Overview' },
    { id: 'dashboard' as View, icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'goals' as View, icon: Target, label: 'My Goals' },
    { id: 'pricing' as View, icon: Tag, label: 'Pricing' },
    { id: 'preferences' as View, icon: Settings, label: 'Profile & Settings' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      <div className={`w-64 h-full bg-surface border-r border-border flex flex-col p-6 fixed lg:left-0 top-0 z-50 transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="flex justify-between items-start mb-10">
          <div className="flex flex-col">
            <h1 className="text-lg font-bold text-brand-primary">Axiom Focus</h1>
            <p className="text-xs text-gray-400">Peak Performance</p>
          </div>
          <button onClick={onClose} className="lg:hidden text-gray-400">
            <Plus size={24} className="rotate-45" />
          </button>
        </div>

      <button 
        onClick={onCreateGoal}
        className="bg-brand-primary text-white rounded-lg py-3 px-4 flex items-center justify-center gap-2 mb-8 hover:bg-brand-secondary transition-colors font-medium"
      >
        <Plus size={18} />
        <span>NEW GOAL</span>
      </button>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              currentView === item.id 
                ? 'bg-white shadow-sm text-brand-primary' 
                : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            <item.icon size={20} className={currentView === item.id ? 'text-brand-primary' : 'text-gray-400'} />
            <span className="font-medium text-sm">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-border space-y-4">
        <button 
          onClick={handleHelp}
          className="flex items-center gap-3 px-4 py-2 text-gray-500 hover:text-gray-900 transition-colors w-full"
        >
          <CircleHelp size={20} />
          <span className="text-sm font-medium">Help Center</span>
        </button>
        
        <div className="flex items-center gap-3 px-4 py-2">
          <img 
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Cuthmaan" 
            alt="User profile" 
            className="w-8 h-8 rounded-full bg-gray-200"
            referrerPolicy="no-referrer"
          />
          <span className="text-sm font-semibold text-gray-900">Cuthmaan</span>
        </div>
      </div>
    </div>
  </>
);
}
