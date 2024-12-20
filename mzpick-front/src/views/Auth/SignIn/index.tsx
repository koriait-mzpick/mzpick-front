import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { ResponseDto } from "../../../apis/dto/response";
import InputBox from "../../../components/Inputbox";
import { ACCESS_TOKEN, ROOT_PATH, SIGN_UP_PATH } from "../../../constants";
import '../style.css';
import BottomNav from "../../../layouts/BottomNav";
import SnsContainer from "../Sns";
import { signInRequest } from "src/apis/auth/dto";
import { SignInRequestDto } from "src/apis/auth/dto/request";
import { SignInResponseDto } from "src/apis/auth/dto/response";

// component: 로그인 화면 컴포넌트 //
export default function SignIn() {

    // state: 쿠키 상태 //
    const [cookies, setCookie] = useCookies();

    // state: 로그인 입력 정보 상태 //
    const [id, setId] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    // state: 로그인 입력 메세지 상태 //
    const [message, setMessage] = useState<string>('');

    // function: 네비게이터 함수 //
    const navigator = useNavigate();

    // function: 로그인 Response 처리 함수 //
    const signInResponse = (responseBody: SignInResponseDto | ResponseDto | null) => {
        const message =
            !responseBody ? '서버에 문제가 있습니다.' :
            responseBody.code === "VF" ? '아이디와 비밀번호를 모두 입력하세요.' :
            responseBody.code === "SF" ? '로그인 정보가 일치하지 않습니다.' :
            responseBody.code === "TCF" ? '서버에 문제가 있습니다.' :
            responseBody.code === "DBE" ? '서버에 문제가 있습니다.' : ''

        const isSuccessed = responseBody !== null && responseBody.code === 'SU';
        if (!isSuccessed) {
            setMessage(message);
            return; }
            alert("로그인 완료");
        

        const { accessToken, expiration } = responseBody as SignInResponseDto;
        const expires = new Date(Date.now() + (expiration * 1000));
        setCookie(ACCESS_TOKEN, accessToken, { path: ROOT_PATH, expires });

        navigator(ROOT_PATH);
    };

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

    // event handler: 로그인 버튼 클릭 이벤트 처리 //
    const onSignInButtonHandler = () => {
        if (!id || !password) return;

        const requestBody: SignInRequestDto = {
            userId: id,
            password
        };
        signInRequest(requestBody).then(signInResponse);
    };

    // event handler: 회원가입 클릭 이벤트 처리 //
    const onSignUpClickHandler = (path: string) => {
        navigator(path);
    };

    // effect: 아이디 및 비밀번호 변경시 실행할 함수 //
    useEffect(() => {
        setMessage('');
    }, [id, password]);

    // event handler: 엔터키 누르면 로그인 키다운 이벤트 처리 //
    const signInKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onSignInButtonHandler();
        }
    };

    // render: 로그인 화면 컴포넌트 렌더링 //
    return (
        <div className='auth-container'>
            <div className="auth-box">
                <div className='title-box'>로그인</div>
                <div className="input-container bold" onKeyDown={signInKeyDownHandler} >
                    <InputBox value={id} onChange={onIdChangeHandler} message='' messageError type='text' placeholder='ID' />
                    <InputBox value={password} onChange={onPasswordChangeHandler} message={message} messageError type='password' placeholder='Password'  />
                </div>
                <div className="button-container">
                    <div className="button primary full-width" onClick={onSignInButtonHandler}>로그인</div>
                    <div className="link" onClick={() => onSignUpClickHandler(SIGN_UP_PATH)}>회원가입</div>
                </div>
                <SnsContainer />
                <BottomNav />
            </div>
        </div>
    )
}