/**
 * Reducer 数据处理
*/

import { combineReducers } from 'redux'
import { type } from '../action';

const initialState = {
    menuName: '首页'
}
const storeData = (state={initialState}, action) => {
    switch (action.type) {
        case type.SWITCH_MENU:
            return {
                ...state,
                menuName:action.menuName
            };
        default:
            return {...state};
    }
};

export default storeData;