import axios from 'axios';
axios.defaults.withCredentials = true;

const instance = axios.create({
    //baseURL: 'http://localhost:4000/api', // Replace this with your backend API base URL
    baseURL: 'https://rate-this-api.vercel.app/api',
    timeout: 10000, // Adjust timeout as needed
});

// Define functions for making API requests
const api = {
    new_card: (formData) => instance.post('/new_card', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }),
    load_all_cards: () => instance.get('/load_cards'),
    update_card: (card) => instance.put('/update_card', card),
    delete_card: (id) => instance.delete(`/delete_card/${id}`),
};

export default api;