import React, { ChangeEvent } from 'react'
import './style.css';

interface Props {
    type: 'text' | 'password';
    placeholder: string;
    value: string;
    message: string;
    messageError: boolean;
    buttonName?: string;

    onChange: (event: ChangeEvent<HTMLInputElement>) => void;

    onButtonClick?: () => void;
}

export default function InputBox({ 
    type, 
    placeholder, 
    value,
    message,
    messageError, 
    buttonName, 
    onChange,
    onButtonClick,
}: Props) {


    return (
        <div className="input-box">
            <div className="input-area">
                <div className="input-text">
                    <input value={value} type={type} placeholder={placeholder} onChange={onChange}/>
                    <div className="shadow"></div>
                </div>

                {buttonName && <div className={`input-button ${value ? 'active' : 'disable'}`} onClick={onButtonClick}>{buttonName}</div>}
                {/* {buttonName && <div className={`input-button ${value ? 'active' : 'active'}`}>{buttonName}</div>} */}
            </div>
            
            <div className={`message ${messageError ? 'error' : 'primary'}`}>{message}</div>
            {/* <div className='message error'>로그인 정보가 일치하지 않습니다.</div> */}
        </div>
    )
}