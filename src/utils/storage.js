const STORAGE_KEY = 'zentime_data';

export const getRoomData = (roomId) => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  
  try {
    const data = JSON.parse(raw);
    const students = data[roomId] || [];
    
    // Filter out students older than 24 hours
    const now = Date.now();
    const oneDayMs = 24 * 60 * 60 * 1000;
    
    const validStudents = students.filter(s => {
      const createdAt = s.createdAt || 0;
      return (now - createdAt) < oneDayMs;
    });

    return validStudents;
  } catch (e) {
    console.error('Failed to parse storage', e);
    return [];
  }
};

export const saveStudent = (roomId, student) => {
  const raw = localStorage.getItem(STORAGE_KEY);
  let data = {};
  if (raw) {
    try {
      data = JSON.parse(raw);
    } catch (e) {
      data = {};
    }
  }

  if (!data[roomId]) data[roomId] = [];
  
  // Add createdAt if not present
  const studentWithMeta = {
    ...student,
    createdAt: student.createdAt || Date.now()
  };
  
  data[roomId].push(studentWithMeta);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const removeStudent = (roomId, studentId) => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;
  
  try {
    let data = JSON.parse(raw);
    if (data[roomId]) {
      data[roomId] = data[roomId].filter(s => s.id !== studentId);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  } catch (e) {}
};
