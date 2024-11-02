import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

const apiRequest = async (method, url, data = null) => {
    try {
        const response = await apiClient.request({
            method,
            url,
            data,
        });
        return response.data; 
    } catch (error) {
        if (error.response) {
            return { success: false, ...error.response.data };
        }
        return { success: false, message: 'Network error' };
    }
};

export const GET = (url) => apiRequest('GET', url);
export const POST = (url, data) => apiRequest('POST', url, data);
export const PUT = (url, data) => apiRequest('PUT', url, data);
export const DELETE = (url) => apiRequest('DELETE', url);
