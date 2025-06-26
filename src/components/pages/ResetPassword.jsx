import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { confirmPasswordReset } from '../../utils/Api';
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
      const res = await confirmPasswordReset({ uid, token, new_password: password });
      setMessage(res.message);
      setError('');
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setError(err.detail || 'Password reset failed');
      setMessage('');
    }
  };

  return (
    <div className="reset-password-form">
      <h2>Reset Password Page Loaded ✅</h2> {/* ✅ Debug Text */}
      <p><strong>UID:</strong> {uid}</p>
      <p><strong>Token:</strong> {token}</p>

      <h3>Reset Your Password</h3>
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
