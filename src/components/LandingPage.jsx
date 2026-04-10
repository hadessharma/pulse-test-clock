import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Timer, ArrowRight, ShieldCheck } from 'lucide-react';

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
    <div style={{ 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '20px',
      background: 'radial-gradient(circle at top right, #1e1b4b, #020617)'
    }}>
      <div className="glass-card animate-fade-in" style={{ 
        maxWidth: '450px', 
        width: '100%', 
        padding: '40px',
        textAlign: 'center'
      }}>
        <div style={{ 
          background: 'rgba(99, 102, 241, 0.1)', 
          width: '64px', 
          height: '64px', 
          borderRadius: '16px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          margin: '0 auto 24px'
        }}>
          <Timer size={32} color="#6366f1" />
        </div>
        
        <h1 style={{ fontSize: '2.5rem', marginBottom: '12px' }}>ZenTime</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>
          Isolated rooms for test invigilators. Manage rolling students with precision.
        </p>

        <form onSubmit={handleJoin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ textAlign: 'left' }}>
            <label style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '8px', display: 'block' }}>
              Enter Room ID
            </label>
            <input 
              type="text" 
              className="input-field" 
              placeholder="e.g. Exam-Hall-A"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              style={{ width: '100%' }}
              required
            />
          </div>
          
          <button type="submit" className="btn-primary" style={{ justifyContent: 'center', padding: '14px' }}>
            Enter Room <ArrowRight size={18} />
          </button>
        </form>

        <div style={{ marginTop: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: 'var(--accent-success)', fontSize: '0.875rem' }}>
          <ShieldCheck size={16} /> 24h Auto-Cleanup Enabled
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
