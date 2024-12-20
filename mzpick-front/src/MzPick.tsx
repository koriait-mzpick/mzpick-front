import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Route, Routes, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import './MzPick.css';

import { ACCESS_TOKEN, AUTH_ABSOLUTE_PATH, FASHION_DETAIL_PATH, FASHION_PATH, FASHION_UPDATE_PATH, FASHION_WRITE_PATH, HOF_FASHION_PATH, HOF_FOOD_PATH, HOF_PATH, HOF_TRAVEL_PATH, HOME_ABSOLUTE_PATH, HOME_PATH, KEYWORD_PATH, MY_PAGE_PATH, ROOT_PATH, SIGN_IN_PATH, SIGN_UP_PATH, SNS_SUCCESS_PATH, TRAVEL_CAFE_DETAIL_PATH, TRAVEL_CAFE_PATH, TRAVEL_CAFE_UPDATE_PATH, TRAVEL_CAFE_WRITE_PATH, TRAVEL_DETAIL_PATH, TRAVEL_MAP_PATH, TRAVEL_PATH, TRAVEL_RESTAURANT_DETAIL_PATH, TRAVEL_RESTAURANT_PATH, TRAVEL_RESTAURANT_UPDATE_PATH, TRAVEL_RESTAURANT_WRITE_PATH, TRAVEL_STAY_DETAIL_PATH, TRAVEL_STAY_PATH, TRAVEL_STAY_UPDATE_PATH, TRAVEL_STAY_WRITE_PATH, TRAVEL_UPDATE_PATH, TRAVEL_WRITE_PATH, VOTE_DETAILPATH, VOTE_DETAILPHOTOPATH, VOTE_DOUBLEPHOTOPATH, VOTE_PATH, VOTE_WRITEPATH, VOTEFASHION_DETAILPATH, VOTEFASHION_DETAILPHOTOPATH, VOTEFASHION_DOUBLEPHOTOPATH, VOTEFASHION_PATH, VOTEFASHION_WRITEPATH } from './constants';

import { ResponseDto } from './apis/dto/response';
import { getMyPageUserDetailRequest } from './apis/mypage';
import { GetMyPageUserDetailResponseDto } from './apis/mypage/dto/response/user';
import MainLayout from './layouts/MainLayout';

import { useAuthStore, useSearchLocationStore } from './stores';
import SignIn from './views/Auth/SignIn';
import SignUp from './views/Auth/SignUp';
import Fashion from './views/Fashion';
import FashionDetailPage from './views/Fashion/detail';
import FashionUpdate from './views/Fashion/update';
import FashionWrite from './views/Fashion/Write';
import HOFFashion from './views/HOF/FashionHof';
import HOFFood from './views/HOF/FoodHof';
import HOFTravel from './views/HOF/TravelHof';
import Home from './views/Home';
import Keyword from './views/Keyword';
import MyPageMain from './views/MyPage';
import TraveMap from './views/Travel';
import TravelCafe from './views/Travel/Cafe';
import TravelCafeDetailPage from './views/Travel/Cafe/detail';
import TravelCafeUpdate from './views/Travel/Cafe/Update';
import TravelCafeWrite from './views/Travel/Cafe/Write';
import MainTravel from './views/Travel/MainTravel';
import TravelDetailPage from './views/Travel/MainTravel/Detail';
import TravelUpdate from './views/Travel/MainTravel/Update';
import TravelWrite from './views/Travel/MainTravel/Write';
import TravelRestaurant from './views/Travel/Restaurant';
import TravelRestaurantDetailPage from './views/Travel/Restaurant/detail';
import TravelRestaurantUpdate from './views/Travel/Restaurant/Update';
import TravelRestaurantWrite from './views/Travel/Restaurant/Write';
import TravelStay from './views/Travel/Stay';
import TravelStayDetailPage from './views/Travel/Stay/detail';
import TravelStayWrite from './views/Travel/Stay/Write';
import Vote from './views/Vote';
import VoteDetail from './views/Vote/VoteDetail';
import VoteDetailPhoto from './views/Vote/VoteDetailPhoto';
import VoteDoublePhoto from './views/Vote/VoteDoublePhoto';
import VoteWrite from './views/Vote/VoteWrite';
import TravelStayUpdate from './views/Travel/Stay/Update';
import VoteFashion from './views/VoteFahsion';
import VoteFashionDetail from './views/VoteFahsion/VoteFashionDetail';
import VoteFashionDetailPhoto from './views/VoteFahsion/VoteFashionDetailPhoto';
import VoteFashionDoublePhoto from './views/VoteFahsion/VoteFashionDoublePhoto';
import VoteFashionWrite from './views/VoteFahsion/VoteFashionWrite';


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

  // state: 지역 검색어 상태 //
  const { setSearchLocation } = useSearchLocationStore();

  // state: cookie 상태 //
  const [cookies, setCookie, removeCookie] = useCookies();
  // state:경로 상태//
  const { pathname } = useLocation();

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

  useEffect(() => {
    if (!pathname.includes(TRAVEL_PATH)) setSearchLocation('');
  }, [pathname]);

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
        < Route path={`${TRAVEL_DETAIL_PATH}/:travelNumber`} element={< TravelDetailPage />} />
        < Route path={TRAVEL_WRITE_PATH} element={< TravelWrite />} />
        < Route path={`${TRAVEL_UPDATE_PATH}/:travelNumber`} element={< TravelUpdate />} />

        < Route path={TRAVEL_RESTAURANT_PATH} element={< TravelRestaurant />} />
        < Route path={`${TRAVEL_RESTAURANT_DETAIL_PATH}/:travelRestaurantNumber`}element={< TravelRestaurantDetailPage />} />
        < Route path={TRAVEL_RESTAURANT_WRITE_PATH} element={< TravelRestaurantWrite />} />
        < Route path={`${TRAVEL_RESTAURANT_UPDATE_PATH}/:travelRestaurantNumber`} element={< TravelRestaurantUpdate />} />

        < Route path={TRAVEL_CAFE_PATH} element={< TravelCafe />} />
        < Route path={`${TRAVEL_CAFE_DETAIL_PATH}/:travelCafeNumber`}element={< TravelCafeDetailPage />} />
        < Route path={TRAVEL_CAFE_WRITE_PATH} element={< TravelCafeWrite />} />
        < Route path={`${TRAVEL_CAFE_UPDATE_PATH}/:travelCafeNumber`} element={< TravelCafeUpdate />} />


        < Route path={TRAVEL_STAY_PATH} element={< TravelStay />} />
        < Route path={`${TRAVEL_STAY_DETAIL_PATH}/:travelStayNumber`}element={< TravelStayDetailPage />} />
        < Route path={TRAVEL_STAY_WRITE_PATH} element={< TravelStayWrite />} />
        < Route path={`${TRAVEL_STAY_UPDATE_PATH}/:travelStayNumber`} element={< TravelStayUpdate />} />



      </Route>

      <Route path={FASHION_PATH} element={<MainLayout />}>
        < Route path={FASHION_PATH} element={< Fashion />} />
        < Route path={FASHION_WRITE_PATH} element={< FashionWrite />} />
        < Route path={`${FASHION_DETAIL_PATH}/:fashionNumber`} element={<FashionDetailPage />} />
        < Route path={`${FASHION_UPDATE_PATH}/:fashionNumber`} element={<FashionUpdate />} />
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
        < Route path={MY_PAGE_PATH} element={< MyPageMain />} />
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

      <Route path={VOTEFASHION_PATH} element={<MainLayout />}>
        <Route path={VOTEFASHION_PATH} element={< VoteFashion />} />
        <Route path={VOTEFASHION_DETAILPATH} element={< VoteFashionDetail />} />
        <Route path={VOTEFASHION_DETAILPHOTOPATH} element={< VoteFashionDetailPhoto />} />
        <Route path={VOTEFASHION_DOUBLEPHOTOPATH} element={< VoteFashionDoublePhoto />} />
        <Route path={VOTEFASHION_WRITEPATH} element={< VoteFashionWrite />} />
      </Route>

      <Route path={SNS_SUCCESS_PATH} element={<SnsSuccess />} />
    </Routes>
  );
}