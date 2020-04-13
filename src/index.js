import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Admin from './admin';
import Home from './pages/router_demo/route1/Home';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Home />,document.getElementById('root'));
serviceWorker.unregister();
