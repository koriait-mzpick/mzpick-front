
export default function Auth() {
  return (
    <div>Auth</div>
  )
}

import { ChangeEvent, useState } from 'react';
import { useCookies } from 'react-cookie';
import InputBox from '../../components/Inputbox';
import './style.css';


type AuthPath = '회원가입' | '로그인';
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
  <div className="auth-box">
    <div className='title-box'>로그인</div>
    <div className="input-container">
              <InputBox value={id} onChange={onIdChangeHandler} message='' messageError type='text' placeholder='ID' />
              <InputBox value={password} onChange={onPasswordChangeHandler} message={message} messageError type='password' placeholder='Password' />
          </div>
          <div className="button-container">
              {/* <div className="button primary full-width" onClick={onSignInButtonHandler}>로그인</div> */}
              <div className="link" onClick={() => onPathChange('회원가입')}>회원가입</div>
          </div>
    <div className='sns-button-container'>
      <div className='kakao-button'></div>
      <div className='naver-button'></div>
    </div>

  </div>
  )
}

// export default function Auth() {
//   return (
//   <SignIn /> 
//   )
// }
