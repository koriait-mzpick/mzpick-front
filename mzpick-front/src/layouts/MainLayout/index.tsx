import './style.css';

// component: 네비게이션 바 컴포넌트 //
export default function logo() {

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
