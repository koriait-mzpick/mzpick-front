import { Route, Routes } from 'react-router-dom';
import './MzPick.css';
import MainLayout from './layouts/MainLayout';
import SideBarMain from './layouts/SideBarLayout';

export default function MzPick() {
  return (
    <Routes>
      {/* <Route index element={<MainLayout/>}/> */}
      <Route index element={<SideBarMain/>}/>
    </Routes>
  );
}