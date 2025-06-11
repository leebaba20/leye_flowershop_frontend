// src/context/UserContext.jsx
import { createContext } from 'react';

export const UserContext = createContext({
  user: null,
  isLoading: true,
});
