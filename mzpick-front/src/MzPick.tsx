import { Route, Routes } from 'react-router-dom';
import './MzPick.css';
import MainLayout from './layouts/MainLayout';

export default function MzPick() {
  return (
    <Routes>
      {/* <Route index element={<MainLayout/>}/> */}
      <Route index element={<SideBarDetail/>}/>
    </Routes>
  );
}