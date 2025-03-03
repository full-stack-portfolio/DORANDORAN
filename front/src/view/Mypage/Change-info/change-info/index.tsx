import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import './style.css'
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN, MY_ABSOLUTE_PATH, ROOT_ABSOLUTE_PATH } from '../../../../constants';
import { useSignInUserStore } from '../../../../stores';
import { useCookies } from 'react-cookie';
import { changePwRequest, deleteUserRequest, getUserInfoRequest, patchUserInfoRequest, telAuthCheckRequest, telAuthRequest } from '../../../../apis';
import GetUserInfoResponseDto from '../../../../apis/dto/response/mypage/myInfo/get-user-info.response.dto';
import ResponseDto from '../../../../apis/dto/response/response.dto';
import PatchUserInfoRequestDto from '../../../../apis/dto/request/mypage/myInfo/patch-user-info.request.dto';
import TelAuthRequestDto from '../../../../apis/dto/request/auth/tel-auth.request.dto';
import TelAuthCheckRequestDto from '../../../../apis/dto/request/auth/tel-auth-check.request.dto';
import ChangePwRequestDto from '../../../../apis/dto/request/mypage/myInfo/change-pw.request.dto';
import MypageSidebar from '../../../../components/mypage/sidebar';

// component: 개인정보 수정 화면 컴포넌트 //
export default function ChangeInfo() {

    // state: 로그인 유저 정보 상태 //
    const { signInUser, setSignInUser } = useSignInUserStore();

    // state: 쿠키 상태 //
    const [cookies, setCookie, removeCookie] = useCookies();

    // state: 회원가입 관련 상태 //
    const [name, setName] = useState<string>('');
    const [birth, setBirth] = useState<string>('');
    const [birthMessage, setBirthMessage] = useState<string>('');
    const [birthMsgBool, setBirthMsgBool] = useState<boolean>(false);
    const [telNumber, setTelNumber] = useState<string>('');
    const [authNumber, setAuthNumber] = useState<string>('');
    const [error, setErrorBool] = useState<boolean>(false);
    const [telNumberMessage, setTelNumberMessage] = useState<string>('');
    const [authMessage, setAuthMessage] = useState<string>('');
    const [send, setSend] = useState<boolean>(true);
    const [isMatched, setIsMatched] = useState<boolean>(false);

    // state: 타이머 상태 //
    const [timer, setTimer] = useState(5);

    // state: 타이머를 멈출 상태 추가
    const [stopTimer, setStopTimer] = useState(false);

    // state: 비밀번호 변경 모달창 상태 //
    const [modalOpen, setModalOpen] = useState(false);

    // variable: access token //
    const accessToken = cookies[ACCESS_TOKEN];

    // event handler: 이름 변경 이벤트 핸들러 //
    const onNameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setName(value);
    }

    // event handler: 생년월일 변경 이벤트 핸들러 //
    const onBirthChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setBirth(value);

        if (value.length === 8) {
            const year = parseInt(value.substring(0, 4), 10);
            const month = parseInt(value.substring(4, 6), 10) - 1; // 월은 0부터 시작
            const day = parseInt(value.substring(6, 8), 10);

            const inputDate = new Date(year, month, day);
            const today = new Date();
            today.setHours(0, 0, 0, 0); // 오늘의 시간 초기화

            if (inputDate > today) {
                setBirthMessage('일치하지 않는 형식입니다.');
                setBirthMsgBool(false);
            } else {
                setBirthMessage('');
                setBirthMsgBool(true);
            }

        } else if (value.length === 0) {
            setBirthMessage('');
            setBirthMsgBool(false);
        } else {
            setBirthMessage('일치하지 않는 형식입니다.');
            setBirthMsgBool(false);
        }
    }

    // event handler: 전화번호 변경 이벤트 핸들러 //
    const onTelNumberChangeHandler = (e: { target: { value: string } }) => {
        const numbersOnly = e.target.value.replace(/\D/g, "");
        if (numbersOnly.length <= 11) setTelNumber(numbersOnly);
    }

    // event handler: 엔터키로 인증번호 전송 버튼 동작 //
    const handleKeyDown2 = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') onSendClickHandler();
    }

    // event handler: 전화번호 인증 메시지 전송 클릭 이벤트 핸들러 //
    const onSendClickHandler = () => {
        if (!telNumber) return;

        const requestBody: TelAuthRequestDto = { telNumber };
        telAuthRequest(requestBody).then(telAuthResponse);
    }

    // event handler: 전화번호 인증번호 변경 이벤트 핸들러 //
    const authNumberChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setAuthNumber(value);
    }

    // event handler: 엔터키로 전화번호 인증번호 확인 버튼 동작 //
    const handleKeyDown3 = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') onCheckClickHandler();
    }

    // event handler: 인증 번호 확인 버튼 클릭 이벤트 핸들러 //
    const onCheckClickHandler = () => {
        if (!authNumber) return;

        const requestBody: TelAuthCheckRequestDto = { telNumber, telAuthNumber: authNumber };
        telAuthCheckRequest(requestBody).then(telAuthCheckResponse);
    }

    // event handler: 비밀번호 변경 버튼 클릭 이벤트 핸들러 //
    const onChangePwBtnClickHandler = () => {
        setModalOpen(true);
    }

    // event handler: 수정 버튼 클릭 이벤트 핸들러 //
    const onUpdateClickHandler = () => {
        if (!name || !birth || !telNumber || !accessToken) return;

        // 전화번호를 변경할 시
        if (error && isMatched) {
            if (!name || !birth || !telNumber || !accessToken || !authNumber) return;
        }

        // 전화번호를 변경하지 않을 시
        const requestBody: PatchUserInfoRequestDto = {
            name,
            telNumber,
            birth
        };

        console.log(requestBody);
        patchUserInfoRequest(requestBody, accessToken).then(patchUserInfoResponse);
    }

    // event handler: 취소 버튼 클릭 이벤트 핸들러 //
    const onCancleClickHandler = () => {
        navigator(MY_ABSOLUTE_PATH);
    }

    // event handler: 탈퇴 버튼 클릭 이벤트 핸들러 //
    const onSecesstionClickHandler = () => {
        const isConfirm = window.confirm('정말로 탈퇴하시겠습니까?');
        if (!isConfirm) return;
        deleteUserRequest(accessToken).then(deleteUserResponse);
    }

    // function: navigator //
    const navigator = useNavigate();

    // Function: 전화번호 '-'넣는 함수 //
    const displayFormattedPhoneNumber = (numbers: string) => {
        if (numbers.length <= 3) {
            return numbers;
        } else if (numbers.length <= 7) {
            return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
        } else {
            return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7)}`;
        }
    };

    // Function: 타이머 //
    const formatTime = () => {
        const minutes = Math.floor(timer / 60);
        const seconds = timer % 60;
        return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    };

    // function: 개인 정보 get Response 처리 함수 //
    const getUserInfoResponse = (responseBody: GetUserInfoResponseDto | ResponseDto | null) => {

        const message =
            !responseBody ? '서버에 문제가 있습니다.' :
                responseBody.code === 'VF' ? '일치하는 정보가 없습니다.' :
                    responseBody.code === 'AF' ? '일치하는 정보가 없습니다.' :
                        responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' :
                            responseBody.code === 'NI' ? '존재하지 않는 사용자입니다.' :
                                responseBody.code === 'MP' ? '비밀번호가 일치하지 않습니다.' : '';

        const isSuccessed = responseBody !== null && responseBody.code === 'SU';

        if (!isSuccessed) {
            alert(message);
            return;
        } else {
            const { birth } = responseBody as GetUserInfoResponseDto;
            setBirth(birth);
        }
    };

    // function: 전화번호 인증 response 처리 함수 //
    const telAuthResponse = (responseBody: ResponseDto | null) => {
        const message =
            !responseBody ? '서버에 문제가 있습니다.' :
                responseBody.code === 'VF' ? '숫자 11자 입력해주세요.' :
                    responseBody.code === 'DT' ? '중복된 전화번호입니다.' :
                        responseBody.code === 'TF' ? '서버에 문제가 있습니다.' :
                            responseBody.code === 'DBE' ? '서버에 문제가 있습니다' :
                                responseBody.code === 'SU' ? '인증번호가 전송되었습니다.' : '';

        const isSuccessed = responseBody !== null && responseBody.code === 'SU';
        setTelNumberMessage(message);
        if (isSuccessed) {
            setErrorBool(true);
            setTimer(180);
        }
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
    };

    // function: 회원 정보 수정 Response 처리 함수 //
    const patchUserInfoResponse = (responseBody: ResponseDto | null) => {

        const message =
            !responseBody ? '서버에 문제가 있습니다.' :
                responseBody.code === 'VF' ? '일치하는 정보가 없습니다.' :
                    responseBody.code === 'AF' ? '일치하는 정보가 없습니다.' :
                        responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' :
                            responseBody.code === 'NI' ? '존재하지 않는 사용자입니다.' :
                                responseBody.code === 'MP' ? '비밀번호가 일치하지 않습니다.' : '';

        const isSuccessed = responseBody !== null && responseBody.code === 'SU';

        if (!isSuccessed) {
            alert(message);
            return;
        } else {
            alert('수정이 완료되었습니다.');
            navigator(MY_ABSOLUTE_PATH);
        }
    };

    // function: 회원 탈퇴 Response 처리 함수 //
    const deleteUserResponse = (responseBody: ResponseDto | null) => {

        const message =
            !responseBody ? '서버에 문제가 있습니다.' :
                responseBody.code === 'VF' ? '일치하는 정보가 없습니다.' :
                    responseBody.code === 'AF' ? '일치하는 정보가 없습니다.' :
                        responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' :
                            responseBody.code === 'NI' ? '존재하지 않는 사용자입니다.' :
                                responseBody.code === 'MP' ? '비밀번호가 일치하지 않습니다.' : '';

        const isSuccessed = responseBody !== null && responseBody.code === 'SU';

        if (!isSuccessed) {
            alert(message);
            return;
        } else {
            alert('탈퇴가 완료되었습니다.');
            removeCookie(ACCESS_TOKEN, { path: ROOT_ABSOLUTE_PATH });
            navigator(ROOT_ABSOLUTE_PATH);
        }
    };

    // effect: 회원 정보 받기 //
    useEffect(() => {
        const accessToken = cookies[ACCESS_TOKEN];
        if (!accessToken || !signInUser) {
            return;
        }

        //getNewInfo(accessToken, signInUser.userId).then(getNewInfoResponse);
    }, [signInUser]);

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

    // effect: 유저 정보 가져오기 //
    useEffect(() => {
        if (signInUser) {
            getUserInfoRequest(signInUser.userId, accessToken).then(getUserInfoResponse);
            setName(signInUser.name);
            setTelNumber(signInUser.telNumber);
        } else return;

    }, [signInUser]);

    // component: 비밀번호 변경 모달창 //
    function ChangePassword() {

        // state: 비밀번호 관련 상태 //
        const [password, setPassword] = useState<string>('');
        const [passwordCheck, setPasswordCheck] = useState<string>('');
        const [pwIsMatched, setPwIsMatched] = useState<boolean>(false);
        const [isPossible, setIsPossible] = useState<boolean>(false);
        const [message, setMessage] = useState<string>('');
        const [errorMessage, setErrorMessage] = useState<string>('');

        // state: 모달 관련 상태 //
        const modalBackground = useRef<HTMLDivElement | null>(null);

        // event handler: 비밀번호 변경 이벤트 핸들러 //
        const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
            const { value } = event.target;
            setPassword(value);
            //console.log(value);

            const pattern = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,13}$/;
            let isTrue = pattern.test(value);

            if (isTrue) {
                setIsPossible(true);
                setMessage('');
            } else {
                setIsPossible(false);
                setMessage('영문, 숫자를 혼용하여 8 ~ 13자 입력해주세요.');
            }
        }

        // event handler: 비밀번호 확인 변경 이벤트 핸들러 //
        const onPasswordCheckChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
            const { value } = event.target;
            setPasswordCheck(value);

            if (password === value) {
                setPwIsMatched(true);
                setErrorMessage('');
            } else {
                setPwIsMatched(false);
                setErrorMessage('비밀번호가 일치하지 않습니다.');
            }
        }

        // event handler: 수정 버튼 클릭 이벤트 핸들러 //
        const onChangeClikeHandler = () => {
            if (!password || !passwordCheck || !accessToken) return;

            const requestBody: ChangePwRequestDto = {
                password
            };
            changePwRequest(requestBody, accessToken).then(changePwResponse);
        }

        // event handler: 취소 버튼 클릭 이벤트 핸들러 //
        const onCancleClikeHandler = () => {
            setModalOpen(false);
        }

        // function: 비밀번호 변경 응답 처리 //
        const changePwResponse = (responseBody: ResponseDto | null) => {
            const message =
                !responseBody ? '서버에 문제가 있습니다.' :
                    responseBody.code === 'VF' ? '일치하는 정보가 없습니다.' :
                        responseBody.code === 'AF' ? '일치하는 정보가 없습니다.' :
                            responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' :
                                responseBody.code === 'NI' ? '존재하지 않는 사용자입니다.' :
                                    responseBody.code === 'MP' ? '비밀번호가 일치하지 않습니다.' : '';

            const isSuccessed = responseBody !== null && responseBody.code === 'SU';

            if (!isSuccessed) {
                alert(message);
                return;
            } else {
                alert('수정되었습니다.');
                setModalOpen(false);
            }
        };

        // effect: 모달 오픈 상태 //
        useEffect(() => {
            console.log("modalOpen 상태:", modalOpen);
        }, [modalOpen]);


        // render: 비밀번호 변경 모달창 렌더링 //
        return (
            <div id='modal'>
                {modalOpen &&
                    <>
                        <div className="modal-overlay" onClick={() => setModalOpen(false)}></div>
                        <div>
                            <div className='modal-container' ref={modalBackground} onClick={e => {
                                if (e.target === modalBackground.current) { setModalOpen(false); }
                            }}>
                                <div className='modal-title'>비밀번호 변경</div>
                                <div>
                                    <input className="input-box3" type='password' value={password} onChange={onPasswordChangeHandler}
                                        placeholder="비밀번호(영문 + 숫자 혼합 8 ~ 13자)" />
                                    <div className={isPossible ? 'message-true' : 'message-false'} style={{ marginBottom: "15px" }}>{message}</div>

                                    <input className="input-box3" type='password' value={passwordCheck}
                                        onChange={onPasswordCheckChangeHandler} placeholder="비밀번호 확인" />
                                    <div className={pwIsMatched ? 'message-true' : 'message-false'}>{errorMessage}</div>
                                </div>

                                <div className='modal-btn-container'>
                                    <div className='modal-patch' onClick={onChangeClikeHandler}>수정</div>
                                    <div className='modal-cancle' onClick={onCancleClikeHandler}>취소</div>
                                </div>
                            </div>
                        </div>
                    </>
                }
            </div>
        );
    }

    // render: 개인 정보 수정 화면 렌더링
    return (
        <div id='change-info'>
            <MypageSidebar />

            <div className='background'>
                <div className='title'>개인정보 수정</div>
                <div style={{ display: "flex", flexDirection: "column", marginBottom: "60px" }}>
                    <input className="input-box" value={name} onChange={onNameChangeHandler} placeholder="이름"></input>

                    <input className="input-box3" value={birth} onChange={onBirthChangeHandler} placeholder="생년월일(YYYYMMDD)"
                        maxLength={8} style={{ marginTop: "15px" }}></input>
                    {birthMsgBool ? '' : <div className="message-false">{birthMessage}</div>}

                    <div className="tel-box" style={{ marginTop: "15px" }}>
                        <input className="input-box2" onChange={onTelNumberChangeHandler} placeholder="전화번호(- 제외)"
                            value={displayFormattedPhoneNumber(telNumber)} onKeyDown={handleKeyDown2}></input>
                        <div className={telNumber.length === 11 ? "send-btn" : "send-btn-false"}
                            onClick={telNumber.length === 11 ? onSendClickHandler : undefined}>{send ? '전송' : '재전송'}</div>
                    </div>
                    <div className={error ? "message-true" : "message-false"}>{telNumberMessage}</div>

                    {error ?
                        <>
                            <div className="tel-box2" style={{ marginTop: "15px" }}>
                                <input className="input-box2" onChange={authNumberChangeHandler} placeholder="인증번호 6자리"
                                    value={authNumber} onKeyDown={handleKeyDown3} maxLength={6}></input>
                                <div className='timer'>{formatTime()}</div>
                                <div className={authNumber.length === 6 ? "send-btn" : "send-btn-false"}
                                    onClick={authNumber.length === 6 ? onCheckClickHandler : undefined}>확인</div>
                            </div>
                            <div className={isMatched ? "message-true" : "message-false"}>{authMessage}</div>
                        </>
                        : ''}

                    <div className='changePWbtn' onClick={onChangePwBtnClickHandler}>비밀번호 변경</div>
                    {modalOpen && <ChangePassword />}

                    <div style={{ display: "flex", flexDirection: "row", marginTop: "60px" }}>
                        <div className='secession-btn' onClick={onSecesstionClickHandler}>탈퇴</div>
                        <div className='btn-box'>
                            <div className='update-btn' onClick={onUpdateClickHandler}>수정</div>
                            <div className='cancle-btn' onClick={onCancleClickHandler}>취소</div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
