import axios from 'axios';

// Use environment variable for baseURL, fallback to localhost during development
const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000',  // Localhost for dev, environment variable for production
});

// Initialize payment with given payment data
export const initializePayment = (paymentData) => API.post('/initialize-payment', paymentData);

export default API;
