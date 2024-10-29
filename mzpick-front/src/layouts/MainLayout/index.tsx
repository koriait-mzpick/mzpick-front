
import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { FASHION_PATH, FOOD_PATH, HOF_PATH, HOME_PATH, KEYWORD_PATH, SIGN_IN_PATH, SIGN_UP_PATH, TRAVEL_CAFE_PATH, TRAVEL_MAP_PATH, TRAVEL_PATH, TRAVEL_RESTAURANT_PATH, TRAVEL_STAY_PATH } from '../../constants';
import './style.css';

// component: 메인레이아웃 컴포넌트 //
export default function MainLayout() {

  // state: path 상태 //
  // const { pathname } = useLocation();

  // state: 사이드바 토글 상태 //
  const [sideBarOpen, setSideBarOpen] = useState(false);  // 메뉴의 초기값을 false로 설정

  const sideBarToggleMenu = () => {
    setSideBarOpen(sideBar=> {
      if (sideBar) {
        setCategoryOpen1(false);
        setCategoryOpen2(false);
      }
      return !sideBar
    });
  }

  // state: 사이드바 세부 카테고리 토글 상태 //
  const [categoryOpen1, setCategoryOpen1] = useState(false);
  
  const detailCategoryToggleMenu1 = () => {
    setCategoryOpen1(!categoryOpen1);
  }

  const [categoryOpen2, setCategoryOpen2] = useState(false);

  const detailCategoryToggleMenu2 = () => {
    setCategoryOpen2(!categoryOpen2);
  }

  // variable: 경로 이름 //
  // const isHome = pathname.startsWith(HOME_PATH);
  // const isTravel = pathname.startsWith(TRAVEL_PATH);

  // function: 네비게이터 함수 //
  const navigator = useNavigate();

  // event handler: 네비게이션 아이템 클릭 이벤트 처리 //
  const onItemClickHandler = (path: string) => {
    navigator(path);
    setSideBarOpen(false);
    setCategoryOpen1(false);
    setCategoryOpen2(false);
  };


  // render: 메인레이아웃 컴포넌트 렌더링 //
  return (
    <div id='main-layout'>
      <div className='layout-logo'>
        <div className='box'>
          <div className='icon'></div>
          <div className='title'>MZPICK</div>
        </div>
        <div className={`navi-box ${sideBarOpen ? 'active' : ''}`}>
          <div className='signin-signup'>
            <div className='login-button' onClick={() => onItemClickHandler(SIGN_IN_PATH)}>로그인</div>
            <div className='slice-line' style={{ cursor: "default" }}>/</div>
            <div className='signup-button' onClick={() => onItemClickHandler(SIGN_UP_PATH)}>회원가입</div>
            <div className='navi-icon' onClick={sideBarToggleMenu}></div>
          </div>
        </div>
      </div>
      
      <div id='main-wrapper'>
        { <Outlet /> }
      </div>

      <div className={`side-bar ${sideBarOpen ? 'active' : ''}`}>
        <div className='close-icon' onClick={sideBarToggleMenu}></div>
        <div className='category' onClick={() => onItemClickHandler(HOME_PATH)}>HOME</div>
        <div className='category' style={{ borderBottom: "1px solid rgba(201, 224, 253, 0.3)" }} onClick={detailCategoryToggleMenu1}>TRAVEL</div>
        <div className={`category-detail ${categoryOpen1 ? 'active' : ''}`}>
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
            <div className='category-detail-text'>투표</div>
          </div>
        </div>
        <div className='category' style={{ borderBottom: "1px solid rgba(201, 224, 253, 0.3)" }} onClick={() => onItemClickHandler(FOOD_PATH)}>FOOD</div>
        <div className='category' onClick={detailCategoryToggleMenu2} >FASHION</div>
        <div className={`category-detail ${categoryOpen2 ? 'active' : ''}`}>
          <div className='category-detail-text-box'>
            <div className='icon'></div>
            <div className='category-detail-text' onClick={() => onItemClickHandler(FASHION_PATH)}>패션 게시판</div>
          </div>
          <div className='category-detail-text-box'>
            <div className='icon'></div>
            <div className='category-detail-text'>투표</div>
          </div>
        </div>
        <div className='category' style={{ borderBottom: "1px solid rgba(201, 224, 253, 0.3)" }} onClick={() => onItemClickHandler(KEYWORD_PATH)}>KEYWORD</div>
        <div className='category' onClick={() => onItemClickHandler(HOF_PATH)}>HALL OF FAME</div>
        <div className='signin-signup'>
          <div className='login-button' onClick={() => onItemClickHandler(SIGN_IN_PATH)}>로그인</div>
          <div className='slice-line' style={{ cursor: "default" }}>/</div>
          <div className='signup-button' onClick={() => onItemClickHandler(SIGN_UP_PATH)}>회원가입</div>
        </div>
      </div>
    </div>
  );
}