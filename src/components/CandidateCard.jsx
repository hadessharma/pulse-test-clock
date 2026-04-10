import React, { useState, useEffect } from 'react';
import { Trash2, AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import { cn } from '../utils/cn';

const CandidateCard = ({ student, onDelete }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isExpired, setIsExpired] = useState(false);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const calculateTime = () => {
      const now = Date.now();
      const remaining = student.endTime - now;
      const totalDurationMs = student.duration * 60 * 1000;
      
      if (remaining <= 0) {
        setTimeLeft(Math.abs(remaining));
        setIsExpired(true);
        setProgress(0);
      } else {
        setTimeLeft(remaining);
        setIsExpired(false);
        const percent = (remaining / totalDurationMs) * 100;
        setProgress(percent);
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [student]);

  const formatTime = (ms) => {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const hours = Math.floor(ms / (1000 * 60 * 60));

    return `${hours > 0 ? hours.toString().padStart(2, '0') + ':' : ''}${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const status = isExpired 
    ? { color: 'text-accent-danger', bg: 'bg-accent-danger/10', border: 'border-accent-danger/20', label: 'TIME EXPIRED', icon: AlertCircle }
    : timeLeft < 5 * 60 * 1000 
      ? { color: 'text-accent-warning', bg: 'bg-accent-warning/10', border: 'border-accent-warning/20', label: 'ENDING SOON', icon: AlertCircle }
      : { color: 'text-accent-success', bg: 'bg-accent-success/10', border: 'border-accent-success/20', label: 'IN PROGRESS', icon: CheckCircle2 };

  const Icon = status.icon;

  return (
    <div className={cn(
      "glass-card p-5 relative overflow-hidden transition-all duration-300 border-white/5",
      isExpired ? "ring-1 ring-accent-danger/50" : "hover:border-white/20"
    )}>
      {/* Visual Progress Bar */}
      {!isExpired && (
        <div 
          className={cn("absolute bottom-0 left-0 h-1 transition-all duration-1000 opacity-50", status.color.replace('text', 'bg'))}
          style={{ width: `${progress}%` }} 
        />
      )}

      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-bold tracking-tight text-white mb-1 uppercase truncate max-w-[180px]">{student.name}</h3>
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">
            <Clock size={10} className="text-slate-400" /> 
            <span>{student.duration}m Limit</span>
          </div>
        </div>
        <button 
          onClick={onDelete}
          className="text-slate-600 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/5"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div className={cn(
        "text-center py-4 font-mono text-4xl font-bold tracking-tighter",
        status.color
      )}>
        {isExpired ? '-' : ''}{formatTime(timeLeft)}
      </div>

      <div className={cn(
        "flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-[10px] font-bold uppercase tracking-wider border",
        status.bg,
        status.color,
        status.border
      )}>
        <Icon size={14} />
        <span>{status.label}</span>
      </div>

      {/* Subtle indicator of start time */}
      <div className="mt-4 pt-3 border-t border-white/5 flex justify-between text-[8px] font-bold text-slate-600 uppercase tracking-widest">
        <span>Started {new Date(student.startTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
        <span>Ends {new Date(student.endTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
      </div>
    </div>
  );
};

export default CandidateCard;
