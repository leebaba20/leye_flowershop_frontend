import axios from 'axios';

// =================== AXIOS INSTANCE ===================
export const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: false,
  timeout: 10000,
});

// =================== TOKEN REFRESH HANDLER ===================
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    error ? prom.reject(error) : prom.resolve(token);
  });
  failedQueue = [];
};

// =================== REQUEST INTERCEPTOR ===================
API.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// =================== RESPONSE INTERCEPTOR ===================
API.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return API(originalRequest);
        }).catch(Promise.reject);
      }

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

// =================== AUTH ===================
export const ApiSignup = async (data) => {
  try {
    const response = await API.post('/api/auth/signup/', data);
    return response.data;
  } catch (err) {
    console.error("Signup error:", err);
    throw err.response?.data || { detail: 'Signup failed' };
  }
};

export const ApiLogin = async ({ username, password }) => {
  try {
    const res = await API.post('/api/auth/login/', { username, password });
    localStorage.setItem('access_token', res.data.access);
    localStorage.setItem('refresh_token', res.data.refresh);
    return res.data;
  } catch (err) {
    console.error("Login error:", err);
    throw err.response?.data || { detail: 'Login failed' };
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

// =================== SHIPPING ===================
export const saveShippingInfo = async (shippingData) => {
  const response = await API.post('/api/auth/shipping/', shippingData);
  return response.data;
};

// =================== PAYMENT ===================
export const initializePayment = async (paymentData) => {
  try {
    const email = String(paymentData.email || "").trim();
    const amountInNaira = Number(paymentData.amount);
    const metadata = paymentData.metadata || {};

    if (!email || isNaN(amountInNaira) || amountInNaira <= 0) {
      throw new Error('Invalid email or amount.');
    }

    const payload = { email, amount: amountInNaira, metadata };

    const response = await API.post('/api/auth/paystack/init/', payload);

    if (!response.data.authorization_url) {
      throw new Error("Missing authorization_url in payment response.");
    }

    return response.data;
  } catch (err) {
    console.error("Payment Init Error:", err);
    throw err.response?.data || { detail: 'Payment initialization failed' };
  }
};

// =================== NEWSLETTER ===================
export const subscribeNewsletter = async (email) => {
  try {
    const response = await API.post('/api/auth/newsletter/', { email });
    return response.data;
  } catch (err) {
    console.error("Newsletter Subscription Error:", err);
    throw err.response?.data || { detail: 'Newsletter subscription failed' };
  }
};

// =================== CONTACT ===================
export const sendContactMessage = async (data) => {
  try {
    const response = await API.post('/api/auth/contact/', data);
    return response.data;
  } catch (err) {
    console.error("Contact Form Error:", err);
    throw err.response?.data || { detail: 'Sending contact message failed' };
  }
};

// =================== GENERIC ===================
export const fetchData = async (endpoint) => {
  const response = await API.get(`/api${endpoint}`);
  return response.data;
};
