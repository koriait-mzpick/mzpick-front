
import { Route, Routes } from 'react-router-dom';
import './MzPick.css';
import { HOME_PATH, SIGN_IN_PATH, TRAVEL_PATH } from './constants';
import MainLayout from './layouts/MainLayout';
import Auth from './views/Auth';
import Home from './views/Home';
import Travel from './views/Travel';

export default function MzPick() {
  return (
    <Routes>
      <Route index element={<MainLayout/>}/>
      <Route path={HOME_PATH} element={<Home/>}/>
      <Route path={SIGN_IN_PATH} element={<Auth/>}/>
      <Route path={TRAVEL_PATH} element={<Travel />} />
    </Routes>
  );
}
