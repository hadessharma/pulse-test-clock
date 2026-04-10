import React, { useState, useEffect } from 'react';
import { Trash2, AlertCircle, CheckCircle2, Clock } from 'lucide-react';

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

  const getStatusColor = () => {
    if (isExpired) return 'var(--accent-danger)';
    if (timeLeft < 5 * 60 * 1000) return 'var(--accent-warning)';
    return 'var(--accent-success)';
  };

  return (
    <div className={`glass-card animate-fade-in`} style={{ 
      padding: '20px', 
      borderLeft: `4px solid ${getStatusColor()}`,
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Progress Bar */}
      {!isExpired && (
        <div style={{ 
          position: 'absolute', 
          bottom: 0, 
          left: 0, 
          height: '4px', 
          width: `${progress}%`, 
          background: getStatusColor(),
          transition: 'width 1s linear',
          opacity: 0.3
        }} />
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
        <div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '4px' }}>{student.name}</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            <Clock size={12} /> {student.duration}m Duration
          </div>
        </div>
        <button 
          onClick={onDelete}
          style={{ 
            background: 'none', 
            border: 'none', 
            color: 'var(--text-muted)', 
            cursor: 'pointer',
            padding: '4px',
            borderRadius: '4px'
          }}
          className="hover-target"
        >
          <Trash2 size={18} />
        </button>
      </div>

      <div style={{ 
        textAlign: 'center', 
        padding: '20px 0', 
        color: getStatusColor(),
        fontSize: '2.5rem',
        fontWeight: '700',
        fontFamily: 'monospace'
      }}>
        {isExpired ? '-' : ''}{formatTime(timeLeft)}
      </div>

      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        gap: '8px', 
        padding: '8px', 
        borderRadius: '8px',
        background: `${getStatusColor()}15`,
        color: getStatusColor(),
        fontSize: '0.875rem',
        fontWeight: '600'
      }}>
        {isExpired ? (
          <><AlertCircle size={16} /> TIME EXPIRED</>
        ) : timeLeft < 5 * 60 * 1000 ? (
          <><AlertCircle size={16} /> ENDING SOON</>
        ) : (
          <><CheckCircle2 size={16} /> IN PROGRESS</>
        )}
      </div>
    </div>
  );
};

export default CandidateCard;
