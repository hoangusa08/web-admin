import axios from 'axios';

export default axios.create({
    baseURL: 'https://estorefashionshop.herokuapp.com/api/v1/'
    // baseURL: 'http://localhost:9090/api/v1/'
});