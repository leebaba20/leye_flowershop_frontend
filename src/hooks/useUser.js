// src/hooks/useUser.js
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const useUser = () => {  // Fix: changed 'UseUser' to 'useUser' for consistency
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export default useUser;
