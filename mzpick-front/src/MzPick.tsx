import { Route, Routes } from 'react-router-dom';
import './MzPick.css';
import SideBarDetail from './layouts/SideBarLayout';

export default function MzPick() {
  return (
    <Routes>
      {/* <Route index element={<MainLayout/>}/> */}
      <Route index element={<SideBarDetail/>}/>
    </Routes>
  );
}