import city from './city';
import order from './order';
import user from './user';

const API = {
    ...city,
    ...order,
    ...user
};

export default API;