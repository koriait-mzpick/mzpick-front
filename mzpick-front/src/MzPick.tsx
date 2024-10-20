
import { Route, Routes } from 'react-router-dom';
import './MzPick.css';
import { SIGN_IN_PATH } from './constants';
import MainLayout from './layouts/MainLayout';
import Auth from './views/Auth';

export default function MzPick() {
  return (
    <Routes>
      <Route index element={<MainLayout/>}/>
      <Route path={SIGN_IN_PATH} element={<Auth/>}/>
    </Routes>
  );
}
