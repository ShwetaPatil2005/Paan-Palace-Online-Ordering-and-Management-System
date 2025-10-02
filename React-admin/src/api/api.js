import axios from 'axios';

const API = axios.create({
    baseURL : 'http//localhost:8080/api',
});

export const getProducts = () => API.get('/products');
export const addProducts = () => API.post('/products', product);
export const deleteProduct = () => API.delete('/products', $(id));
