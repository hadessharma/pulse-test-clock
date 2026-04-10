import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Timer, ArrowRight, ShieldCheck } from 'lucide-react';
import Particles from './magicui/Particles';
import BlurFade from './magicui/BlurFade';

const LandingPage = () => {
  const [roomId, setRoomId] = useState('');
  const navigate = useNavigate();

  const handleJoin = (e) => {
    e.preventDefault();
    if (roomId.trim()) {
      navigate(`/room/${roomId.trim().toLowerCase()}`);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-5 bg-radial-[at_top_right] from-indigo-950 to-slate-950 overflow-hidden">
      {/* Magic UI Particles Background */}
      <Particles
        className="absolute inset-0 z-0"
        quantity={200}
        ease={80}
        color="#ffffff"
        refresh
      />

      <BlurFade delay={0.25} inView>
        <div className="glass-card relative z-10 max-w-[450px] w-full p-10 text-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="bg-indigo-500/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/5">
            <Timer size={32} className="text-accent-primary" />
          </div>
          
          <h1 className="text-4xl sm:text-5xl mb-3 tracking-tight">ZenTime</h1>
          <p className="text-slate-400 mb-8 max-w-[300px] mx-auto text-sm">
            Isolated dashboard for test invigilators. Manage rolling students with precision.
          </p>

          <form onSubmit={handleJoin} className="flex flex-col gap-4">
            <div className="text-left">
              <label className="text-xs font-medium text-slate-500 mb-2 block uppercase tracking-wider">
                Room ID
              </label>
              <input 
                type="text" 
                className="input-field py-3.5" 
                placeholder="e.g. Exam-Hall-A"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                required
              />
            </div>
            
            <button type="submit" className="btn-primary py-3.5 text-base group">
              Enter Room 
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </button>
          </form>

          <div className="mt-8 flex items-center justify-center gap-2 text-accent-success text-xs font-medium">
            <ShieldCheck size={14} /> 24h Auto-Cleanup Enabled
          </div>
        </div>
      </BlurFade>

      {/* Footer info */}
      <div className="absolute bottom-8 text-slate-600 text-[10px] uppercase tracking-widest pointer-events-none">
        ZenTime © 2026 • Premium Invigilation Tool
      </div>
    </div>
  );
};

export default LandingPage;
