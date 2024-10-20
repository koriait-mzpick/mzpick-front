
import { Route, Routes } from 'react-router-dom';
import './MzPick.css';
import MainLayout from './layouts/MainLayout';
import SideBarMain from './layouts/SideBarLayout';
import BottomNav from './layouts/BttomNav';

export default function MzPick() {
  return (
    <Routes>
      {/* <Route index element={<MainLayout/>}/> */}
      <Route index element={<SideBarMain/>}/>
      <Route index element={<BottomNav/>}/>
    </Routes>
  );
}
