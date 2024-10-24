import React from 'react'

type AuthPath = '회원가입' | '로그인';

interface SnsContainer {
    type: AuthPath;
}

// component: SNS 로그인 회원가입 컴포넌트 //
function SnsContainer({ type }: SnsContainer) {

    // event handler: SNS 버튼 클릭 이벤트 처리 //
    const onSnsButtonClickHandler = (sns: 'kakao' | 'naver') => {
        window.location.href = `http://localhost:4000/api/v1/auth/sns-sign-in/${sns}`;
    };

    // render: SNS 로그인 회원가입 컴포넌트 렌더링 //
    return (
        <div className="sns-container">
            <div className="title">SNS {type}</div>
            <div className="sns-button-container">
                <div className={`sns-button ${type === '회원가입' ? 'md ' : ''}kakao`} onClick={() => onSnsButtonClickHandler('kakao')}></div>
                <div className={`sns-button ${type === '회원가입' ? 'md ' : ''}naver`} onClick={() => onSnsButtonClickHandler('naver')}></div>
            </div>
        </div>
    )
}

export default function index() {
    return (
      <div>index</div>
    )
  }
