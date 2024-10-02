import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MzPick from './MzPick';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <MzPick />
  </React.StrictMode>
);