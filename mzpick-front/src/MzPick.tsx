
import { useCookies } from 'react-cookie';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './MzPick.css';
import { ACCESS_TOKEN, FASHION_PATH, FOOD_PATH, HOF_PATH, KEYWORD_PATH, MY_PAGE_PATH, OTHERS_PATH, ROOT_PATH, SIGN_IN_PATH, SIGN_UP_PATH, TRAVEL_CAFE_PATH, TRAVEL_DETAIL_PATH, TRAVEL_MAP_PATH, TRAVEL_PATH, TRAVEL_RESTAURANT_PATH, TRAVEL_STAY_PATH, WRITE_PATH } from './constants';
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
import AuthSignUp from './views/Auth/SignUp';
import AuthSignIn from './views/Auth/SignIn';
import Restaurant from './views/Travel/Restaurant';
import Cafe from './views/Travel/Cafe';
import Stay from './views/Travel/Stay';
import Detail from './layouts/TotalLayout/Detail';
import { useEffect } from 'react';
import { getSignInRequest } from './apis';
import { useSignInUserStore } from './stores';
import { ResponseDto } from './apis/dto/response';

// component: root path 컴포넌트 //
function Index() {

  // state: 쿠키 상태 //
  const [cookies] = useCookies();

  // function: 네비게이터 함수 //
  const navigator = useNavigate();

  // effect: 마운트 시 경로 이동 effect //
  useEffect(() => {
      if (cookies[ACCESS_TOKEN]) navigator(ROOT_PATH);
      else navigator(ROOT_PATH);
  }, []);

  // render: root path 컴포넌트 렌더링 //
  return (
      <></>
  );
}

// component: MzPick 컴포넌트 //
export default function MzPick() {

  // state: 로그인 유저 정보 상태 //
  const { signInUser, setSignInUser } = useSignInUserStore();

  // state: 쿠키 상태 //
  const [cookies, setCookie, removeCookie] = useCookies();

  // function: 네비게이터 함수 //
  const navigator = useNavigate();

      // function: get sign in Response 처리 함수 //
      const getSignInResponse = (responseBody: ResponseDto | null) => {

        const message = 
            !responseBody ? '로그인 유저 정보를 불러오는데 문제가 발생했습니다.' : 
            responseBody.code === 'NI' ? '로그인 유저 정보가 존재하지 않습니다.':
            responseBody.code === 'AF' ? '잘못된 로그인 접근입니다.' :
            responseBody.code === 'DBE' ? '로그인 유저 정보를 불러오는데 문제가 발생했습니다.' : '';

        const isSuccessed = responseBody !== null && responseBody.code === 'SU';
        if (!isSuccessed) {
            alert(message);
            removeCookie(ACCESS_TOKEN, { path: ROOT_PATH });
            setSignInUser(null);
            navigator(ROOT_PATH); //절대 경로 상수 나중에 자정하기
            return;
        }
    };

  // effect: cookie의 accessToken 값이 변경될 때마다 로그인 유지 정보 요청하는 함수 //
  useEffect (() => {
    const accessToken = cookies[ACCESS_TOKEN];
    if (accessToken) {
        getSignInRequest(accessToken).then(getSignInResponse);
    }
    else setSignInUser(null);
    }, [cookies[ACCESS_TOKEN]]);
    
  return (
    <Routes>
      {/* <Route index element={<Index />} /> */}
      <Route path={ROOT_PATH} element={<MainLayout />}>
        < Route path={ROOT_PATH} element={< Home />} />
      </Route>

      <Route path={SIGN_IN_PATH} element={<MainLayout />}>
        < Route path={SIGN_IN_PATH} element={< AuthSignIn />} />
      </Route>

      <Route path={SIGN_UP_PATH} element={<MainLayout />}>
        < Route path={SIGN_UP_PATH} element={< AuthSignUp />} />
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
        < Route path={HOF_PATH} element={< HOF />} />
      </Route>

      <Route path={MY_PAGE_PATH} element={<MainLayout />}>
        < Route path={MY_PAGE_PATH} element={< MyPage />} />
      </Route>

      <Route path={WRITE_PATH} element={<MainLayout />}>
        <Route path={WRITE_PATH} element={<Write />} />
      </Route>
      <Route path={OTHERS_PATH} element={<Index />} />
    </Routes >
  );
}
