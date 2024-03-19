import axios from 'axios';


const instance = axios.create({
  //baseURL: 'http://localhost:4000/auth', // Replace this with your backend API base URL
  baseURL: 'https://ratethis-backend.onrender.com/auth',
  timeout: 10000, // Adjust timeout as needed
});

// Define functions for making API requests
const api = {
  login: (username, password) => instance.post('/login', { username, password }),
  register: (email, username, password) => instance.post('/register', { email, username, password }),
};

export default api;