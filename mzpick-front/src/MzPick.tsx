import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Route, Routes, useNavigate, useSearchParams } from 'react-router-dom';
import './MzPick.css';

import { ACCESS_TOKEN, AUTH_ABSOLUTE_PATH, FASHION_DETAIL_PATH, FASHION_PATH, FASHION_WRITE_PATH, HOF_FASHION_PATH, HOF_FOOD_PATH, HOF_PATH, HOF_TRAVEL_PATH, HOME_ABSOLUTE_PATH, HOME_PATH, KEYWORD_PATH, MY_PAGE_PATH, ROOT_PATH, SIGN_IN_PATH, SIGN_UP_PATH, SNS_SUCCESS_PATH, TRAVEL_CAFE_PATH, TRAVEL_DETAIL_PATH, TRAVEL_MAP_PATH, TRAVEL_PATH, TRAVEL_RESTAURANT_PATH, TRAVEL_STAY_PATH, TRAVEL_WRITE_PATH, VOTE_DETAILPATH, VOTE_DETAILPHOTOPATH, VOTE_DOUBLEPHOTOPATH, VOTE_PATH, VOTE_WRITEPATH } from './constants';

import { ResponseDto } from './apis/dto/response';
import { getMyPageUserDetailRequest } from './apis/mypage';
import { GetMyPageUserDetailResponseDto } from './apis/mypage/dto/response/user';
import MainLayout from './layouts/MainLayout';
import Detail from './layouts/TotalLayout/Detail';
import { useAuthStore } from './stores';
import SignIn from './views/Auth/SignIn';
import SignUp from './views/Auth/SignUp';
import Fashion from './views/Fashion';
import FashionDetailPage from './views/Fashion/detail';
import FashionWrite from './views/Fashion/Write';
import HOFFashion from './views/HOF/FashionHof';
import HOFFood from './views/HOF/FoodHof';
import HOFTravel from './views/HOF/TravelHof';
import Home from './views/Home';
import Keyword from './views/Keyword';
import MyPage from './views/MyPage';
import TraveMap from './views/Travel';
import CafeMain from './views/Travel/Cafe';
import MainTravel from './views/Travel/MainTravel';
import TravelWrite from './views/Travel/MainTravel/Write';
import RestaurantMain from './views/Travel/Restaurant';
import StayMain from './views/Travel/Stay';
import Vote from './views/Vote';
import VoteDetail from './views/Vote/VoteDetail';
import VoteDetailPhoto from './views/Vote/VoteDetailPhoto';
import VoteDoublePhoto from './views/Vote/VoteDoublePhoto';
import VoteWrite from './views/Vote/VoteWrite';


// component: root path 컴포넌트 //
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

// component: Sns Success 컴포넌트 //
function SnsSuccess() {

  // state: Query Parameter 상태 //
  const [qeuryParam] = useSearchParams();
  const accessToken = qeuryParam.get('accessToken');
  const expiration = qeuryParam.get('expiration');

  // state: cookie 상태 //
  const [cookies, setCookie] = useCookies();

  // function: 네비게이터 함수 //
  const navigator = useNavigate();

  // effect: Sns Success 컴포넌트 로드시 accessToken과 expiration을 확인하여 로그인 처리 함수 //
  useEffect(() => {
      if (accessToken && expiration) {
          const expires = new Date(Date.now() + (Number(expiration) * 1000));
          setCookie(ACCESS_TOKEN, accessToken, { path: ROOT_PATH, expires });

          navigator(HOME_ABSOLUTE_PATH);
      } 
      else navigator(AUTH_ABSOLUTE_PATH);
  }, []);

  // render: Sns Success 컴포넌트 렌더링 //
  return <></>;
}

// component: MzPick 컴포넌트 //
export default function MzPick() {

  // state: 로그인 유저 정보 상태 //
  const { signInUser, setSignInUser } = useAuthStore();

  // state: cookie 상태 //
  const [cookies, setCookie, removeCookie] = useCookies();

  // variable: access token //
  const accessToken = cookies[ACCESS_TOKEN];

  // function: 네비게이터 함수 //
  const navigator = useNavigate();

  // function: get my page user detail response 처리 함수 //
  const getMyPageUserDetailResponse = (responseBody: GetMyPageUserDetailResponseDto | ResponseDto | null) => {
    const message = !responseBody ? '서버에 문제가 있습니다.' :
      responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

      const isSuccessed = responseBody !== null && responseBody.code === 'SU';
      if (!isSuccessed) {
        alert(message);
        return;
      }
      
      const { userId, name: userName } = responseBody as GetMyPageUserDetailResponseDto;
      setSignInUser({ userId, userName });
  };

  // effect: access token이 변경될 시 실행할 함수 //
  useEffect(() => {
    if (accessToken) {
      getMyPageUserDetailRequest(accessToken).then(getMyPageUserDetailResponse);
    }
  }, [accessToken]);

   // render: MzPick 컴포넌트 렌더링 //
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
        < Route path={TRAVEL_MAP_PATH} element={< TraveMap/>} />
        < Route path={TRAVEL_PATH} element={< MainTravel />} />
        < Route path={`${TRAVEL_DETAIL_PATH}/:travelNumber`} element={< Detail />} />
        < Route path={TRAVEL_WRITE_PATH} element={< TravelWrite />} />
        < Route path={TRAVEL_RESTAURANT_PATH} element={< RestaurantMain />} />
        < Route path={TRAVEL_CAFE_PATH} element={< CafeMain />} />
        < Route path={TRAVEL_STAY_PATH} element={< StayMain />} />
      </Route>

      <Route path={FASHION_PATH} element={<MainLayout />}>
        < Route path={FASHION_PATH} element={< Fashion />} />
        < Route path={FASHION_WRITE_PATH} element={< FashionWrite />} />
        < Route path={`${FASHION_DETAIL_PATH}/:fashionNumber`} element={<FashionDetailPage />} />


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

      {/* <Route path={OTHERS_PATH} element={<Index />} /> */}

      <Route path={VOTE_PATH} element={<MainLayout />}>
        <Route path={VOTE_PATH} element={< Vote />} />
        <Route path={VOTE_DETAILPATH} element={< VoteDetail />} />
        <Route path={VOTE_DETAILPHOTOPATH} element={< VoteDetailPhoto />} />
        <Route path={VOTE_DOUBLEPHOTOPATH} element={< VoteDoublePhoto />} />
        <Route path={VOTE_WRITEPATH} element={< VoteWrite />} />
      </Route>
      <Route path={SNS_SUCCESS_PATH} element={<SnsSuccess />} />
    </Routes>
  );
}