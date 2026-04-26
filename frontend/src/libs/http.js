import axios from 'axios'

export default axios.create({
    // baseURL: import.meta.env.VITE_API_BASE_URL + '/api',
    baseURL: '/api',
    withCredentials: true,
})