import axios from 'axios';
axios.defaults.withCredentials = true;

const instance = axios.create({
  //baseURL: 'http://localhost:4000/auth', // Replace this with your backend API base URL
  baseURL: 'https://ratethis-backend.onrender.com/auth',
  timeout: 10000, // Adjust timeout as needed
});

// Define functions for making API requests
const api = {
  login: (email, password) => instance.post('/login', { email, password }),
  register: (firstName, lastName, email, password) => instance.post('/register', { firstName, lastName, email, password }),
  googleSignIn: (firstName, lastName, email) => instance.post('/googleSignIn', {firstName, lastName, email}),
  isLoggedIn: () => instance.get('/isLoggedIn'), 
  logout: () => instance.get('/logout')
};

export default api;