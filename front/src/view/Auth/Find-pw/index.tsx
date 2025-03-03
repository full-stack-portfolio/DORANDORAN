import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import './style.css';
import { useNavigate } from "react-router-dom";
import { CHANGE_PW_ABSOLUTE_PATH } from "../../../constants";
import FindPwRequestDto from "../../../apis/dto/request/auth/find-pw.request.dto";
import { findPwRequest, telAuthCheckRequest } from "../../../apis";
import ResponseDto from "../../../apis/dto/response/response.dto";
import TelAuthCheckRequestDto from "../../../apis/dto/request/auth/tel-auth-check.request.dto";
import { usePatchPasswordZustand } from "../../../stores";

// component: 비밀번호 찾기 컴포넌트 //
export default function FindPw() {

    // state: 비밀번호 찾기 입력 정보 상태 //
    //const [userId, setUserId] = useState<string>('');
    //const [telNumber, setTelNumber] = useState<string>('');
    //const [authNumber, setAuthNumber] = useState<string>('');
    const [error, setErrorBool] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [authMessage, setAuthMessage] = useState<string>('');
    const [isMatched, setIsMatched] = useState<boolean>(false);
    
    // state: 타이머 상태 //
    const [timer, setTimer] = useState(180);
    
    // state: 타이머를 멈출 상태 추가
    const [stopTimer, setStopTimer] = useState(false);

    // state: 전화번호 인증 번호 전송 상태 //
    const [send, setSend] = useState<boolean>(true);

    // state: zustand 상태 //
    const { userId, zusTelNumber, telAuthNumber, zusPassword,
        setUserId, setZusTelNumber, setTelAuthNumber, setZusPassword }
        = usePatchPasswordZustand();

    // event handler: 아이디 변경 이벤트 핸들러 //
    const onUserIdChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const {value} = event.target;
        setUserId(value);
    }
    
    // event handler: 전화번호 변경 이벤트 핸들러 //
    const onTelNumberChangeHandler = (e: { target: { value: string } }) => {
        const numbersOnly = e.target.value.replace(/\D/g, "");
        if (numbersOnly.length <= 11) {
            setZusTelNumber(numbersOnly);
        }
    
            //setSend(false);
            //setTelMessage('');
    }
    
    // event handler: 엔터키로 전송 버튼 동작 //
    const handleKeyDown1 = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onSendClickHandler();
        }
    }
    
    // event handler: 전화번호 인증 메시지 전송 클릭 이벤트 핸들러 //
    const onSendClickHandler = () => {
        if (!userId || !zusTelNumber) return;

        const requestBody: FindPwRequestDto = { 
            userId, 
            telNumber: zusTelNumber 
        };
        findPwRequest(requestBody).then(passwordSearchResponse);
    
        //const pattern = /^[0-9]{11}$/;
        //const isMatched = pattern.test(telNumber);
        // const isTrue = userId === userId_exam && telNumber === telNumber_exam;
    
        // if(isTrue) {
        //     setMessage('인증번호가 전송되었습니다.');
        //     setErrorBool(true);
        //     setSend(true);
        //     setTimer(180);
        // } else {
        //     setMessage('일치하는 정보가 없습니다.');
        //     setErrorBool(false);
        // }
    }
    
    // event handler: 전화번호 인증번호 변경 이벤트 핸들러 //
    const authNumberChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const {value} = event.target;
        setTelAuthNumber(value);
    }
    
    // event handler: 엔터키로 전화번호 인증번호 확인 버튼 동작 //
    const handleKeyDown2 = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onCheckClickHandler();
        }
    }
    
    // event handler: 인증 번호 확인 버튼 클릭 이벤트 핸들러 //
    const onCheckClickHandler = () => {
        if (!telAuthNumber) {
            setTelAuthNumber('');
            return;
        }
    
        // if(authNumber === authNumber_exam) {
        //     setIsMatched(true);
        //     setStopTimer(true);
        //     setAuthMessage('인증번호가 일치합니다.');
        // } else {
        //     setIsMatched(false);
        //     setAuthMessage('인증번호가 일치하지 않습니다.');
        // }
    
        const requestBody: TelAuthCheckRequestDto = { 
            telNumber: zusTelNumber, 
            telAuthNumber
        };
        telAuthCheckRequest(requestBody).then(telAuthCheckResponse);
    }
    
    // event handler: 비밀번호 확인 버튼 클릭 이벤트 //
    const findPWResult = () => {
        navigator(CHANGE_PW_ABSOLUTE_PATH);
    }

    // function: 비밀번호 찾기 (userId + telNumber) Response 처리 함수 //
    const passwordSearchResponse = (responseBody: ResponseDto | null) => {
        const message =
            !responseBody ? '서버에 문제가 있습니다.' :
            responseBody.code === 'NF' ? '존재하지 않는 정보입니다.' :
            responseBody.code === 'TF' ? '전송에 실패했습니다.' :
            responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' :
            responseBody.code === 'SU' ? '인증번호를 전송하였습니다.' : '';
    
        const isSuccessed = responseBody !== null && responseBody.code === 'SU';
    
        setMessage(message);
        setSend(isSuccessed);
        if (isSuccessed) {
            setErrorBool(true);
            setTimer(180);
            //setIsMatched1(true);
        }
    
        //setIsUserIdCheck(isSuccessed);
        //setIsTelNumberCheck(isSuccessed);
    };

    // function: 전화번호 인증 확인 resonse 처리 함수 //
    const telAuthCheckResponse = (responseBody: ResponseDto | null) => {
        const message = 
            !responseBody ? '서버에 문제가 있습니다' : 
            responseBody.code === 'VF' ? '올바른 데이터가 아닙니다.' :
            responseBody.code === 'TAF' ? '인증번호가 일치하지 않습니다.' :
            responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' :
            responseBody.code === 'SU' ? '인증번호가 확인되었습니다.' : '';
    
        const isSuccessed = responseBody !== null && responseBody.code === 'SU';
        setAuthMessage(message);
        setIsMatched(isSuccessed);
        setStopTimer(true);
        //setAuthNumberMessageError(!isSuccessed);
        //setCheckedAuthNumber(isSuccessed);
    };

    // Function: 전화번호 '-'넣는 함수 //
    const displayFormattedPhoneNumber = (numbers: string) => {
        if (numbers.length <= 3) {
            return numbers;
        } else if (numbers.length <= 7) {
            return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
        } else {
            return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(
                7
            )}`;
        }
    };

    // Function: 타이머 //
    const formatTime = () => {
        const minutes = Math.floor(timer / 60);
        const seconds = timer % 60;
        return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    };

    // function: navigator //
    const navigator = useNavigate();

    // useRef로 interval을 관리
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    // Effect: 타이머 기능 구현 //
    useEffect(() => {
        if (error && !stopTimer) { // stopTimer가 false일 때만 타이머 시작
            intervalRef.current = setInterval(() => {
                setTimer((prevTimer) => {
                    if (prevTimer <= 1) {
                        clearInterval(intervalRef.current!);
                        setSend(false);
                        setErrorBool(false);
                        setMessage('');
                        return 0;
                    }
                    return prevTimer - 1;
                });
            }, 1000);
        }

        // stopTimer가 true가 되면 타이머를 멈추도록 추가
        if (stopTimer && intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [error, stopTimer]);

    // render: 비밀번호 찾기 화면 렌더링 //
    return (
        <div className="auth">
            <div className="pic"></div>

            <div id="findPW">
                <div className="title">비밀번호 찾기</div>

                <div className="box">
                    <input className="input-box" value={userId} onChange={onUserIdChangeHandler} placeholder="아이디"></input>

                    <div className="tel-box">
                        <input className="input-box2" onChange={onTelNumberChangeHandler} placeholder="전화번호(- 제외)" 
                            value={displayFormattedPhoneNumber(zusTelNumber)} onKeyDown={handleKeyDown1}></input>
                        <div className={(zusTelNumber.length === 11 && userId) ? "send-btn" : "send-btn-false"}
                            onClick={onSendClickHandler}>{send ? '전송' : '재전송'}</div>
                    </div>                    
                    <div className={error ? 'message-true' : 'message-false'}>{message}</div>

                    { error ? 
                        <>
                        <div className="tel-box2">
                            <input className="input-box2" onChange={authNumberChangeHandler} placeholder="인증번호 6자리" 
                            value={telAuthNumber} onKeyDown={handleKeyDown2} maxLength={6}></input>
                            <div className='timer'>{formatTime()}</div>
                            <div className={telAuthNumber.length === 6 ? "send-btn" : "send-btn-false"}
                            onClick={onCheckClickHandler}>확인</div>
                        </div>
                        <div className={isMatched ? "message-true" : "message-false"}>{authMessage}</div>
                        </>
                        
                    :
                        ''
                    }
                </div>
            
                <div className={error && isMatched ? "login-btn": "login-btn-false"}
                onClick={error && isMatched ? findPWResult : undefined}>비밀번호 재설정</div>
                
            </div>
        </div>
    )
}