// src/components/pages/ResetPassword.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API } from '../../utils/Api';
import './resetpassword.css';

const ResetPassword = () => {
  const { uid, token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/api/auth/reset-password-confirm/', {
        uid,
        token,
        new_password: password,
      });
      setMessage(res.data.message);
      setError('');
      setTimeout(() => navigate('/login'), 3000); // redirect to login
    } catch (err) {
      setError(err.response?.data?.error || 'Password reset failed');
      setMessage('');
    }
  };

  return (
    <div className="reset-password-form">
      <h2>Reset Your Password</h2>
      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleReset}>
        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
