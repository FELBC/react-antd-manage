import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Admin from './admin';
import Router from './pages/router_demo/route2/Router';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Router />,document.getElementById('root'));
serviceWorker.unregister();
