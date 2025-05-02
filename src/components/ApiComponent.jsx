import React, { useEffect } from 'react';
import { API } from '../utils/Api';

export default function ApiComponent() {
  useEffect(() => {
    const testBackend = async () => {
      try {
        const res = await API.get('/');
        console.log('✅ Backend connected:', res.data);
      } catch (err) {
        console.error('❌ Backend NOT connected:', err.message);
      }
    };
    testBackend();
  }, []);

  return <div>Testing backend connection... Check the console.</div>;
}
