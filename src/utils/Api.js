import axios from 'axios';

// Create an Axios instance with the base URL from .env
const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Optional: Global response error interceptor
API.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// ========== Newsletter ==========
export const subscribeToNewsletter = async (email) => {
  try {
    const response = await API.post('/api/newsletter-subscribe', { email });
    return response.data;
  } catch (error) {
    console.error('❌ Newsletter subscription error:', error.response?.data || error.message);
    throw error;
  }
};

// ========== Payment ==========
export const initializePayment = async (paymentData) => {
  console.log('Initializing payment with data:', paymentData);
  try {
    const response = await API.post('/api/initialize-payment', paymentData);
    console.log('Payment initialization response:', response.data);
    return response.data; // { authorization_url, ... }
  } catch (error) {
    console.error('❌ Error initializing payment:', error.response?.data || error.message);
    throw error;
  }
};

// ========== Auth ==========
export const ApiSignup = async (userData) => {
  try {
    const response = await API.post('/api/signup', userData);
    return response.data;
  } catch (error) {
    console.error('❌ Signup error:', error.response?.data || error.message);
    throw error;
  }
};

export const ApiLogin = async (credentials) => {
  try {
    const response = await API.post('/api/login', credentials);
    return response.data;
  } catch (error) {
    console.error('❌ Login error:', error.response?.data || error.message);
    throw error;
  }
};

export const ApiLogout = async () => {
  try {
    const response = await API.post('/api/logout');
    return response.data;
  } catch (error) {
    console.error('❌ Logout error:', error.response?.data || error.message);
    throw error;
  }
};

// ========== Generic Fetch ==========
export const fetchData = async (endpoint) => {
  try {
    const response = await API.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('❌ Fetch data error:', error.response?.data || error.message);
    throw error;
  }
};

// ========== Exports ==========
export { API };
export default ApiLogout;
