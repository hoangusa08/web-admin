import axios from 'axios';

export default axios.create({
    baseURL: 'https://estorefashionshop.herokuapp.com/api/v1/'
});