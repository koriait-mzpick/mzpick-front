import React, { ChangeEvent, KeyboardEvent } from 'react'
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
    onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
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
    onKeyDown,
    
}: Props) {

    return (
        <div className="input-box">
            <div className="input-area">
                <div className="input-text" >
                    <input value={value} type={type} placeholder={placeholder} onChange={onChange} />
                    <div className="shadow"></div>
                </div>
                {buttonName && <div className={`input-button ${value ? 'active' : 'disable'}`} onClick={onButtonClick}>{buttonName}</div>}
            </div>     
            <div className={`message ${messageError ? 'error' : 'primary'}`}>{message}</div>
        </div>
    )
}


