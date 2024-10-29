
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuthStore } from 'src/stores';
import { FASHION_PATH, FOOD_PATH, HOF_PATH, HOME_PATH, KEYWORD_PATH, MY_PAGE_PATH, SIGN_IN_PATH, SIGN_UP_PATH, TRAVEL_CAFE_PATH, TRAVEL_MAP_PATH, TRAVEL_PATH, TRAVEL_RESTAURANT_PATH, TRAVEL_STAY_PATH, VOTE_PATH } from '../../constants';
import './style.css';

// component: 메인레이아웃 컴포넌트 //
export default function MainLayout() {

  // state: 사이드바 상태 //
  const [sideBarOpen, setSideBarOpen] = useState(false); 

  // state: 사이드바 세부 카테고리 상태 //
  const [travelCategoryOpen, setTravelCategoryOpen] = useState(false);
  const [fashionCategoryOpen, setFashionCategoryOpen] = useState(false);

  // state: 쿠키상태 //
  const [cookies, setCookie, removeCookie] = useCookies(['accessToken']);
  const { signInUser, setSignInUser } = useAuthStore();

  // function: 네비게이터 함수 //
  const navigator = useNavigate();

  // event handler: 사이드바 오픈 이벤트 처리 //
  const sideBarOpenHandler = () => {
    setSideBarOpen(sideBar=> {
      if (sideBar) {
        setTravelCategoryOpen(false);
        setFashionCategoryOpen(false);
      }
      return !sideBar
    });
  }
  
  // event handler: 사이드바 세부 오픈 이벤트 처리 //
  const tarvelCategoryOpenHandler = () => {
    setTravelCategoryOpen(!travelCategoryOpen);
  }
  const fashionCategoryOpenHandler = () => {
    setFashionCategoryOpen(!fashionCategoryOpen);
  }

  // event handler: 네비게이션 아이템 클릭 이벤트 처리 //
  const onItemClickHandler = (path: string) => {
    navigator(path);
    setSideBarOpen(false);
    setTravelCategoryOpen(false);
    setFashionCategoryOpen(false);
  };

  const handleLogout = () => {
    removeCookie('accessToken'); // accessToken 삭제
    setSignInUser(null); // 상태를 null로 변경
    navigator(HOME_PATH); // 홈으로 이동
  };

  // render: 메인레이아웃 컴포넌트 렌더링 //
  return (
    <div id='main-layout'>
      <div className='layout-logo'>
        <div className='box'>
          <div className='icon' onClick={() => onItemClickHandler(HOME_PATH)}></div>
          <div className='title'onClick={() => onItemClickHandler(HOME_PATH)}>MZPICK</div>
        </div>
        <div className={`navi-box ${sideBarOpen ? 'active' : ''}`}>
          <div className='signin-signup'>
            {cookies.accessToken ? ( 
              <>
                <div className='mypage-button' onClick={() => onItemClickHandler(MY_PAGE_PATH)}>마이페이지</div>
                <div className='slice-line' style={{ cursor: "default" }}>/</div>
                <div className='logout-button' onClick={handleLogout}>로그아웃</div>
              </>
            ) : (
              <>
                <div className='login-button' onClick={() => onItemClickHandler(SIGN_IN_PATH)}>로그인</div>
                <div className='slice-line' style={{ cursor: "default" }}>/</div>
                <div className='signup-button' onClick={() => onItemClickHandler(SIGN_UP_PATH)}>회원가입</div>
              </>
            )}
            <div className='navi-icon' onClick={sideBarOpenHandler}></div>
          </div>
        </div>
      </div>
      
      <div id='main-wrapper'>
        { <Outlet /> }
      </div>

      <div className={`side-bar ${sideBarOpen ? 'active' : ''}`}>
        <div className='close-icon' onClick={sideBarOpenHandler}></div>
        <div className='category' onClick={() => onItemClickHandler(HOME_PATH)}>HOME</div>
        <div className='category' style={{ borderBottom: "1px solid rgba(201, 224, 253, 0.3)" }} onClick={tarvelCategoryOpenHandler}>TRAVEL</div>
        <div className={`category-detail ${travelCategoryOpen ? 'active' : ''}`}>
          <div className='category-detail-text-box'>
            <div className='icon'></div>
            <div className='category-detail-text' onClick={() => onItemClickHandler(TRAVEL_MAP_PATH)}>지도</div>
          </div>
          <div className='category-detail-text-box'>
            <div className='icon'></div>
            <div className='category-detail-text' onClick={() => onItemClickHandler(TRAVEL_PATH)}>여행</div>
          </div>
          <div className='category-detail-text-box'>
            <div className='icon'></div>
            <div className='category-detail-text' onClick={() => onItemClickHandler(TRAVEL_RESTAURANT_PATH)}>맛집</div>
          </div>
          <div className='category-detail-text-box'>
            <div className='icon'></div>
            <div className='category-detail-text'onClick={() => onItemClickHandler(TRAVEL_CAFE_PATH)}>카페</div>
          </div>
          <div className='category-detail-text-box'>
            <div className='icon'></div>
            <div className='category-detail-text' onClick={() => onItemClickHandler(TRAVEL_STAY_PATH)}>숙박</div>
          </div>
          <div className='category-detail-text-box'>
            <div className='icon'></div>
            <div className='category-detail-text'onClick={() => onItemClickHandler(VOTE_PATH)}>투표</div>
          </div>
        </div>
        <div className='category' style={{ borderBottom: "1px solid rgba(201, 224, 253, 0.3)" }} onClick={() => onItemClickHandler(FOOD_PATH)}>FOOD</div>
        <div className='category' onClick={fashionCategoryOpenHandler} >FASHION</div>
        <div className={`category-detail ${fashionCategoryOpen ? 'active' : ''}`}>
          <div className='category-detail-text-box'>
            <div className='icon'></div>
            <div className='category-detail-text' onClick={() => onItemClickHandler(FASHION_PATH)}>패션 게시판</div>
          </div>
          <div className='category-detail-text-box'>
            <div className='icon'></div>
            <div className='category-detail-text'onClick={() => onItemClickHandler(VOTE_PATH)}>투표</div>
          </div>
        </div>
        <div className='category' style={{ borderBottom: "1px solid rgba(201, 224, 253, 0.3)" }} onClick={() => onItemClickHandler(KEYWORD_PATH)}>KEYWORD</div>
        <div className='category' onClick={() => onItemClickHandler(HOF_PATH)}>HALL OF FAME</div>
        <div className='signin-signup'>
            {cookies.accessToken ? ( 
              <>
                <div className='mypage-button' onClick={() => onItemClickHandler(MY_PAGE_PATH)}>마이페이지</div>
                <div className='slice-line' style={{ cursor: "default" }}>/</div>
                <div className='logout-button' onClick={handleLogout}>로그아웃</div>
              </>
            ) : (
              <>
                <div className='login-button' onClick={() => onItemClickHandler(SIGN_IN_PATH)}>로그인</div>
                <div className='slice-line' style={{ cursor: "default" }}>/</div>
                <div className='signup-button' onClick={() => onItemClickHandler(SIGN_UP_PATH)}>회원가입</div>
              </>
            )}
        </div>
      </div>
    </div>
  );
}

