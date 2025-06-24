import axios from 'axios';

// ========== AXIOS INSTANCE ==========
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://leye-flowershop-backend.onrender.com';

export const API = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// ========== TOKEN REFRESH HANDLER ==========
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    error ? prom.reject(error) : prom.resolve(token);
  });
  failedQueue = [];
};

// ========== REQUEST INTERCEPTOR ==========
API.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => Promise.reject(error));

// ========== RESPONSE INTERCEPTOR ==========
API.interceptors.response.use(
  res => res,
  async error => {
    const originalRequest = error.config;

    // Handle timeout
    if (error.code === 'ECONNABORTED') {
      return Promise.reject({ detail: 'Request timed out. Please try again.' });
    }

    // Handle 401 from token expiry
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem('refresh_token');
      if (!refreshToken) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        return Promise.reject({ detail: 'Session expired. Please login again.' });
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: token => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(API(originalRequest));
            },
            reject: err => reject(err),
          });
        });
      }

      isRefreshing = true;

      try {
        const res = await axios.post(`${BASE_URL}/api/auth/token/refresh/`, {
          refresh: refreshToken,
        });

        const { access } = res.data;
        localStorage.setItem('access_token', access);
        processQueue(null, access);
        originalRequest.headers.Authorization = `Bearer ${access}`;
        return API(originalRequest);
      } catch (err) {
        processQueue(err, null);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        return Promise.reject({ detail: 'Session expired. Please login again.' });
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

// ========== ERROR PARSER ==========
const parseError = (err, fallback = 'An error occurred') =>
  err.response?.data || { detail: fallback };

// ========== AUTH ==========
export const ApiSignup = async (data) => {
  try {
    const res = await API.post('/api/auth/signup/', data);
    return res.data;
  } catch (err) {
    console.error("Signup Error:", err);
    throw parseError(err, 'Signup failed');
  }
};

export const ApiLogin = async ({ username, password }) => {
  try {
    const res = await API.post('/api/auth/login/', { username, password });
    localStorage.setItem('access_token', res.data.access);
    localStorage.setItem('refresh_token', res.data.refresh);
    return res.data;
  } catch (err) {
    console.error("Login Error:", err);
    throw parseError(err, 'Login failed');
  }
};

export const ApiLogout = async () => {
  try {
    const refreshToken = localStorage.getItem('refresh_token');

    if (refreshToken) {
      await API.post('/api/auth/logout/', { refresh: refreshToken });
    }

    // Always clear tokens even if logout fails
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');

    return true;
  } catch (err) {
    console.error("Logout Error:", err);
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    throw parseError(err, 'Logout failed');
  }
};

export const getCurrentUser = async () => {
  const res = await API.get('/api/auth/me/');
  return res.data;
};

// ========== SHIPPING ==========
export const saveShippingInfo = async (shippingData) => {
  const res = await API.post('/api/auth/shipping/', shippingData);
  return res.data;
};

// ========== PASSWORD RESET ==========

export const requestPasswordReset = async (email) => {
  try {
    const res = await API.post('/api/auth/reset-password/', { email });
    return res.data;
  } catch (err) {
    console.error("Reset Password Request Error:", err);
    throw parseError(err, 'Failed to send password reset email');
  }
};

export const confirmPasswordReset = async ({ uid, token, new_password }) => {
  try {
    const res = await API.post('/api/auth/reset-password-confirm/', {
      uid,
      token,
      new_password,
    });
    return res.data;
  } catch (err) {
    console.error("Reset Password Confirm Error:", err);
    throw parseError(err, 'Password reset failed');
  }
};


// ========== PAYMENT ==========
export const initializePayment = async (paymentData) => {
  try {
    const email = String(paymentData.email || "").trim();
    const amount = Number(paymentData.amount);
    const metadata = paymentData.metadata || {};

    if (!email || isNaN(amount) || amount <= 0) {
      throw new Error('Invalid payment data');
    }

    const res = await API.post('/api/auth/paystack/init/', {
      email,
      amount,
      metadata,
    });

    if (!res.data.authorization_url) {
      throw new Error("No authorization URL returned.");
    }

    return res.data;
  } catch (err) {
    console.error("Payment Init Error:", err);
    throw parseError(err, 'Payment failed');
  }
};

// ========== NEWSLETTER ==========
export const subscribeNewsletter = async (email) => {
  try {
    const res = await API.post('/api/auth/newsletter/', { email });
    return res.data;
  } catch (err) {
    console.error("Newsletter Subscription Error:", err);
    throw parseError(err, 'Newsletter subscription failed');
  }
};

// ========== CONTACT ==========
export const sendContactMessage = async (data) => {
  try {
    const res = await API.post('/api/auth/contact/', data);
    return res.data;
  } catch (err) {
    console.error("Contact Form Error:", err);
    throw parseError(err, 'Contact message failed');
  }
};

// ========== FETCH GENERIC DATA ==========
export const fetchData = async (endpoint) => {
  const res = await API.get(`/api${endpoint}`);
  return res.data;
};
