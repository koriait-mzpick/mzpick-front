import { ChangeEvent, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import InputBox from '../../components/Inputbox';
import './style.css';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { IdCheckRequestDto, SignInRequestDto, SignUpRequestDto, TelAuthCheckRequestDto, TelAuthRequestDto } from '../../apis/dto/request/auth';
import { ResponseDto } from '../../apis/dto/response';
import { idCheckRequest, signInRequest, signUpRequest, telAuthCheckRequest, telAuthRequest } from '../../apis';
import { SignInResponseDto } from '../../apis/dto/response/auth';
import AuthSignIn from './SignIn';
import AuthSignUp from './SignUp';
import SignIn from './SignIn';
import SignUp from './SignUp';


type AuthPath = '회원가입' | '로그인';

interface AuthComponentProps {
    onPathChange: (path: AuthPath) => void;
}

// component: 인증 화면 컴포넌트 //
export default function Auth({ onPathChange }: AuthComponentProps) {

    // state: Query Parameter 상태 //
    const [queryParam] = useSearchParams();
    const snsId = queryParam.get('snsId');
    const joinPath = queryParam.get('joinPath');

    // state: 선택 화면 상태 //
    const [path, setPath] = useState<AuthPath>('로그인');

    // event handler: 화면 변경 이벤트 처리 //
    const onPathChangeHandler = (path: AuthPath) => {
        setPath(path);
    };

    // effect: 첫 로드시에 Query Param의 snsId와 joinPath가 존재시 회원가입 화면전환 함수 //
    useEffect(() => {
        if (snsId && joinPath) setPath('회원가입');
    }, [snsId, joinPath]);


    // render: 인증 화면 컴포넌트 렌더링 //
    return (
        <div id='auth-wrapper'>
            {/* {path === '로그인' ?
            <AuthSignIn onPathChange={onPathChangeHandler}/> :
            <AuthSignUp onPathChange={onPathChangeHandler}/>
            } */}
        </div>
    );
}
