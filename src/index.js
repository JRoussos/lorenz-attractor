import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './index.css';

ReactDOM.render(
  <React.StrictMode>
    {/* <button onClick={() => document.querySelector("canvas").requestFullscreen()}>Full Screen</button> */}
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
