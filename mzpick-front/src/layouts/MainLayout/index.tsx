import './style.css';
import { useState } from 'react';

function SideBarMain() {

    const Header = () => {

        const [isOpen, setMenu] = useState(false);  // 메뉴의 초기값을 false로 설정

        const toggleMenu = () => {
            setMenu(isOpen => !isOpen); // on,off 개념 boolean
        }
    }

    // render: 우측 네이게이션 컴포넌트//
    return (
        <div id='main'>
            <div className="side-bar">
                <div className="close-icon"></div>
                <div className="Category ">HOME</div>
                <div className="Category" style={{borderBottom:"1px solid rgba(201, 224, 253, 0.3)"}}>TRAVEL</div>
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
                <div className="Category" style={{borderBottom:"1px solid rgba(201, 224, 253, 0.3)"}}>FOOD</div>
                <div className="Category">FASHION</div>
                <div className="Category" style={{borderBottom:"1px solid rgba(201, 224, 253, 0.3)"}}>KEYWORD</div>
                <div className="Category">HALL OF FAME</div>
                <div className="signin-signup">
                    <div className='login-button'>로그인</div>
                    <div className='slice-line'>/</div>
                    <div className='signup-button'>회원가입</div>
                </div>
            </div>
        </div>
    );
}



// component: 네비게이션 바 컴포넌트 //
function Logo() {

// render: 네비게이션 바 렌더링 //
  return (
    <div id='layout-logo'>
      <div className='box'>
        <div className='icon'></div>
        <div className='title'>MZPICK</div>
      </div>
      <div className='navi-box'>
      <div className='signin-signup'>
          <button className='login-button'>로그인</button>
          <div className='slice-line'>/</div>
          <button className='signup-button'>회원가입</button>
          </div>
      <div className='navi-icon'></div>
      </div>
    </div>
  );
}

export default function MainLayout() {

  return(
    <div id='main-layout'>
      <Logo />
      <SideBarMain />
    </div>
  );
}