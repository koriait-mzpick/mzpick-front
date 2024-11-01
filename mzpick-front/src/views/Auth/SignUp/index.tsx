import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import InputBox from "../../../components/Inputbox";
import '../style.css';
import { SIGN_IN_PATH } from "../../../constants";
import SnsContainer from "../Sns";
import BottomNav from "../../../layouts/BottomNav";
import { ResponseDto } from "../../../apis/dto/response";
import { idCheckRequest, signUpRequest, telAuthCheckRequest, telAuthRequest } from "src/apis/auth/dto";
import { IdCheckRequestDto, TelAuthRequestDto, TelAuthCheckRequestDto, SignUpRequestDto } from "src/apis/auth/dto/request";


// component: 회원가입 화면 컴포넌트 //
export default function SignUp() {

    // state: Query Parameter 상태 //
    const [qeuryParam] = useSearchParams();
    const snsId = qeuryParam.get('snsId');
    const joinPath = qeuryParam.get('joinPath');

    // state: 사용자 입력 정보 상태 //
    const [name, setName] = useState<string>('');
    const [id, setId] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordCheck, setPasswordCheck] = useState<string>('');
    const [telNumber, setTelNumber] = useState<string>('');
    const [authNumber, setAuthNumber] = useState<string>('');

    // state: 사용자 입력 메세지 상태 //
    const [nameMessage, setNameMessage] = useState<string>('');
    const [idMessage, setIdMessage] = useState<string>('');
    const [passwordMessage, setPasswordMessage] = useState<string>('');
    const [passwordCheckMessage, setPasswordCheckMessage] = useState<string>('');
    const [telNumberMessage, setTelNumberMessage] = useState<string>('');
    const [authNumberMessage, setAuthNumberMessage] = useState<string>('');

    // state: 사용자 정보 메세지 에러 상태 //
    const [nameMessageError, setNameMessageError] = useState<boolean>(false);
    const [idMessageError, setIdMessageError] = useState<boolean>(false);
    const [passwordMessageError, setPasswordMessageError] = useState<boolean>(false);
    const [passwordCheckMessageError, setPasswordCheckMessageError] = useState<boolean>(false);
    const [telNumberMessageError, setTelNumberMessageError] = useState<boolean>(false);
    const [authNumberMessageError, setAuthNumberMessageError] = useState<boolean>(false);

    // state: 입력값 검증 상태 //
    const [isCheckedId, setCheckedId] = useState<boolean>(false);
    const [isMatchedPassword, setMatchedPassword] = useState<boolean>(false);
    const [isCheckedPassword, setCheckedPassword] = useState<boolean>(false);
    const [isSend, setSend] = useState<boolean>(false);
    const [isCheckedAuthNumber, setCheckedAuthNumber] = useState<boolean>(false);

    // variable: SNS 회원가입 여부 //
    const isSnsSignUp = snsId !== null && joinPath !== null;

    // variable: 회원가입 가능 여부 //
    const isComplete = name && id && isCheckedId && password && passwordCheck && isMatchedPassword
        && isCheckedPassword && telNumber && isSend && authNumber && isCheckedAuthNumber;

    // function: 네비게이터 함수 //
    const navigator = useNavigate();

    // function: 아이디 중복 확인 Response 처리 함수 //
    const idCheckResponse = (responseBody: ResponseDto | null) => {

        const message =
            !responseBody ? '서버에 문제가 있습니다.' :
            responseBody.code === "VF" ? '올바른 데이터가 아닙니다.' :
            responseBody.code === "DI" ? '이미 사용중인 아이디입니다.' :
            responseBody.code === "DBE" ? '서버에 문제가 있습니다.' :
            responseBody.code === "SU" ? '사용 가능한 아이디입니다.' : ''

        const isSuccessed = responseBody !== null && responseBody.code === 'SU';
        setIdMessage(message);
        setIdMessageError(!isSuccessed);
        setCheckedId(isSuccessed);

    };

    // function: 전화번호 인증 Response 처리 함수 //
    const telAuthResponse = (responseBody: ResponseDto | null) => {

        const message =
            !responseBody ? '서버에 문제가 있습니다.' :
            responseBody.code === "VF" ? '숫자 11자 입력해주세요.' :
            responseBody.code === "DT" ? '중복된 전화번호입니다' :
            responseBody.code === "TF" ? '서버에 문제가 있습니다.' :
            responseBody.code === "DBE" ? '서버에 문제가 있습니다.' :
            responseBody.code === "SU" ? '인증번호가 전송되었습니다.' : ''

        const isSuccessed = responseBody !== null && responseBody.code === 'SU';
        setTelNumberMessage(message);
        setTelNumberMessageError(!isSuccessed);
        setSend(isSuccessed);

    };

    //function: 전화번호 인증 확인 Response 처리 함수 //
    const telAuthCheckResponse = (responseBody: ResponseDto | null) => {

        const message =
            !responseBody ? '서버에 문제가 있습니다.' :
            responseBody.code === "VF" ? '올바른 데이터가 아닙니다.' :
            responseBody.code === "TAF" ? '인증번호가 일치하지 않습니다.' :
            responseBody.code === "DBE" ? '서버에 문제가 있습니다.' :
            responseBody.code === "SU" ? '인증번호가 확인되었습니다.' : ''

        const isSuccessed = responseBody !== null && responseBody.code === 'SU';
        setAuthNumberMessage(message);
        setAuthNumberMessageError(!isSuccessed);
        setCheckedAuthNumber(isSuccessed);

    };

    // function: 회원가입 Response 처리 함수 //
    const signUpResponse = (responseBody: ResponseDto | null) => {

        const message =
            !responseBody ? '서버에 문제가 있습니다.' :
            responseBody.code === "VF" ? '올바른 데이터가 아닙니다.' :
            responseBody.code === "DI" ? '중복된 아이디입니다.' :
            responseBody.code === "DT" ? '중복된 전화번호입니다.' :
            responseBody.code === "TAF" ? '인증번호가 일치하지 않습니다.' :
            responseBody.code === "DBE" ? '서버에 문제가 있습니다.' : '';

        const isSuccessed = responseBody !== null && responseBody.code === 'SU';
        if (!isSuccessed) {
            alert(message);
            return;
        }

        navigator(SIGN_IN_PATH);

    };

    // event handler: 이름 변경 이벤트 처리 //
    const onNameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setName(value);
    };

    // event handler: 아이디 변경 이벤트 처리 //
    const onIdChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setId(value);
        setCheckedId(false);
        setIdMessage('');
    };

    // event handler: 비밀번호 변경 이벤트 처리 //
    const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setPassword(value);

        const pattern = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,13}$/
        const isMatched = pattern.test(value);

        const message = (isMatched || !value) ? '' : '영문, 숫자를 혼용하여 8 ~ 13자 입력해주세요.';
        setPasswordMessage(message);
        setPasswordMessageError(!isMatched);
        setMatchedPassword(isMatched);
    };

    // event handler: 비밀번호 변경 확인 이벤트 처리 //
    const onPasswordCheckChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setPasswordCheck(value);

    };

    // event handler: 전화번호 변경 이벤트 처리 //
    const onTelNumberChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setTelNumber(value);
        setSend(false);
        setTelNumberMessage('');

    };

    // event handler: 인증번호 변경 이벤트 처리 //
    const onAuthNumberChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setAuthNumber(value);
        setCheckedAuthNumber(false);
        setAuthNumberMessage('');
    };

    // event handler: 중복 확인 버튼 클릭 이벤트 처리 //
    const onIdCheckClickHandler = () => {
        if (!id) return;

        const requestBody: IdCheckRequestDto = {
            userId: id
        };
        idCheckRequest(requestBody).then(idCheckResponse);
    };

    // event handler: 전화번호 인증 버튼 클릭 이벤트 처리 //
    const onTelNumberSendClickHandler = () => {
        if (!telNumber) return;

        const pattern = /^(?=.*[0-9]).{11}$/
        const isMatched = pattern.test(telNumber);

        if (!isMatched) {
            setTelNumberMessage('숫자 11자 입력해주세요');
            setTelNumberMessageError(true);
            return;
        }

        const requestBody: TelAuthRequestDto = { telNumber };
        telAuthRequest(requestBody).then(telAuthResponse);
    };

    // event handler: 인증 확인 버튼 클릭 이벤트 처리 //
    const onAuthNumberCheckClickHandler = () => {
        if (!authNumber) return;

        const requestBody: TelAuthCheckRequestDto = {
            telNumber, authNumber
        }
        telAuthCheckRequest(requestBody).then(telAuthCheckResponse);
    };

    // event handler: 회원가입 버튼 클릭 이벤트 처리 //
    const onSignUpButtonHandler = () => {
        if (!isComplete) return;

        const requestBody: SignUpRequestDto = {
            name,
            userId: id,
            password,
            telNumber,
            authNumber,
            joinPath: joinPath ? joinPath : 'home',
            snsId
        };
        signUpRequest(requestBody).then(signUpResponse);
    };

    // effect: 비밀번호 및 비밀번호 확인 변경 시 실행할 함수 //
    useEffect(() => {
        if (!password || !passwordCheck) return;

        const isEqual = password === passwordCheck;
        const message = isEqual ? '' : '비밀번호가 일치하지 않습니다.';
        setPasswordCheckMessage(message);
        setPasswordCheckMessageError(!isEqual);
        setCheckedPassword(isEqual);
    }, [password, passwordCheck]);


    // render: 회원가입 화면 컴포넌트 렌더링 //
    return (
        <div className='auth-container'>
            <div className="auth-box">
                <div className='title-box'>회원가입</div>

                <div className="input-container">
                    <InputBox messageError={nameMessageError} message={nameMessage} value={name} type='text' placeholder='이름을 입력해주세요.' onChange={onNameChangeHandler} />
                    <InputBox messageError={idMessageError} message={idMessage} value={id} type='text' placeholder='아이디를 입력해주세요.' buttonName='중복 확인' onChange={onIdChangeHandler} onButtonClick={onIdCheckClickHandler} />
                    <InputBox messageError={passwordMessageError} message={passwordMessage} value={password} type='password' placeholder='비밀번호를 입력해주세요.' onChange={onPasswordChangeHandler} />
                    <InputBox messageError={passwordCheckMessageError} message={passwordCheckMessage} value={passwordCheck} type='password' placeholder='비밀번호 중복확인' onChange={onPasswordCheckChangeHandler} />
                    <InputBox messageError={telNumberMessageError} message={telNumberMessage} value={telNumber} type='text' placeholder='전화번호를 입력해주세요.' buttonName='인증번호 요청' onChange={onTelNumberChangeHandler} onButtonClick={onTelNumberSendClickHandler} />
                    <InputBox messageError={authNumberMessageError} message={authNumberMessage} value={authNumber} type='text' placeholder='인증번호를 입력해주세요.' buttonName='인증번호 확인' onChange={onAuthNumberChangeHandler} onButtonClick={onAuthNumberCheckClickHandler} />
                </div>
                <div className="button-container">
                    <div className={`button ${isComplete ? 'primary' : 'disable'} full-width`} onClick={onSignUpButtonHandler}>회원가입</div>
                </div>
                <SnsContainer />
                <BottomNav />
            </div>
        </div>
    )
}
