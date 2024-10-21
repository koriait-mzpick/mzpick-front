import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MzPick from './MzPick';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <MzPick />
    </BrowserRouter>
  </React.StrictMode>
);

