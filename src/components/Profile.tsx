import { Shield, Bell, Globe, Trash2, Camera } from 'lucide-react';
import { toast } from 'sonner';
import { useState, useEffect } from 'react';

export default function Profile() {
  const [signals, setSignals] = useState([
    { title: 'Motivational Reminders', desc: 'Daily pushes to maintain momentum', active: true },
    { title: 'Goal Milestones', desc: 'Alerts when passing major thresholds', active: true },
    { title: 'Weekly Digest', desc: 'Email summary of performance', active: false },
  ]);

  const [formData, setFormData] = useState({
    firstName: 'Cuthmaan',
    lastName: '',
    email: 'cuthmaan@example.com',
    role: 'Product Architect'
  });

  const toggleSignal = (idx: number) => {
    const newSignals = [...signals];
    newSignals[idx].active = !newSignals[idx].active;
    setSignals(newSignals);
    toast.success(`${newSignals[idx].title} ${newSignals[idx].active ? 'enabled' : 'disabled'}.`);
  };

  const handleSave = async () => {
    toast.success('Profile architecture updated.', {
      description: 'Changes have been synchronized across all nodes.'
    });
  };

  const handleCancel = () => {
    toast.info('Session revert initiated. No changes were committed.');
  };

  const handleUpload = () => {
    toast.info('Avatar uplink is temporarily offline.');
  };

  const handleSecurity = (action: string) => {
    toast.info(`Security Protocol [${action}] is restricted.`);
  };

  const handleDeactivate = () => {
    toast.error('Strategic termination aborted.', {
      description: 'Institutional accounts require high-level clearance for deletion.'
    });
  };

  return (
    <div className="flex-1 p-6 lg:p-10 max-w-7xl mx-auto w-full">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-10">
        <div>
          <h1 className="text-4xl lg:text-5xl font-bold font-display text-gray-900 tracking-tight mb-4">Profile & Settings</h1>
          <p className="max-w-2xl text-sm lg:text-base text-gray-500 font-medium leading-relaxed">
            Manage your architectural clarity. Update your identity, configure your focus notifications, and maintain your system preferences.
          </p>
        </div>
        <div className="flex items-center gap-4 w-full lg:w-auto">
          <button 
            onClick={handleCancel}
            className="flex-1 lg:flex-none px-6 py-3 bg-white text-brand-primary border border-border font-bold rounded-lg hover:bg-gray-50 transition-all uppercase tracking-wide text-xs">
            Cancel
          </button>
          <button 
            onClick={handleSave}
            className="flex-2 lg:flex-none px-8 py-3 bg-brand-primary text-white font-bold rounded-lg hover:bg-brand-secondary transition-all uppercase tracking-wide text-xs">
            Save Changes
          </button>
        </div>
      </div>

      {/* Welcome Message */}
      <div className="mb-10 p-6 bg-brand-light rounded-2xl border-l-8 border-brand-primary">
        <p className="text-brand-primary font-bold italic text-lg lg:text-xl">
          "wali dhismo ayaa ku socda wepsite kaan, mahadsanid sida quruxda badan aad uso boqatey wepkayga"
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10">
        <div className="lg:col-span-2 space-y-6 lg:space-y-10">
          {/* Personal Identity */}
          <section className="bg-white rounded-2xl p-6 lg:p-10 border border-border shadow-sm">
            <div className="flex items-center gap-3 mb-8 lg:mb-10">
              <div className="w-5 h-5 rounded-full bg-brand-primary flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full" />
              </div>
              <h2 className="text-xl font-bold font-display text-gray-900">Personal Identity</h2>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 lg:gap-8 mb-10">
              <div className="relative group w-24 h-24 shrink-0 mx-auto sm:mx-0">
                <img 
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Cuthmaan" 
                  alt="Avatar" 
                  className="w-full h-full rounded-2xl object-cover bg-gray-100"
                  referrerPolicy="no-referrer"
                />
                <button className="absolute inset-0 bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl">
                  <Camera size={24} />
                </button>
              </div>
              <div className="text-center sm:text-left">
                <h4 className="font-bold text-gray-900 mb-1">Avatar & Presentation</h4>
                <p className="text-xs lg:text-sm text-gray-400 mb-3 leading-relaxed">Recommended: Square image, at least 500x500px in JPG or PNG format.</p>
                <button 
                  onClick={handleUpload}
                  className="text-[10px] font-black uppercase tracking-widest text-brand-primary hover:underline">Upload New</button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 mb-8">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">First Name</label>
                <input 
                  type="text" 
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  className="w-full border-b border-gray-200 py-2 focus:border-brand-primary outline-none font-medium text-sm lg:text-base"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Last Name</label>
                <input 
                  type="text" 
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  className="w-full border-b border-gray-200 py-2 focus:border-brand-primary outline-none font-medium text-sm lg:text-base"
                />
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Email Address</label>
              <input 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full border-b border-gray-200 py-2 focus:border-brand-primary outline-none font-medium text-sm lg:text-base"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Professional Role</label>
              <input 
                type="text" 
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
                className="w-full border-b border-gray-200 py-2 focus:border-brand-primary outline-none font-medium text-sm lg:text-base"
              />
            </div>
          </section>

          {/* Security & Access */}
          <section className="bg-white rounded-2xl p-6 lg:p-10 border border-border shadow-sm">
            <div className="flex items-center gap-3 mb-8 lg:mb-10">
              <Shield size={20} className="text-brand-primary" />
              <h2 className="text-xl font-bold font-display text-gray-900">Security & Access</h2>
            </div>

            <div className="space-y-4 lg:space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 bg-surface rounded-2xl border border-border gap-4">
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Password</h4>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Last updated 3 months ago</p>
                </div>
                <button 
                  onClick={() => handleSecurity('Password Reset')}
                  className="w-full sm:w-auto px-5 py-2.5 bg-white text-[10px] font-black uppercase tracking-widest text-brand-primary border border-border rounded-lg hover:bg-gray-50 transition-all">
                  Change
                </button>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 bg-surface rounded-2xl border border-border gap-4">
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Two-Factor Authentication</h4>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-success"></span>
                    Active via Authenticator App
                  </p>
                </div>
                <button 
                  onClick={() => handleSecurity('MFA Config')}
                  className="w-full sm:w-auto px-5 py-2.5 bg-white text-[10px] font-black uppercase tracking-widest text-brand-primary border border-border rounded-lg hover:bg-gray-50 transition-all">
                  Manage
                </button>
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-6 lg:space-y-10">
          {/* Focus Signals */}
          <section className="bg-white rounded-2xl p-6 lg:p-10 border border-border shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <Bell size={20} className="text-brand-primary" />
              <h2 className="text-xl font-bold font-display text-gray-900">Focus Signals</h2>
            </div>
            
            <p className="text-xs lg:text-sm text-gray-400 font-medium mb-10 leading-relaxed">
              Configure how Axiom interrupts your flow state. We recommend keeping notifications minimal to preserve architectural clarity.
            </p>

            <div className="space-y-8">
              {signals.map((signal, idx) => (
                <div key={idx} className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-sm text-gray-900 mb-1">{signal.title}</h4>
                    <p className="text-xs text-gray-400 leading-normal">{signal.desc}</p>
                  </div>
                  <button 
                    onClick={() => toggleSignal(idx)}
                    className={`w-11 h-6 rounded-full p-1 shrink-0 transition-colors ${signal.active ? 'bg-brand-primary' : 'bg-gray-200'}`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white transition-transform ${signal.active ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* System Environment */}
          <section className="bg-surface rounded-2xl p-6 lg:p-10 border border-border shadow-sm">
            <h2 className="text-[10px] font-black text-gray-900 mb-6 uppercase tracking-[0.2em]">System Environment</h2>
            
            <div className="mb-10">
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">Timezone</label>
              <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-border cursor-pointer group transition-all">
                <span className="text-xs lg:text-sm font-medium text-gray-700">Pacific Time (US & Canada)</span>
                <Globe size={18} className="text-gray-400 group-hover:text-brand-primary transition-colors" />
              </div>
            </div>

            <button 
              onClick={handleDeactivate}
              className="flex items-center gap-2 text-red-600 font-bold text-xs hover:underline transition-all group">
              <Trash2 size={16} className="group-hover:scale-110 transition-transform" />
              <span>Deactivate Account</span>
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
