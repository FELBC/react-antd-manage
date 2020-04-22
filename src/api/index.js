import city from './city';
import order from './order';
import user from './user';
import role from './role';

const API = {
    ...city,
    ...order,
    ...user,
    ...role
};

export default API;