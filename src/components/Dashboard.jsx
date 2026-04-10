import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { UserPlus, Clock, ChevronLeft, LayoutDashboard, Users } from 'lucide-react';
import { getRoomData, saveStudent, removeStudent } from '../utils/storage';
import CandidateCard from './CandidateCard';

const Dashboard = () => {
  const { roomId } = useParams();
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('60'); // default 60 mins

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
    setStudents([...students, newStudent]);
    setName('');
  };

  const handleDelete = (id) => {
    removeStudent(roomId, id);
    setStudents(students.filter(s => s.id !== id));
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header className="glass-card" style={{ 
        margin: '20px', 
        padding: '16px 24px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        borderRadius: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link to="/" style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}>
            <ChevronLeft size={20} />
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ background: 'var(--accent-primary)', p: '8px', borderRadius: '8px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <LayoutDashboard size={20} color="white" />
            </div>
            <div>
              <h1 style={{ fontSize: '1.25rem' }}>Room: {roomId.toUpperCase()}</h1>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Invigilator Dashboard</p>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '24px', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Users size={16} /> {students.length} Active Candidates
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '0 20px 40px' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          
          {/* Add Candidate Form */}
          <div className="glass-card animate-fade-in" style={{ padding: '24px', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <UserPlus size={18} color="var(--accent-primary)" /> Register New Candidate
            </h2>
            <form onSubmit={handleAddStudent} style={{ display: 'grid', gridTemplateColumns: '1fr 200px auto', gap: '16px', alignItems: 'end' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Candidate Name</label>
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="Full Name" 
                  style={{ width: '100%' }}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Test Length (Minutes)</label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type="number" 
                    className="input-field" 
                    placeholder="60" 
                    style={{ width: '100%', paddingRight: '40px' }}
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    min="1"
                    required
                  />
                  <Clock size={16} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                </div>
              </div>
              <button type="submit" className="btn-primary" style={{ height: '46px' }}>
                Start Test
              </button>
            </form>
          </div>

          {/* Active Candidates Grid */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
            gap: '20px' 
          }}>
            {students.map(student => (
              <CandidateCard 
                key={student.id} 
                student={student} 
                onDelete={() => handleDelete(student.id)} 
              />
            ))}
            
            {students.length === 0 && (
              <div style={{ 
                gridColumn: '1 / -1', 
                padding: '80px', 
                textAlign: 'center', 
                color: 'var(--text-muted)',
                opacity: 0.5
              }}>
                <Users size={48} style={{ marginBottom: '16px' }} />
                <p>No active candidates in this room.</p>
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
};

export default Dashboard;
