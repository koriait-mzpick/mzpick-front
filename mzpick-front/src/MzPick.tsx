
import { useCookies } from 'react-cookie';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './MzPick.css';
import { FASHION_PATH, FOOD_PATH, HOF_PATH, HOME_PATH, KEYWORD_PATH, MY_PAGE_PATH, SIGN_IN_PATH, SIGN_UP_PATH, TRAVEL_BOARD_PATH, TRAVEL_PATH, WRITE_PATH } from './constants';
import MainLayout from './layouts/MainLayout';
import Fashion from './views/Fashion';
import Food from './views/Food';
import HOF from './views/HOF';
import Home from './views/Home';
import Keyword from './views/Keyword';
import MyPage from './views/MyPage';
import Travel from './views/Travel';
import MainTravel from './views/Travel/MainTravel';
import Write from './layouts/TotalLayout/Write';
import BottomNav from './layouts/BottomNav';
import Auth from './views/Auth';
import AuthSignUp from './views/Auth/SignUp';
import AuthSignIn from './views/Auth/SignIn';


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
      {/* <Route index element={<Index />} /> */}
      <Route path={HOME_PATH} element={<MainLayout />}>
        < Route path={HOME_PATH} element={< Home />} />
      </Route>

      <Route path={SIGN_IN_PATH} element={<MainLayout />}>
        < Route path={SIGN_IN_PATH} element={< AuthSignIn />} />
      </Route>

      <Route path={SIGN_UP_PATH} element={<MainLayout />}>
        < Route path={SIGN_UP_PATH} element={< AuthSignUp />} />
      </Route>

      <Route path={TRAVEL_PATH} element={<MainLayout />}>
        < Route path={TRAVEL_PATH} element={< Travel />} />
        < Route path={TRAVEL_BOARD_PATH} element={< MainTravel />} />
      </Route>

      <Route path={FASHION_PATH} element={<MainLayout />}>
        < Route path={FASHION_PATH} element={< Fashion />} />
      </Route>

      <Route path={FOOD_PATH} element={<MainLayout />}>
        < Route path={FOOD_PATH} element={< Food />} />
      </Route>

      <Route path={KEYWORD_PATH} element={<MainLayout />}>
        < Route path={KEYWORD_PATH} element={< Keyword />} />
      </Route>

      <Route path={HOF_PATH} element={<MainLayout />}>
        < Route path={HOF_PATH} element={< HOF />} />
      </Route>

      <Route path={MY_PAGE_PATH} element={<MainLayout />}>
        < Route path={MY_PAGE_PATH} element={< MyPage />} />
      </Route>

      <Route path={WRITE_PATH} element={<MainLayout />}>
        <Route path={WRITE_PATH} element={<Write />} />
      </Route>
    </Routes >
  );
}
