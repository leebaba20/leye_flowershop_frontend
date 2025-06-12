import axios from 'axios';

// === AXIOS INSTANCE ===
export const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: false,
  timeout: 10000, // 10s timeout
});

// === TOKEN REFRESH HANDLER ===
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// === REQUEST INTERCEPTOR ===
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// === RESPONSE INTERCEPTOR (Auto Refresh JWT) ===
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return API(originalRequest);
        }).catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = localStorage.getItem('refresh_token');

      if (!refreshToken) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        return Promise.reject(error);
      }

      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/auth/token/refresh/`,
          { refresh: refreshToken }
        );

        const { access } = res.data;
        localStorage.setItem('access_token', access);
        originalRequest.headers.Authorization = `Bearer ${access}`;
        processQueue(null, access);
        return API(originalRequest);
      } catch (err) {
        processQueue(err, null);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

// === AUTH ===

export const ApiSignup = async (data) => {
  try {
    const response = await API.post('/api/auth/signup/', data);
    return response.data;
  } catch (err) {
    if (import.meta.env.MODE !== 'production') {
      console.error("Signup error:", err);
    }
    throw err.response?.data || { detail: 'Signup failed' };
  }
};

export const ApiLogin = async ({ username, password }) => {
  try {
    const res = await API.post('/api/auth/login/', { username, password });
    localStorage.setItem('access_token', res.data.access);
    localStorage.setItem('refresh_token', res.data.refresh);
    return res.data;
  } catch (error) {
    if (import.meta.env.MODE !== 'production') {
      console.error("Login error:", error);
    }
    throw error.response?.data || { detail: 'Login failed' };
  }
};

export const ApiLogout = async () => {
  const refreshToken = localStorage.getItem('refresh_token');
  if (refreshToken) {
    await API.post('/api/auth/logout/', { refresh: refreshToken });
  }
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  return true;
};

export const getCurrentUser = async () => {
  const response = await API.get('/api/auth/me/');
  return response.data;
};

// === SHIPPING ===

export const saveShippingInfo = async (shippingData) => {
  const response = await API.post('/api/auth/shipping/', shippingData);
  return response.data;
};

// === PAYSTACK PAYMENT INITIALIZATION ===

export const initializePayment = async (paymentData) => {
  try {
    const email = String(paymentData.email || "").trim();
    const amountInNaira = Number(paymentData.amount);
    const metadata = paymentData.metadata || {};

    if (!email || !amountInNaira || isNaN(amountInNaira) || amountInNaira <= 0) {
      throw new Error('Invalid email or amount provided for payment initialization.');
    }

    const payload = {
      email,
      amount: Math.round(amountInNaira * 100), // Convert to Kobo
      metadata,
    };

    if (import.meta.env.MODE !== 'production') {
      console.log("📤 Sending payment init payload:", payload);
    }

    const response = await API.post('/api/auth/paystack/init/', payload);

    if (import.meta.env.MODE !== 'production') {
      console.log("✅ Payment init response:", response.data);
    }

    if (!response.data.authorization_url) {
      throw new Error("Missing authorization_url in payment response.");
    }

    return response.data;
  } catch (error) {
    if (import.meta.env.MODE !== 'production') {
      console.error("❌ Payment Init Error:", error.response?.data || error.message || error);
    }
    throw error.response?.data || { detail: 'Payment initialization failed' };
  }
};

// === NEWSLETTER ===

export const subscribeNewsletter = async (email) => {
  try {
    const response = await API.post('/api/auth/newsletter/', { email });

    if (import.meta.env.MODE !== 'production') {
      console.log("📨 Sending:", { email });
    }

    return response.data;
  } catch (error) {
    if (import.meta.env.MODE !== 'production') {
      console.error("❌ Newsletter Subscription Error:", error.response?.data || error);
    }
    throw error.response?.data || { detail: 'Newsletter subscription failed' };
  }
};

// === CONTACT FORM ===

export const sendContactMessage = async (data) => {
  try {
    const response = await API.post('/api/auth/contact/', data);
    return response.data;
  } catch (error) {
    if (import.meta.env.MODE !== 'production') {
      console.error("Contact Form Error:", error.response?.data || error);
    }
    throw error.response?.data || { detail: 'Sending contact message failed' };
  }
};

// === GENERIC REQUESTS ===

export const fetchData = async (endpoint) => {
  const response = await API.get(`/api${endpoint}`);
  return response.data;
};

export const postData = async (endpoint, data) => {
  const response = await API.post(`/api${endpoint}`, data);
  return response.data;
};
