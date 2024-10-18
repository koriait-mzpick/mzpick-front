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
                <div className="closeButtoon">X</div>
                <div className="HOME">HOME</div>
                <div className="FOOD">FOOD</div>
                <div className="FASHION">FASHION</div>
                <div className="KEYWORD">KEYWORD</div>
                <div className="HALL OF FAME">HALL OF FAME</div>
                <div className="signIn-signUp">로그인/회원가입</div>
            </div>
        </div>
    );
}import { useState } from 'react';
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
                <div className="closeButtoon">X</div>
                <div className="HOME">HOME</div>
                <ul className="TRAVEL">TRAVEL
                </ul>
                <div className="FOOD">FOOD</div>
                <div className="FASHION">FASHION</div>
                <div className="KEYWORD">KEYWORD</div>
                <div className="HALL OF FAME">HALL OF FAME</div>
                <div className="signIn-signUp">로그인/회원가입</div>
            </div>
        </div>
    );
}