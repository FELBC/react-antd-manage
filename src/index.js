import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Life from './pages/demo/Life';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <Life />
  </React.StrictMode>,
  document.getElementById('root')
);
serviceWorker.unregister();
