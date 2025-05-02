import axios from 'axios';

// Create an Axios instance with the base URL from .env
const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
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
  console.log("Initializing payment with data:", paymentData); // Log payment data being sent
  try {
    const response = await API.post('/api/initialize-payment', paymentData);
    console.log("Payment initialization response:", response.data); // Log the response from backend
    return response.data; // This contains the Paystack authorization_url
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

// Export `ApiLogout` as the default export
export { ApiLogout as default };

// Fetch Data API
export const fetchData = async (endpoint) => {
  try {
    const response = await API.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('Fetch data error:', error.response?.data || error.message);
    throw error;
  }
};

export { API }; // Export the Axios instance
