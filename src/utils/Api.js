import axios from 'axios';

// Hardcoded base URL (replace with your backend URL)
const API = axios.create({
  baseURL: 'https://leye-flowershop-backend.onrender.com',
});

// Global response error interceptor (optional but helpful)
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
    const response = await axios.post(
      'https://leye-flowershop-backend.onrender.com/api/initialize-payment',
      paymentData
    );
    console.log('Payment initialization response:', response.data);
    return response.data;
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
