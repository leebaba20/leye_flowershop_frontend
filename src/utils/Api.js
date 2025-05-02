import axios from 'axios';

// Create an Axios instance with the base URL from .env
const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Subscribe to newsletter
export const subscribeToNewsletter = async (email) => {
  try {
    const response = await API.post('/api/newsletter-subscribe', { email });
    return response.data;
  } catch (error) {
    console.error('❌ Newsletter subscription error:', error.response?.data || error.message);
    throw error;
  }
};

// Payment Initialization
export const initializePayment = async (paymentData) => {
  try {
    const response = await API.post('/api/initialize-payment', paymentData);
    return response.data;
  } catch (error) {
    console.error('Error initializing payment:', error.response?.data || error.message);
    throw error;
  }
};

// Optional global error logging
API.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Signup API
export const ApiSignup = async (userData) => {
  try {
    const response = await API.post('/api/signup', userData);
    return response.data;
  } catch (error) {
    console.error('Signup error:', error.response?.data || error.message);
    throw error;
  }
};

// Login API
export const ApiLogin = async (credentials) => {
  try {
    const response = await API.post('/api/login', credentials);
    return response.data;
  } catch (error) {
    console.error('Login error:', error.response?.data || error.message);
    throw error;
  }
};

// Logout API
export const ApiLogout = async () => {
  try {
    const response = await API.post('/api/logout');
    return response.data;
  } catch (error) {
    console.error('Logout error:', error.response?.data || error.message);
    throw error;
  }
};

export const fetchData = async (endpoint) => {
  try {
    const response = await API.get(endpoint);  // Use the Axios instance to fetch data
    return response.data;
  } catch (error) {
    console.error('Fetch data error:', error.response?.data || error.message);
    throw error;
  }
};



export { API }; // Only export the named functions
