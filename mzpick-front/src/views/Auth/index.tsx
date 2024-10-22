import { ChangeEvent, useState } from 'react';
import { useCookies } from 'react-cookie';
import InputBox from '../../components/Inputbox';
import './style.css';


type AuthPath = '회원가입' | '로그인';

interface AuthComponentProps {
  onPathChange: (path: AuthPath) => void;
}
// component: 회원가입 화면 컴포넌트 //
function SignUp({ onPathChange }: AuthComponentProps) {

  // render: 회원가입 화면 컴포넌트 렌더링 //
  return (
    <div id='sign'>
      <div className="auth-box">
        <div className='title-box'>회원가입</div>
        <div className="input-container">
          <input placeholder='이름을 입력해주세요.' />
          <input placeholder='이름을 입력해주세요.' />
          <input placeholder='이름을 입력해주세요.' />
        </div>
        <div className="button-container">
          <div>회원가입</div>
        </div>
      </div>
    </div>
  )
}






interface AuthComponentProps {
  onPathChange: (path: AuthPath) => void;
}

// component: 로그인 화면 컴포넌트 //
function SignIn({ onPathChange }: AuthComponentProps) {

  // state: 쿠키 상태 //
  const [cookies, setCookie] = useCookies();

  // state: 로그인 입력 정보 상태 //
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // state: 로그인 입력 메세지 상태 //
  const [message, setMessage] = useState<string>('');

  // event handler: 아이디 변경 이벤트 처리 //
  const onIdChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setId(value);
  };

  // event handler: 비밀번호 변경 이벤트 처리 //
  const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPassword(value);
  };

  // // event handler: 로그인 버튼 클릭 이벤트 처리 //
  // const onSignInButtonHandler = () => {
  //     if (!id || !password) return;

  //     const requestBody: SignInRequestDto = {
  //         userId: id,
  //         password
  //     };
  //     signInRequest(requestBody).then(signInResponse);

  // };

  // render: 로그인 화면 컴포넌트 렌더링 //
  return (
    <div id='sign'>
      <div className="auth-box">
        <div className='title-box'>로그인</div>
        <div className="input-container">
          <InputBox value={id} onChange={onIdChangeHandler} message='' messageError type='text' placeholder='ID' />
          <InputBox value={password} onChange={onPasswordChangeHandler} message={message} messageError type='password' placeholder='Password' />
        </div>
        <div className="button-container">
          {/* <div className="button primary full-width" onClick={onSignInButtonHandler}>로그인</div> */}
          {/* <div className="link" onClick={() => onPathChange('회원가입')}>회원가입</div> */}
          <div className='button disable full-width'>로그인</div>
          <div className='link bold'>회원가입</div>
        </div>
        <div className='sns-container'>
          <div className='sns-button kakao'></div>
          <div className='sns-button naver'></div>
        </div>
      </div>
    </div>
  )
}

export default function Auth() {

  // state: 선택 화면 상태 //
  const [path, setPath] = useState<AuthPath>('로그인');

  // event handler: 화면 변경 이벤트 처리 //
  const onPathChangeHandler = (path: AuthPath) => {
    setPath(path);
  };

  return (
    <SignIn onPathChange={onPathChangeHandler} />
    // <SignUp onPathChange={onPathChangeHandler}/>
  )
}
