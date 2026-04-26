import { Goal, UserProfile } from '../types';
import { MOCK_GOALS } from '../mockData';
import { Target, Search, Bell, ChevronRight, Zap, Target as TargetIcon, Shield, Search as SearchIcon, MousePointer2 } from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner';

interface DashboardViewProps {
  onGoalClick: (goal: Goal) => void;
  goals: Goal[];
  userProfile?: UserProfile;
}

export default function DashboardView({ onGoalClick, goals, userProfile }: DashboardViewProps) {
  const handleStartBuilding = () => {
    toast.success('Strategy Engine initialized. Your architectural journey begins.');
  };

  const handleViewDemo = () => {
    toast.info('Loading Axiom Focus interactive demonstration...', {
      description: 'Preparing the viewport for high-performance visualization.'
    });
  };

  const handleSearchClick = () => {
    toast.info('Search functionality is restricted to institutional nodes.');
  };

  const handleViewAll = () => {
    toast.info('Expanding focus viewport...', {
      description: 'Loading all active architectural nodes.'
    });
  };
  const weeklyData = [
    { day: 'MON', height: 0 },
    { day: 'TUE', height: 0 },
    { day: 'WED', height: 0 },
    { day: 'THU', height: 0, active: true },
    { day: 'FRI', height: 0 },
    { day: 'SAT', height: 0 },
    { day: 'SUN', height: 0 },
  ];

  const features = [
    {
      title: 'Smart Goal Tracking',
      description: 'Define objectives with architectural clarity. Break massive ambitions down into executable, daily primitives.',
      icon: TargetIcon,
    },
    {
      title: 'Motivational Reminders',
      description: 'Contextual nudges designed to maintain momentum, not cause distraction. Engineered for the high-performance mind.',
      icon: Bell,
    },
    {
      title: 'Structural Clarity',
      description: 'Our interface reduces cognitive load, allowing you to focus on execution rather than navigation.',
      icon: Shield,
    },
  ];

  return (
    <div className="flex-1 w-full bg-white">
      {/* Hero Section */}
      <section className="pt-20 pb-24 px-6 lg:px-10 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-6xl lg:text-8xl font-black font-display text-gray-900 tracking-tight leading-none mb-8">
            Achieve Your <br />
            <span className="text-[#0036C1]">Ambitions.</span>
          </h1>
          <p className="max-w-3xl mx-auto text-gray-500 font-semibold text-sm lg:text-lg leading-relaxed mb-12">
            A high-performance environment for focus. Architectural clarity for your goals, removing distractions and elevating your daily progress.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button 
              onClick={handleStartBuilding}
              className="px-10 py-5 bg-[#0026C1] text-white font-black rounded-xl text-sm hover:scale-105 transition-all shadow-xl shadow-[#0026C1]/20 uppercase tracking-[0.1em]"
            >
              Start Building Today
            </button>
            <button 
              onClick={handleViewDemo}
              className="px-10 py-5 bg-white text-[#0026C1] font-black rounded-xl text-sm border-2 border-[#0026C1]/10 hover:bg-gray-50 transition-all uppercase tracking-[0.1em]"
            >
              View Demo
            </button>
          </div>
        </motion.div>
      </section>

      {/* Main UI Preview Section */}
      <section className="bg-[#F8F9FA] py-24 px-6 lg:px-10 border-y border-black/5">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-black/5 border border-black/5 overflow-hidden">
            {/* Header / Search */}
            <div className="p-8 border-b border-black/5 flex justify-between items-center bg-gray-50/50">
              <h2 className="text-xl font-black font-display text-gray-900">Weekly Overview</h2>
              <div className="flex items-center gap-6">
                <button 
                  onClick={handleSearchClick}
                  className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-400 hover:text-[#0026C1]"
                >
                  <Search size={20} />
                </button>
                <div className="w-10 h-10 bg-gray-200 rounded-full cursor-pointer hover:ring-4 hover:ring-brand-light transition-all overflow-hidden" onClick={() => toast.info(`System Identity: ${userProfile?.firstName || 'User'}`)}>
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userProfile?.firstName || 'User'}`} alt="User" />
                </div>
              </div>
            </div>

            {/* Chart Area */}
            <div className="p-10 lg:p-16">
              <div className="flex items-end justify-between h-64 gap-3 lg:gap-8 mb-12">
                {weeklyData.map((d, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center">
                    <div className="relative w-full group">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${d.height}%` }}
                        transition={{ delay: i * 0.1, duration: 1 }}
                        className={`w-full rounded-xl transition-all ${
                          d.active ? 'bg-[#98A7F5]' : 'bg-[#BDC8F1]'
                        } group-hover:bg-[#0026C1]`}
                      />
                    </div>
                    <span className="text-[10px] font-black text-gray-400 mt-6 tracking-widest">{d.day}</span>
                  </div>
                ))}
              </div>

              {/* Active Goals Section */}
              <div className="mt-20">
                <div className="flex justify-between items-center mb-10">
                  <h3 className="text-xl font-black font-display text-gray-900">Active Goals</h3>
                  <button 
                    onClick={handleViewAll}
                    className="text-[10px] font-black uppercase text-[#0026C1] hover:underline"
                  >
                    View All
                  </button>
                </div>

                <div className="space-y-4">
                  {goals.slice(0, 2).map((goal, idx) => (
                    <div 
                      key={goal.id} 
                      onClick={() => onGoalClick(goal)}
                      className="p-8 bg-white border border-black/5 rounded-3xl flex items-center justify-between hover:border-[#0026C1] transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-8">
                        <div className="w-12 h-12 bg-[#F8F9FF] rounded-2xl flex items-center justify-center text-[#0026C1] border border-[#DEE5FF]">
                          {idx === 0 ? <Zap size={24} /> : <MousePointer2 size={24} />}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-lg font-black text-gray-900">{goal.title}</h4>
                            {goal.status === 'invalid' && (
                              <span className="px-2 py-0.5 text-[8px] font-black rounded-full tracking-wider uppercase bg-red-500 text-white border border-red-600">
                                EXPIRED
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Corporate Objectives</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-3">
                        <span className="text-sm font-black text-gray-900">{goal.progress}%</span>
                        <div className="w-32 lg:w-48 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className={`h-full ${idx === 0 ? 'bg-[#0026C1]' : 'bg-[#50FFC2]'} transition-all`} style={{ width: `${goal.progress}%` }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section className="py-24 px-6 lg:px-10 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-6xl font-black font-display text-gray-900 tracking-tight mb-4">
            Precision Engineered Features
          </h2>
          <p className="text-gray-500 font-semibold max-w-2xl mx-auto">
            A visual framework that prioritizes whitespace and tonal depth over rigid borders and cluttered dashboards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {features.map((f, i) => (
            <div key={i} className="bg-white rounded-[2rem] p-10 lg:p-12 border border-black/5 shadow-sm hover:shadow-xl transition-all">
              <div className="w-14 h-14 bg-[#F8F9FF] rounded-2xl flex items-center justify-center text-[#0026C1] mb-8 border border-[#DEE5FF]">
                <f.icon size={28} />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-4">{f.title}</h3>
              <p className="text-gray-500 font-medium leading-relaxed italic opacity-80">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
