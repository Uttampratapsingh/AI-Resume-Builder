import axios from 'axios';

const api = axios.create({ 
  baseURL: import.meta.env.VITE_BASE_URL
});

export default api;

// here we have created an instance of axios with a base URL that is defined in the environment variable VITE_BASE_URL. this allows us to easily change the base URL for our API calls without having to modify the code in multiple places. we can simply update the environment variable and all API calls will use the new base URL.