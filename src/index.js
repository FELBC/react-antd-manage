import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Router from './router';
import { Provider } from 'react-redux';
import configureStore from './redux/store/configureStore';
import * as serviceWorker from './serviceWorker';

/**
 * Redux工作流说明：
 * 导入configureStore并调用执行，获取createStore这个工厂，
 * return新的store数据源对象，store保存我们最终的数据源，
 * Provider组件用来提供数据源，把store注入进去，
 * Router里面各个组件都能从这个store里面拿数据，
 * 各组件拿数据之前通过事件行为把数据传递进去，
 * eg：
 * 点击菜单的时候传递事件到action，
 * action调用reducer，
 * reducer更改状态，
 * 最后把状态传递到页面
*/

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <Router />
    </Provider>,
    document.getElementById('root')
);
serviceWorker.unregister();
