import axios from 'axios';

// Use environment variable for baseURL
const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000', // Fallback to local URL during dev
});

export const initializePayment = (paymentData) => API.post('/initialize-payment', paymentData);
