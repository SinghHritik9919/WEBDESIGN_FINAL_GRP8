import axios from 'axios';

const api = axios.create({
  baseURL: 'https://elevatehub-backend.onrender.com'
, 
});

export default api;
