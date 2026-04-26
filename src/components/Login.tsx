import React, { useState } from 'react';
import { Shield, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { signInWithGoogle } from '../lib/firebase';
import { toast } from 'sonner';

interface LoginProps {
  onLogin: (data: { firstName: string; lastName: string; email: string; role: string; uid: string }) => Promise<void>;
}

export default function Login({ onLogin }: LoginProps) {
  const [step, setStep] = useState<'auth' | 'profile'>('auth');
  const [authUser, setAuthUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleAuth = async () => {
    try {
      const user = await signInWithGoogle();
      if (user) {
        setAuthUser(user);
        
        // Try to parse name
        const names = user.displayName?.split(' ') || [];
        setFormData({
          firstName: names[0] || '',
          lastName: names.slice(1).join(' ') || '',
          email: user.email || '',
          role: '',
        });
        
        // Ask for metadata
        setStep('profile');
      }
    } catch (err) {
      toast.error('Authentication failed');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authUser) return;
    setIsLoading(true);
    try {
      await onLogin({ ...formData, uid: authUser.uid });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-6">
      <AnimatePresence mode="wait">
        {step === 'auth' ? (
          <motion.div 
            key="auth"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-lg bg-white rounded-2xl p-6 lg:p-10 border border-border shadow-sm flex flex-col"
          >
            <div className="flex flex-col items-center justify-center mb-10 text-center">
              <div className="w-12 h-12 bg-brand-primary rounded-xl flex items-center justify-center mb-6 shadow-sm">
                <Shield className="text-white" size={24} />
              </div>
              <h1 className="text-3xl font-bold font-display text-gray-900 tracking-tight mb-2">Welcome to Axiom</h1>
              <p className="text-sm text-gray-500 font-medium">Please authenticate to continue.</p>
            </div>

            <button 
              onClick={handleGoogleAuth}
              className="w-full flex items-center justify-center gap-3 py-4 bg-white border border-gray-200 text-gray-900 font-bold rounded-lg hover:bg-gray-50 transition-all text-sm mb-4"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Sign In with Google
            </button>

            <div className="mt-8 pt-8 border-t border-gray-100 flex items-center justify-center gap-2 text-gray-400">
              <Shield size={14} />
              <p className="text-xs font-medium">Your data is safe and protected.</p>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="profile"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full max-w-lg bg-white rounded-2xl p-6 lg:p-10 border border-border shadow-sm flex flex-col"
          >
            <div className="flex flex-col items-center justify-center mb-10 text-center">
              <h1 className="text-2xl font-bold font-display text-gray-900 tracking-tight mb-2">Complete Profile</h1>
              <p className="text-sm text-gray-500 font-medium">Tell us more about your architectural role.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">First Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    className="w-full border-b border-gray-200 py-2 focus:border-brand-primary outline-none font-medium text-sm lg:text-base transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Last Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    className="w-full border-b border-gray-200 py-2 focus:border-brand-primary outline-none font-medium text-sm lg:text-base transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  disabled
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full border-b border-gray-200 py-2 focus:border-brand-primary outline-none font-medium text-sm lg:text-base transition-colors text-gray-500 bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Professional Role</label>
                <input 
                  type="text" 
                  required
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  className="w-full border-b border-gray-200 py-2 focus:border-brand-primary outline-none font-medium text-sm lg:text-base transition-colors"
                  placeholder="Product Architect"
                />
              </div>

              <button 
                type="submit"
                disabled={isLoading || !formData.firstName || !formData.lastName || !formData.role}
                className="w-full py-4 bg-brand-primary text-white font-bold rounded-lg hover:bg-brand-secondary transition-all uppercase tracking-wide text-xs mt-4 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Saving...' : (
                  <>Complete Setup <ChevronRight size={16} /></>
                )}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
