import React, { useEffect, useState } from 'react';
import { API } from '../utils/Api'; // make sure your axios instance is correctly exported here

const ApiComponent = () => {
  const [status, setStatus] = useState('Checking backend connection...');

  useEffect(() => {
    const testBackend = async () => {
      try {
        const res = await API.get('/');
        console.log('✅ Backend connected:', res.data);
        setStatus('✅ Backend connected successfully.');
      } catch (err) {
        const msg = err.response?.data?.message || err.message;
        console.error('❌ Backend NOT connected:', msg);
        setStatus(`❌ Backend NOT connected: ${msg}`);
      }
    };
    testBackend();
  }, []);

  return (
    <div style={{ padding: '2rem', textAlign: 'center', fontFamily: 'Segoe UI, sans-serif' }}>
      <h3>Backend Connection Status</h3>
      <p>{status}</p>
    </div>
  );
};

export default ApiComponent;
