import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000',
});

export const initializePayment = (paymentData) => API.post('/initialize-payment', paymentData);
