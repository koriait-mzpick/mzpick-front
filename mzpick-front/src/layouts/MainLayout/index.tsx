import { useState } from 'react';
import './style.css';

export default function MainLayout() {

  // component: 메인레이아웃 컴포넌트 //
  const [sideBarOpen, setSideBarOpen] = useState(false);  // 메뉴의 초기값을 false로 설정

  const toggleMenu = () => {
    setSideBarOpen(!sideBarOpen); // on,off 개념 boolean
  }

  // render: 메인레이아웃 컴포넌트 렌더링 //
  return (
    <div id='main-layout'>
      <div className='layout-logo'>
        <div className='box'>
          <div className='icon'></div>
          <div className='title'>MZPICK</div>
        </div>
        <div className='navi-box'>
          <div className="signin-signup">
            <div className='login-button'>로그인</div>
            <div className='slice-line' style={{cursor:"default"}}>/</div>
            <div className='signup-button'>회원가입</div>
              <div className='navi-icon' onClick={toggleMenu}></div>
            {!sideBarOpen &&
            <div>
            <div className='main'>
              <div className="side-bar">
                  <div className="close-icon" onClick={toggleMenu}></div>
                <div className={`sideBar ${sideBarOpen ? 'open' : 'closed'}`}>

                  <div className="Category ">HOME</div>
                  <div className="Category" style={{ borderBottom: "1px solid rgba(201, 224, 253, 0.3)" }}>TRAVEL</div>
                  <div className='Category-detail' onClick={toggleMenu}>
                    <div className='Category-detail-text-box'>
                      <div className='icon'></div>
                      <div className='Category-detail-text'>여행 게시판</div>
                    </div>
                    <div className='Category-detail-text-box'>
                      <div className='icon'></div>
                      <div className='Category-detail-text'>맛집</div>
                    </div>
                    <div className='Category-detail-text-box'>
                      <div className='icon'></div>
                      <div className='Category-detail-text'>카페</div>
                    </div>
                    <div className='Category-detail-text-box'>
                      <div className='icon'></div>
                      <div className='Category-detail-text'>숙박</div>
                    </div>
                    <div className='Category-detail-text-box'>
                      <div className='icon'></div>
                      <div className='Category-detail-text'>투표</div>
                    </div>
                  </div>
                  <div className="Category" style={{ borderBottom: "1px solid rgba(201, 224, 253, 0.3)" }}>FOOD</div>
                  <div className="Category">FASHION</div>
                  <div className='Category-detail'>
                    <div className='Category-detail-text-box'>
                      <div className='icon'></div>
                      <div className='Category-detail-text'>여행 게시판</div>
                    </div>
                    <div className='Category-detail-text-box'>
                      <div className='icon'></div>
                      <div className='Category-detail-text'>맛집</div>
                    </div>
                  </div>
                  <div className="Category" style={{ borderBottom: "1px solid rgba(201, 224, 253, 0.3)" }}>KEYWORD</div>
                  <div className="Category">HALL OF FAME</div>
                  <div className="signin-signup">
                    <div className='login-button'>로그인</div>
                    <div className='slice-line'style={{cursor:"default"}}>/</div>
                    <div className='signup-button'>회원가입</div>
                  </div>
                </div>
              </div>
            </div>
            </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}