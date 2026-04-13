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
    <div className="relative min-h-screen flex flex-col items-center justify-center p-5 bg-linear-to-b from-slate-900 via-slate-950 to-bg-deep overflow-hidden">
      <BlurFade delay={0.25} inView>
        <div className="glass-card relative z-10 max-w-[450px] w-full p-10 text-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="bg-accent-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/5">
            <ShieldCheck size={32} className="text-accent-primary" />
          </div>
          
          <h1 className="text-4xl sm:text-5xl mb-3 tracking-tight font-bold text-white">InvigilatePro</h1>
          <p className="text-slate-400 mb-8 max-w-[320px] mx-auto text-sm leading-relaxed">
            Professional dashboard for test invigilators. Real-time candidate monitoring and time management.
          </p>

          <form onSubmit={handleJoin} className="flex flex-col gap-4">
            <div className="text-left">
              <label className="text-[10px] font-bold text-slate-500 mb-2 block uppercase tracking-[0.2em]">
                Access Room
              </label>
              <input 
                type="text" 
                className="input-field py-3.5" 
                placeholder="Enter Room ID"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                required
              />
            </div>
            
            <button type="submit" className="btn-primary py-3.5 text-base group">
              Join Session
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </button>
          </form>

          <div className="mt-8 flex items-center justify-center gap-2 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
            <ShieldCheck size={12} className="text-accent-success" /> Secure 24h Session Policy
          </div>
        </div>
      </BlurFade>

      {/* Footer info */}
      <div className="absolute bottom-8 text-slate-600 text-[10px] uppercase tracking-[0.3em] font-medium pointer-events-none">
        InvigilatePro • Enterprise Testing Tools
      </div>
    </div>
  );
};

export default LandingPage;
