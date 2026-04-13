import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { UserPlus, Clock, ChevronLeft, LayoutDashboard, Users } from 'lucide-react';
import { getRoomData, saveStudent, removeStudent } from '../utils/storage';
import CandidateCard from './CandidateCard';
import BlurFade from './magicui/BlurFade';

const Dashboard = () => {
  const { roomId } = useParams();
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('60');

  useEffect(() => {
    setStudents(getRoomData(roomId));
  }, [roomId]);

  const handleAddStudent = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newStudent = {
      id: `s-${Date.now()}`,
      name: name.trim(),
      duration: parseInt(duration),
      startTime: Date.now(),
      endTime: Date.now() + (parseInt(duration) * 60 * 1000),
      createdAt: Date.now()
    };

    saveStudent(roomId, newStudent);
    // Add to top for visibility
    setStudents([newStudent, ...students]);
    setName('');
  };

  const handleDelete = (id) => {
    removeStudent(roomId, id);
    setStudents(students.filter(s => s.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col bg-bg-deep text-white">
      {/* Header */}
      <header className="glass-card m-5 p-4 sm:px-8 border-white/5 flex flex-wrap items-center justify-between gap-4 sticky top-5 z-20">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-slate-500 hover:text-white transition-colors p-1">
            <ChevronLeft size={20} />
          </Link>
          <div className="flex items-center gap-3">
            <div className="bg-accent-primary w-10 h-10 rounded-lg flex items-center justify-center shadow-md">
              <LayoutDashboard size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg leading-tight uppercase font-bold tracking-tight text-white">ROOM: {roomId}</h1>
              <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-bold">Session Monitoring Dashboard</p>
            </div>
          </div>
        </div>

        <div className="flex gap-6 text-slate-400 text-xs font-bold uppercase tracking-wider items-center">
          <div className="flex items-center gap-2 bg-slate-800/50 px-3 py-1.5 rounded-full border border-white/5">
            <Users size={14} className="text-accent-primary" />
            <span>{students.length} Registered</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-5 pb-10">
        <div className="max-w-7xl mx-auto w-full">
          
          {/* Add Candidate Form */}
          <BlurFade delay={0.1}>
            <div className="glass-card p-6 mb-10 border-white/5">
              <h2 className="text-sm font-bold mb-6 flex items-center gap-2 uppercase tracking-widest text-slate-400">
                Member Registration
              </h2>
              <form onSubmit={handleAddStudent} className="grid grid-cols-1 md:grid-cols-[1fr_200px_auto] gap-6 items-end">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Candidate Name</label>
                  <input 
                    type="text" 
                    className="input-field" 
                    placeholder="Enter full name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Time Limit (Min)</label>
                  <div className="relative">
                    <input 
                      type="number" 
                      className="input-field pr-12" 
                      placeholder="60" 
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      min="1"
                      required
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-600 uppercase">Min</span>
                  </div>
                </div>
                <button type="submit" className="btn-primary h-[48px] min-w-[180px]">
                  <UserPlus size={18} />
                  Register Candidate
                </button>
              </form>
            </div>
          </BlurFade>

          {/* Active Candidates Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {students.map((student, index) => (
              <BlurFade key={student.id} delay={0.05 * index}>
                <CandidateCard 
                  student={student} 
                  onDelete={() => handleDelete(student.id)} 
                />
              </BlurFade>
            ))}
            
            {students.length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center py-20 bg-white/[0.02] border border-dashed border-white/5 rounded-2xl grayscale opacity-30">
                <Users size={48} className="mb-4" />
                <p className="text-sm font-medium uppercase tracking-widest">Awaiting Candidates</p>
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
};

export default Dashboard;
