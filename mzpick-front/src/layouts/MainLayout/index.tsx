import { useState } from 'react';
import './style.css';

// component: 메인레이아웃 컴포넌트 //
export default function MainLayout() {

  // state: 사이드바 토글 상태 //
  const [sideBarOpen, setSideBarOpen] = useState(false);  // 메뉴의 초기값을 false로 설정

  const sideBarToggleMenu = () => {
    setSideBarOpen(sideBar=> {
      if (sideBar) {
        setCategoryOpen1(false);
        setCategoryOpen2(false);
      }
      return !sideBar
    }); // on,off 개념 boolean
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

  // render: 메인레이아웃 컴포넌트 렌더링 //
  return (
    <div id='main-layout'>
      <div className='layout-logo'>
        <div className='box'>
          <div className='icon'></div>
          <div className='title'>MZPICK</div>
        </div>
        <div className={`navi-box ${sideBarOpen ? 'active' : ''}`}>
          <div className="signin-signup">
            <div className='login-button'>로그인</div>
            <div className='slice-line' style={{ cursor: "default" }}>/</div>
            <div className='signup-button'>회원가입</div>
            <div className='navi-icon' onClick={sideBarToggleMenu}></div>
          </div>
        </div>
      </div>
      <div className={`side-bar ${sideBarOpen ? 'active' : ''}`}>
        <div className="close-icon" onClick={sideBarToggleMenu}></div>
        <div className="category ">HOME</div>
        <div className="category" style={{ borderBottom: "1px solid rgba(201, 224, 253, 0.3)" }} onClick={detailCategoryToggleMenu1}>TRAVEL</div>
        <div className={`category-detail ${categoryOpen1 ? 'active' : ''}`}>
          <div className='category-detail-text-box'>
            <div className='icon'></div>
            <div className='category-detail-text'>여행 게시판</div>
          </div>
          <div className='category-detail-text-box'>
            <div className='icon'></div>
            <div className='category-detail-text'>맛집</div>
          </div>
          <div className='category-detail-text-box'>
            <div className='icon'></div>
            <div className='category-detail-text'>카페</div>
          </div>
          <div className='category-detail-text-box'>
            <div className='icon'></div>
            <div className='category-detail-text'>숙박</div>
          </div>
          <div className='category-detail-text-box'>
            <div className='icon'></div>
            <div className='category-detail-text'>투표</div>
          </div>
        </div>
        <div className="category" style={{ borderBottom: "1px solid rgba(201, 224, 253, 0.3)" }}>FOOD</div>
        <div className="category" onClick={detailCategoryToggleMenu2}>FASHION</div>
        <div className={`category-detail ${categoryOpen2 ? 'active' : ''}`}>
          <div className='category-detail-text-box'>
            <div className='icon'></div>
            <div className='category-detail-text'>여행 게시판</div>
          </div>
          <div className='category-detail-text-box'>
            <div className='icon'></div>
            <div className='category-detail-text'>맛집</div>
          </div>
        </div>
        <div className="category" style={{ borderBottom: "1px solid rgba(201, 224, 253, 0.3)" }}>KEYWORD</div>
        <div className="category">HALL OF FAME</div>
        <div className="signin-signup">
          <div className='login-button'>로그인</div>
          <div className='slice-line' style={{ cursor: "default" }}>/</div>
          <div className='signup-button'>회원가입</div>
        </div>
      </div>
    </div>
  );
}