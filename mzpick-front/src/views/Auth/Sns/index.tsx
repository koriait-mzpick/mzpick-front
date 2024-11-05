import React from 'react'
import '../style.css';

// component: SNS 로그인 회원가입 컴포넌트 //
export default function SnsContainer() {

    // event handler: SNS 버튼 클릭 이벤트 처리 //
    const onSnsButtonClickHandler = (sns: 'kakao' | 'naver') => {
        window.location.href = `http://localhost:4000/api/v1/auth/sns-sign-in/${sns}`;
    };

    // render: SNS 로그인 회원가입 컴포넌트 렌더링 //
    return (
        <div className="sns-container">
            <div className={`sns-button kakao`} onClick={() => onSnsButtonClickHandler('kakao')}></div>
            <div className={`sns-button naver`} onClick={() => onSnsButtonClickHandler('naver')}></div>
        </div>
    )
}
