import axios from 'axios';

const API = axios.create({
  baseURL: '/api', // Vite proxy forwards to http://localhost:5000
  headers: {
    'Content-Type': 'application/json',
  },
});

// Send USD amount directly — backend handles conversion
export const initializePayment = (paymentData) => {
  return API.post('/initialize-payment', paymentData)
    .then(res => res.data)
    .catch(err => {
      console.error('Error initializing payment:', err.response?.data || err.message);
      throw err;
    });
};

// Optional global error logging
API.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default API;
