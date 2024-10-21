import { useState } from 'react';
import './style.css';


// // component: 사이드바 상세 항목 //
// const ClickListEventHandler=()=>{
//   const [isOpen,setOpen] = useState(null);

//   const toggleListItem = (index: SetStateAction<null>) => {
//     setOpen(isOpen === index ? null : index);
//   };
// }

// component: 메인레이아웃 컴포넌트 //
export default function MainLayout() {

  // state: 사이드메뉴 상태 //
  const [sideBarOpen, setSideBarOpen] = useState(false);  // 메뉴의 초기값을 false로 설정

  const toggleMenu = () => {
    setSideBarOpen(!sideBarOpen); // on,off 개념 boolean
  }

  // state: 세부 카테고리 상태 //
  const [categoryOpen, setCategoryOpen] = useState(false);  // 메뉴의 초기값을 false로 설정

  const categoryMenu = () => {
    setCategoryOpen(!categoryOpen); // on,off 개념 boolean
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
            <div className='slice-line' style={{ cursor: "default" }}>/</div>
            <div className='signup-button'>회원가입</div>
            <div className='navi-icon' onClick={toggleMenu}></div>
            {!sideBarOpen &&
              <div>
                <div className='main'>
                  <div className="side-bar">
                    <div className="close-icon" onClick={toggleMenu}></div>
                    <div className="Category ">HOME</div>
                      <div className="Category" style={{ borderBottom: "1px solid rgba(201, 224, 253, 0.3)" }} onClick={categoryMenu}>TRAVEL</div>
                      {!categoryOpen &&
                      <div>
                      <div className='Category-detail'>
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
                      </div>
                      }
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
                      <div className='slice-line' style={{ cursor: "default" }}>/</div>
                      <div className='signup-button'>회원가입</div>
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div >
  );
}