import React, { ChangeEvent, useState } from 'react'
import './style.css';
import { useNavigate } from 'react-router-dom';
import { LOGIN_ABSOLUTE_PATH } from '../../../constants';
import PatchPwRequestDto from '../../../apis/dto/request/auth/patch-pw.request.dto';
import { usePatchPasswordZustand } from '../../../stores';
import { patchPasswordRequest } from '../../../apis';
import ResponseDto from '../../../apis/dto/response/response.dto';

// component: 비밀번호 재설정 화면 컴포넌트 //
export default function ChangePw() {

    // state: 비밀번호 재설정 관련 상태 //
    const [password, setPassword] = useState<string>('');
    const [passwordCheck, setPasswordCheck] = useState<string>('');
    const [isMatched, setIsMatched] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [isPossible, setIsPossible] = useState<boolean>(false);

    // state: zustand 상태 //
    const { userId, zusTelNumber, telAuthNumber, zusPassword,
        setUserId, setZusTelNumber, setTelAuthNumber, setZusPassword }
        = usePatchPasswordZustand();

    // event handler: 비밀번호 변경 이벤트 핸들러 //
    const onPasswordChangeHandler = (event : ChangeEvent<HTMLInputElement>) => {
        const {value} = event.target;
        setPassword(value);

        const pattern = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,13}$/;
        let isTrue = pattern.test(value);

        if(isTrue) {
            setIsPossible(true);
            setMessage('');
        }else {
            setIsPossible(false);
            setMessage('영문, 숫자를 혼용하여 8 ~ 13자 입력해주세요.');
        }
    }

    // event handler: 비밀번호 확인 변경 이벤트 핸들러 //
    const onPasswordCheckChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const {value} = event.target;
        setPasswordCheck(value);

        if(password === value) {
            setIsMatched(true);
            setErrorMessage('');
        }else {
            setIsMatched(false);
            setErrorMessage('비밀번호가 일치하지 않습니다.');
        }
    }

    // event handler: 엔터키로 비밀번호 변경 버튼 동작 //
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onChangeClickHandler();
        }
    }

    // event handler: 비밀번호 변경 버튼 클릭 이벤트 핸들러 //
    const onChangeClickHandler = () => {

        console.log(zusTelNumber);

        const requestBody: PatchPwRequestDto = { 
            userId, 
            telNumber: zusTelNumber, 
            telAuthNumber, 
            password
        };
        patchPasswordRequest(requestBody).then(patchPasswordResponse);
    }

    // function: navigator //
    const navigator = useNavigate();

    // function: 비밀번호 재설정 Response 처리 함수 //
    const patchPasswordResponse = (responseBody: ResponseDto | null) => {
        const message =
            !responseBody ? '서버에 문제가 있습니다.' :
            responseBody.code === 'VF' ? '올바른 데이터가 아닙니다.' :
            responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' : '';
        console.log(responseBody);

        const isSuccessed = responseBody !== null && responseBody.code === 'SU';

        if (!isSuccessed) {
            // setPasswordMessage(message);
            // setIsMatched1(isSuccessed);
            // if (responseBody !== null && responseBody.code === 'VF') {
            //     setNewPassword("");
            //     setPasswordCheck("");
            // }
            alert('다시 시도해주시기 바랍니다.');
            return;
        }

        alert('비밀번호가 변경되었습니다.');
        setUserId('');
        setZusTelNumber('');
        setTelAuthNumber('');
        navigator(LOGIN_ABSOLUTE_PATH);
    };
    
    // render: 비밀번호 재설정 화면 렌더링 //
    return (
        <div className="auth">
            <div className="pic"></div>

            <div id="ChangePW">
                <div className="title">비밀번호 재설정</div>

                <div className="box">
                    <div style={{display:"flex", flexDirection: "column", marginBottom:"10px"}}>
                        <input className="input-box" type='password' value={password} onChange={onPasswordChangeHandler} 
                            placeholder="새로운 비밀번호(영문 + 숫자 혼합 8 ~ 13자)"></input>
                        <div className={isPossible ? 'message-true' : 'message-false'}>{message}</div>
                    </div>
                    
                    <input className="input-box" type='password' value={passwordCheck} onKeyDown={handleKeyDown} 
                    onChange={onPasswordCheckChangeHandler} placeholder="비밀번호 확인"></input>
                    <div className={isMatched ? 'message-true' : 'message-false'}>{errorMessage}</div>
                </div>
                    
                <div className={isMatched && isPossible && passwordCheck ? "login-btn" : "login-btn-false"}
                onClick={isMatched ? onChangeClickHandler : undefined}>비밀번호 변경</div>
                
            </div>
        </div>
    )
}
