import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './MzPick.css';
import { ACCESS_TOKEN, FASHION_PATH, FOOD_PATH, HOF_FASHION_PATH, HOF_FOOD_PATH, HOF_PATH, HOF_TRAVEL_PATH, HOME_PATH, KEYWORD_PATH, MY_PAGE_PATH, OTHERS_PATH, SIGN_IN_PATH, SIGN_UP_PATH, TRAVEL_CAFE_PATH, TRAVEL_DETAIL_PATH, TRAVEL_MAP_PATH, TRAVEL_PATH, TRAVEL_RESTAURANT_PATH, TRAVEL_STAY_PATH, VOTE_PATH, WRITE_PATH } from './constants';

import MainLayout from './layouts/MainLayout';
import Detail from './layouts/TotalLayout/Detail';
import Write from './layouts/TotalLayout/Write';
import { useAuthStore } from './stores';
import SignIn from './views/Auth/SignIn';
import SignUp from './views/Auth/SignUp';
import Fashion from './views/Fashion';
import Food from './views/Food';
import HOFFashion from './views/HOF/FashionHof';
import HOFFood from './views/HOF/FoodHof';
import HOFTravel from './views/HOF/TravelHof';
import Home from './views/Home';
import Keyword from './views/Keyword';
import MyPage from './views/MyPage';
import Travel from './views/Travel';
import Cafe from './views/Travel/Cafe';
import MainTravel from './views/Travel/MainTravel';
import Restaurant from './views/Travel/Restaurant';
import Stay from './views/Travel/Stay';
import Vote from './views/Vote';


function Index() {


  // state: 쿠키 상태 //
  const [cookies, setCookie] = useCookies();

  // function: 네비게이터 함수 //
  const navigator = useNavigate();

  // effect: 마운트 시 경로 이동 effect //
  useEffect(() => {
    if (cookies[ACCESS_TOKEN]) navigator(HOME_PATH);
    else navigator(HOME_PATH);
  }, []);

  // render: root path 컴포넌트 렌더링 //
  return (
    <></>
  );
}
export default function MzPick() {
    // state: 로그인 유저 정보 상태 //
    const { signInUser, setSignInUser } = useAuthStore();

    // state: cookie 상태 //
    const [cookies, setCookie, removeCookie] = useCookies();

    // function: 네비게이터 함수 //
    const navigator = useNavigate();

  return (
    <Routes>
      <Route index element={<Index />} />
      <Route path={HOME_PATH} element={<MainLayout />}>
        < Route path={HOME_PATH} element={< Home />} />
      </Route>

      <Route path={SIGN_IN_PATH} element={<MainLayout />}>
        < Route path={SIGN_IN_PATH} element={<SignIn />} />
      </Route>

      <Route path={SIGN_UP_PATH} element={<MainLayout />}>
        < Route path={SIGN_UP_PATH} element={< SignUp />} />
      </Route>

      <Route path={TRAVEL_PATH} element={<MainLayout />}>
        < Route path={TRAVEL_MAP_PATH} element={< Travel />} />
        < Route path={TRAVEL_PATH} element={< MainTravel />} />
        < Route path={TRAVEL_DETAIL_PATH} element={< Detail />} />
        < Route path={TRAVEL_RESTAURANT_PATH} element={< Restaurant />} />
        < Route path={TRAVEL_CAFE_PATH} element={< Cafe />} />
        < Route path={TRAVEL_STAY_PATH} element={< Stay />} />
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
        < Route path={HOF_PATH} element={< HOFTravel />} />
        < Route path={HOF_TRAVEL_PATH } element={< HOFTravel />} />
        < Route path={HOF_FOOD_PATH} element={< HOFFood />} />
        < Route path={HOF_FASHION_PATH} element={< HOFFashion />} />
      </Route>

      <Route path={MY_PAGE_PATH} element={<MainLayout />}>
        < Route path={MY_PAGE_PATH} element={< MyPage />} />
      </Route>

      <Route path={WRITE_PATH} element={<MainLayout />}>
        <Route path={WRITE_PATH} element={<Write />} />
      </Route>

      <Route path={OTHERS_PATH} element={<Index />} />

      <Route path={VOTE_PATH} element={<MainLayout />}>
      <Route path={VOTE_PATH} element={< Vote />} />
      </Route>
    </Routes>
  );
}