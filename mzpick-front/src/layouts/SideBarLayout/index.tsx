import { useState } from 'react';
import './style.css';

export default function SideBarMain() {

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
                <div className="Category darkLine">TRAVEL</div>
                <div className='Travel-detail'>
                    <div className='Travel-detail-text-box'>
                        <div className='icon'>1</div>
                        <div className='Travel-detail-text'>여행 게시판</div>
                    </div>
                    <div className='Travel-detail-text-box'>
                        <div className='icon'>2</div>
                        <div className='Travel-detail-text'>맛집</div>
                    </div>
                    <div className='Travel-detail-text-box'>
                        <div className='icon'>3</div>
                        <div className='Travel-detail-text'>카페</div>
                    </div>
                    <div className='Travel-detail-text-box'>
                        <div className='icon'>4</div>
                        <div className='Travel-detail-text'>숙박</div>
                    </div>
                    <div className='Travel-detail-text-box'>
                        <div className='icon'>10</div>
                        <div className='Travel-detail-text'>투표</div>
                    </div>
                </div>
                <div className="Category darkLine">FOOD</div>
                <div className="Category">FASHION</div>
                <div className="Category darkLine">KEYWORD</div>
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