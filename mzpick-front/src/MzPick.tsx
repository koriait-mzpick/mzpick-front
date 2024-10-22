
import { useCookies } from 'react-cookie';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './MzPick.css';
import { HOME_PATH, MY_PAGE_PATH, SIGN_IN_PATH, TRAVEL_BOARD_PATH, TRAVEL_PATH } from './constants';
import MainLayout from './layouts/MainLayout';
import Auth from './views/Auth';
import Home from './views/Home';
import MyPage from './views/MyPage';
import Travel from './views/Travel';
import MainTravel from './views/Travel/MainTravel';

function Index() {


  // state: 쿠키 상태 //
  const [cookies] = useCookies();

  // function: 네비게이터 함수 //
  const navigator = useNavigate();

  // render: root path 컴포넌트 렌더링 //
  return (
    <></>
  );
}

export default function MzPick() {
  return (
    <Routes>
      <Route index element={<Index />} />
      <Route path={HOME_PATH} element={<MainLayout />}>
        < Route path={HOME_PATH} element={< Home />} />
      </Route>

      <Route path={SIGN_IN_PATH} element={<MainLayout />}>
        < Route path={SIGN_IN_PATH} element={< Auth />} />
      </Route>

      <Route path={TRAVEL_PATH} element={<MainLayout />}>
        < Route path={TRAVEL_PATH} element={< Travel />} />
        < Route path={TRAVEL_BOARD_PATH} element={< MainTravel />} />
      </Route>

      <Route path={MY_PAGE_PATH} element={<MainLayout />}>
        < Route path={MY_PAGE_PATH} element={< MyPage />} />
      </Route>
    </Routes >
  );
}
