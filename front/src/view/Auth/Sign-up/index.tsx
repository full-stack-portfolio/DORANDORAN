import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import './style.css';
import { useNavigate } from "react-router-dom";
import { LOGIN_ABSOLUTE_PATH } from "../../../constants";
import IdCheckRequestDto from "../../../apis/dto/request/auth/id-check.request.dto";
import { idCheckRequest, signUpRequest, telAuthCheckRequest, telAuthRequest } from "../../../apis";
import ResponseDto from "../../../apis/dto/response/response.dto";
import TelAuthRequestDto from "../../../apis/dto/request/auth/tel-auth.request.dto";
import TelAuthCheckRequestDto from "../../../apis/dto/request/auth/tel-auth-check.request.dto";
import SignUpRequestDto from "../../../apis/dto/request/auth/sign-up.request.dto";

// component: 회원가입 컴포넌트 //
export default function SignUp() {

    // state: 회원가입 관련 상태 //
    const [name, setName] = useState<string>('');
    const [userId, setUserId] = useState<string>('');
    const [idErr, setIdErr] = useState<boolean>(false);
    const [idErrMsg, setIdErrMsg] = useState<string>('');

    const [password, setPassword] = useState<string>('');
    const [passwordCheck, setPasswordCheck] = useState<string>('');

    const [birth, setBirth] = useState<string>('');
    const [birthMessage, setBirthMessage] = useState<string>('');
    const [birthMsgBool, setBirthMsgBool] = useState<boolean>(false);

    const [telNumber, setTelNumber] = useState<string>('');
    const [authNumber, setAuthNumber] = useState<string>('');
    const [error, setErrorBool] = useState<boolean>(false);
    const [authMessage, setAuthMessage] = useState<string>('');
    const [telNumberMessage, setTelNumberMessage] = useState<string>('');

    const [isMatched, setIsMatched] = useState<boolean>(false); // 전화번호 인증번호
    const [isMatched2, setIsMatched2] = useState<boolean>(false); // 비밀번호 확인
    const [pwError, setPwError] = useState<string>('');
    const [pwSameError, setSamePwErr] = useState<string>('');
    const [send, setSend] = useState<boolean>(true);

    // state: 타이머 상태 //
    const [timer, setTimer] = useState(5);

    // state: 타이머를 멈출 상태 추가
    const [stopTimer, setStopTimer] = useState(false);

    // state: 전체 동의와 개별 동의 항목 상태 //
    const [allChecked, setAllChecked] = useState(false);
    const [terms, setTerms] = useState({
        service: false,
        privacy: false,
        age: false
    });
    const [showServiceTerms, setShowServiceTerms] = useState(false);
    const [showPrivacyTerms, setShowPrivacyTerms] = useState(false);

    // variable: 회원가입 가능 여부 //
    const signUp = name && idErr && isMatched && birthMsgBool && isMatched2 && allChecked;

    // event handler: SNS 버튼 클릭 시 SNS 로그인 창으로 이동 //
	const onSnsButtonClickHandler = (sns: 'kakao' | 'naver' | 'google') => {
		window.location.href = `${process.env.REACT_APP_API_URL}/api/v1/auth/sns-sign-in/${sns}`;
	};

    // event handler: 이름 변경 이벤트 핸들러 //
    const onNameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setName(value);
    }

    // event handler: 아이디 변경 이벤트 핸들러 //
    const onUserIdChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setUserId(value);

        if(value.length === 0) {
            setIdErrMsg('');
        }
    }

    // event handler: 엔터키로 아이디 중복 확인 버튼 동작 //
    const handleKeyDown1 = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            duplicatedCheck();
        }
    }

    // event handler: 아이디 중복 확인 버튼 클릭 이벤트 핸들러 //
    const duplicatedCheck = () => {
        if(!userId) return;

        const requestBody: IdCheckRequestDto = {
            userId
        };
        idCheckRequest(requestBody).then(idCheckResponse);
    }

    // event handler: 비밀번호 변경 이벤트 핸들러 //
    const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setPassword(value);

        const pattern = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,13}$/;
        let isTrue = pattern.test(value);
        if (isTrue) {
            setPwError('');
        } else {
            setPwError('영문, 숫자를 혼용하여 8 ~ 13자 입력해주세요.');
        }
    }

    // event handler: 비밀번호 확인 변경 이벤트 핸들러 //
    const onPasswordCheckChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setPasswordCheck(value);

        if (password === value) {
            setIsMatched2(true);
            setSamePwErr('');
        } else {
            setIsMatched2(false);
            setSamePwErr('비밀번호가 일치하지 않습니다.');
        }
    }

    // event handler: 전화번호 변경 이벤트 핸들러 //
    const onTelNumberChangeHandler = (e: { target: { value: string } }) => {
        const numbersOnly = e.target.value.replace(/\D/g, "");
        if (numbersOnly.length <= 11) {
            setTelNumber(numbersOnly);
        }

        //setSend(false);
        //setTelMessage('');
    }

    // event handler: 엔터키로 인증번호 전송 버튼 동작 //
    const handleKeyDown2 = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onSendClickHandler();
        }
    }

    // event handler: 전화번호 인증 메시지 전송 클릭 이벤트 핸들러 //
    const onSendClickHandler = () => {
        if(!telNumber) return;

        const requestBody: TelAuthRequestDto = {telNumber};
        telAuthRequest(requestBody).then(telAuthResponse); 
    }

    // event handler: 전화번호 인증번호 변경 이벤트 핸들러 //
    const authNumberChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setAuthNumber(value);
    }

    // event handler: 엔터키로 전화번호 인증번호 확인 버튼 동작 //
    const handleKeyDown3 = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onCheckClickHandler();
        }
    }

    // event handler: 인증 번호 확인 버튼 클릭 이벤트 핸들러 //
    const onCheckClickHandler = () => {
        if (!authNumber) return;

        const requestBody: TelAuthCheckRequestDto = { telNumber, telAuthNumber:authNumber };
        telAuthCheckRequest(requestBody).then(telAuthCheckResponse);
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
    
            // 만 14세 이상인지 확인
            const fourteenYearsAgo = new Date();
            fourteenYearsAgo.setFullYear(today.getFullYear() - 14); // 현재 날짜에서 14년 전 날짜
    
            if (inputDate > today) {
                setBirthMessage('일치하지 않는 형식입니다.');
                setBirthMsgBool(false);
            } else if (inputDate > fourteenYearsAgo) {
                setBirthMessage('만 14세 이상만 가입할 수 있습니다.');
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

    // event handler: 전체 동의 핸들러 //
    const handleAllChecked = (e: ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;
        setAllChecked(checked);
        setTerms({
            service: checked,
            privacy: checked,
            age: checked
        });
    };

    // event handler: 개별 동의 핸들러 //
    const handleTermChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setTerms((prevTerms) => ({
            ...prevTerms,
            [name]: checked,
        }));

        // 개별 체크박스의 상태에 따라 전체 동의 상태 업데이트
        setAllChecked(checked && Object.values({ ...terms, [name]: checked }).every(Boolean));
    };

    // event handler: 이용 약관 펼치기/접기 핸들러 //
    const toggleServiceTerms1 = () => {
        setShowServiceTerms(!showServiceTerms);
    };

    // event handler: 이용 약관 펼치기/접기 핸들러 //
    const toggleServiceTerms2 = () => {
        setShowPrivacyTerms(!showPrivacyTerms);
    };

    // event handler: 회원가입 버튼 클릭 이벤트 핸들러 //
    const onSignUpClickHandler = async() => {

        if(!signUp) return;
        
        const requestBody: SignUpRequestDto = {
            name,
            userId,
            password,
            telNumber,
            telAuthNumber: authNumber,
            joinPath: 'home',
            snsId: null,
            birth
        }
        signUpRequest(requestBody).then(signUpResponse);
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

    // function: 아이디 중복 확인 Response 처리 함수 //
    const idCheckResponse = (responseBody: ResponseDto | null)=> {
        const message = 
            !responseBody ? '서버에 문제가 있습니다.' :
            responseBody.code === 'VF' ? '올바른 데이터가 아닙니다.' :
            responseBody.code === 'DI' ? '이미 사용 중인 아이디입니다.' :
            responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' :
            responseBody.code === 'SU' ? '사용 가능한 아이디입니다.' : '';

        const isSuccessed = responseBody !== null && responseBody.code === 'SU';

        if (!isSuccessed) {
            setIdErrMsg('중복된 아이디입니다.');
            setIdErr(false);
        } else {
            setIdErrMsg('사용 가능한 아이디입니다.');
            setIdErr(true);
        }
    }

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
        if(isSuccessed) {
            setErrorBool(true);
            setTimer(180);
        }
        //setTelNumberCheckMessageError(!isSuccessed);
        //setSend(isSuccessed);
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

    // function: 회원가입 response 처리 함수 //
    const signUpResponse = (responseBody: ResponseDto | null) => {
        const message = 
            !responseBody ? '서버에 문제가 있습니다' : 
            responseBody.code === 'VF' ? '올바른 데이터가 아닙니다.' :
            responseBody.code === 'DI' ? '중복된 아이디입니다.' :
            responseBody.code === 'DT' ? '중복된 전화번호입니다.' :
            responseBody.code === 'TAF' ? '인증번호가 일치하지 않습니다.' :
            responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' :
            responseBody.code === 'SU' ? '인증번호가 확인되었습니다.' : '';

        const isSuccessed = responseBody !== null && responseBody.code === 'SU';
        if(!isSuccessed) {
            alert(message);
            return;
        }
        alert('회원가입이 완료되었습니다.');
        navigator(LOGIN_ABSOLUTE_PATH);
    }

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

    // render: 회원가입 화면 렌더링 //
    return (
        <div className="auth">
            <div className="pic"></div>

            <div id="signUp">
                <div className="title">회원가입</div>

                <div className="sns-container">
                    <div className="sns-title">SNS 회원가입</div>
                    <div className="sns">
                        <div className="kakao" onClick={() => onSnsButtonClickHandler('kakao')}></div>
                        <div className="google" onClick={() => onSnsButtonClickHandler('google')}></div>
                        <div className="naver" onClick={() => onSnsButtonClickHandler('naver')}></div>
                    </div>
                    <hr className="custom-hr"></hr>
                </div>

                <div className="box">
                    <input className="input-box" value={name} onChange={onNameChangeHandler} placeholder="이름"></input>

                    <div className="id-box">
                        <div className="tel-box">
                            <input className="input-box2" onChange={onUserIdChangeHandler} placeholder="아이디"
                                value={userId} onKeyDown={handleKeyDown1}></input>
                            <div className={userId ? "send-btn" : "send-btn-false"}
                                onClick={userId.length > 0 ? duplicatedCheck : undefined}>중복 확인</div>
                        </div>
                        <div className={idErr ? 'message-true' : 'message-false'}>{idErrMsg}</div>
                    </div>

                    <div style={{ marginBottom: "15px" }}>
                        <input className="input-box3" type='password' value={password} onChange={onPasswordChangeHandler}
                            placeholder="비밀번호(영문 + 숫자 혼합 8 ~ 13자)"></input>
                        {pwError.length === null ? '' : <div className="message-false">{pwError}</div>}
                    </div>

                    <div style={{ marginBottom: "15px" }}>
                        <input className="input-box3" type='password' value={passwordCheck}
                            onChange={onPasswordCheckChangeHandler} placeholder="비밀번호 확인"></input>
                        {isMatched2 ? '' : <div className="message-false">{pwSameError}</div>}
                    </div>

                    <div style={{ marginBottom: "15px" }}>
                        <input className="input-box3" value={birth} onChange={onBirthChangeHandler} placeholder="생년월일(YYYYMMDD)"
                            maxLength={8}></input>
                        {birthMsgBool ? '' : <div className="message-false">{birthMessage}</div>}
                    </div>

                    <div style={{ marginBottom: "15px" }}>
                        <div className="tel-box">
                            <input className="input-box2" onChange={onTelNumberChangeHandler} placeholder="전화번호(- 제외)"
                                value={displayFormattedPhoneNumber(telNumber)} onKeyDown={handleKeyDown2}></input>
                            <div className={telNumber.length === 11 ? "send-btn" : "send-btn-false"}
                                onClick={telNumber.length === 11 ? onSendClickHandler : undefined}>{send ? '전송' : '재전송'}</div>
                        </div>
                        <div className={error ? "message-true" : "message-false"}>{telNumberMessage}</div>
                    </div>

                    {error ?
                        <>
                            <div className="tel-box2">
                                <input className="input-box2" onChange={authNumberChangeHandler} placeholder="인증번호 6자리"
                                    value={authNumber} onKeyDown={handleKeyDown3} maxLength={6}></input>
                                <div className='timer'>{formatTime()}</div>
                                <div className={authNumber.length === 6 ? "send-btn" : "send-btn-false"}
                                    onClick={authNumber.length === 6 ? onCheckClickHandler : undefined}>확인</div>
                            </div>
                            <div className={isMatched ? "message-true" : "message-false"}>{authMessage}</div>
                        </> : ''}

                    <div className='user-permission'>
                        <div className='permission-box'>
                            <input type="checkbox" id='all' checked={allChecked} onChange={handleAllChecked} />
                            <label htmlFor="all">약관 전체 동의</label>
                        </div>
                        <hr className='hr-custom-three' />

                        <div className='permission-box-detail'>
                            <input type="checkbox"
                                id="age" name="age" checked={terms.age} onChange={handleTermChange} />
                            <label htmlFor="age" className="permission-label">[필수] 만 14세 이상입니다.</label>
                        </div>

                        <div className='permission-box-detail'>
                            <input type="checkbox" id="service" name="service"
                                checked={terms.service} onChange={handleTermChange} />
                            <label htmlFor="service" className="permission-label">[필수] 이용약관 동의</label>
                            <button type="button" onClick={toggleServiceTerms1}
                                className={`toggle-button ${showServiceTerms ? 'rotate' : ''}`}>▼</button>
                        </div>
                        {showServiceTerms && (
                            <div style={{ paddingLeft: '40px', marginTop: '8px', color: '#666' }}>
                                <p className='service-contents'>{`도란도란 서비스 이용 약관

제 1조 (목적)
본 약관은 도란도란(이하 "갑"이라 합니다)이 제공하는 서비스(이하 "서비스"라 합니다)를 이용함에 있어, 회원(이하 "을"이라 합니다)과 갑 간의 권리, 의무, 책임 사항 및 기타 필요한 사항을 규정함을 목적으로 합니다.

제 2조 (용어 정의)

"갑"이라 함은 도란도란 서비스를 제공하는 주체를 의미합니다.
"을"이라 함은 본 약관에 동의하고 서비스를 이용하는 회원을 의미합니다.
"서비스"라 함은 갑이 제공하는 커뮤니티 플랫폼 및 관련 콘텐츠, 정보, 기능 등을 의미합니다.
제 3조 (약관의 명시와 개정)

갑은 본 약관의 내용을 을이 쉽게 알 수 있도록 서비스 초기 화면에 게시하거나 기타 방법으로 공지합니다.
갑은 관련 법령을 위배하지 않는 범위 내에서 본 약관을 변경할 수 있으며, 개정된 약관은 공지된 시점부터 효력이 발생합니다.
제 4조 (서비스의 제공 및 변경)

갑은 을에게 다음과 같은 서비스를 제공합니다:
토론 및 커뮤니케이션 플랫폼
관련 정보 제공 및 추천 서비스
기타 갑이 정하는 서비스
서비스 내용이 변경될 경우, 갑은 을에게 사전 통지하며, 불가피한 사유가 있는 경우에는 사후에 통지할 수 있습니다.
제 5조 (서비스 이용 요금)

서비스 이용이 무료인 경우 이를 명시하며, 유료 서비스가 제공될 경우 별도로 공지합니다.
유료 서비스 이용 시 갑은 을에게 해당 요금을 사전 고지하며, 을은 이에 동의한 후 서비스를 이용합니다.
제 6조 (을의 의무)

을은 본 약관 및 관련 법령을 준수해야 하며, 서비스 이용 과정에서 공공질서를 해치거나 타인의 권리를 침해하지 않아야 합니다.
을은 갑의 명시적 동의 없이 서비스의 내용을 복제, 유통하거나 영리 목적으로 이용할 수 없습니다.
을은 자신의 계정 정보 및 개인정보를 안전하게 관리해야 하며, 이를 제3자에게 제공하거나 양도해서는 안 됩니다.
제 7조 (갑의 의무)

갑은 안정적이고 지속적인 서비스 제공을 위해 최선을 다합니다.
갑은 개인정보 보호법 등 관련 법령을 준수하여 을의 개인정보를 안전하게 관리합니다.
갑은 을이 제기한 의견이나 불만을 성실히 처리합니다.
제 8조 (서비스 중단)

갑은 시스템 점검, 교체, 업그레이드 또는 기타 불가피한 사유로 서비스 제공을 일시적으로 중단할 수 있습니다.
서비스 중단 시 갑은 사전에 공지하며, 긴급한 경우 사후에 통지할 수 있습니다.
제 9조 (책임의 제한)

갑은 천재지변, 전쟁, 기타 불가항력으로 인해 발생한 손해에 대해 책임을 지지 않습니다.
갑은 을의 귀책사유로 인한 손해에 대해 책임을 지지 않습니다.
제 10조 (개인정보 보호)

갑은 을의 개인정보를 서비스 제공 목적으로만 사용하며, 을의 동의 없이 제3자에게 제공하지 않습니다.
갑은 을의 개인정보를 안전하게 관리하기 위해 개인정보 보호법을 준수합니다.
제 11조 (분쟁 해결)

본 약관과 관련하여 갑과 을 간에 발생한 분쟁은 상호 협의하여 해결합니다.
협의가 이루어지지 않을 경우, 관련 법령에 따른 절차에 따라 해결합니다.
부칙
본 약관은 2025년 1월 1일부터 시행됩니다.`}</p>
                            </div>
                        )}


                        <div className='permission-box-detail'>
                            <input type="checkbox"
                                id="privacy"
                                name="privacy"
                                checked={terms.privacy}
                                onChange={handleTermChange} />
                            <label htmlFor="privacy" className="permission-label">[필수] 개인정보 수집 및 이용 동의</label>
                            <button type="button"
                                onClick={toggleServiceTerms2}
                                className={`toggle-button ${showPrivacyTerms ? 'rotate' : ''}`}>
                                ▼
                            </button>
                        </div>
                        {showPrivacyTerms && (
                            <div style={{ paddingLeft: '40px', marginTop: '8px', color: '#666' }}>
                                <p className='service-contents'>{`개인정보 수집 및 이용 동의 약관

제 1조 (목적)
도란도란(이하 "서비스")는 이용자의 개인정보를 중요하게 여기며, 관련 법령을 준수하여 개인정보를 보호합니다. 본 약관은 이용자가 서비스를 이용함에 있어 개인정보의 수집, 이용, 보관 및 파기와 관련된 사항을 규정함을 목적으로 합니다.

제 2조 (개인정보 수집 항목 및 수집 방법)
① 서비스는 다음과 같은 개인정보를 수집합니다:

필수 항목: 이름, 이메일 주소, 비밀번호, 생년월일, 성별
선택 항목: 관심 주제, 프로필 사진
자동 수집 항목: 접속 로그, 쿠키, 기기 정보
② 개인정보는 다음과 같은 방법으로 수집됩니다:

회원가입 시 입력
서비스 이용 과정에서 자동 수집
제 3조 (개인정보의 수집 및 이용 목적)
서비스는 수집한 개인정보를 다음의 목적에 활용합니다:

서비스 제공 및 이용자 인증
게시물 작성 및 커뮤니티 활동 지원
공지사항 전달 및 고객 문의 처리
맞춤형 콘텐츠 제공 및 통계 분석
제 4조 (개인정보 보유 및 이용 기간)
① 서비스는 개인정보 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다.
② 다만, 법령에서 정한 보관 기간 동안 아래의 정보를 보관할 수 있습니다:

계약 및 청약 철회, 결제 등 거래 관련 기록: 5년
소비자 불만 및 분쟁 처리 기록: 3년
접속 로그 기록: 6개월
제 5조 (개인정보의 제3자 제공)
서비스는 이용자의 동의 없이 개인정보를 제3자에게 제공하지 않습니다. 단, 다음의 경우는 예외로 합니다:

법령에 의한 요청이 있을 경우
수사기관의 적법한 요청이 있는 경우
제 6조 (개인정보 처리의 위탁)
서비스는 개인정보 처리를 외부에 위탁할 수 있으며, 위탁 시 개인정보 보호가 충분히 보장될 수 있도록 관리·감독합니다.

제 7조 (이용자의 권리 및 행사 방법)
이용자는 서비스에 대해 다음의 권리를 행사할 수 있습니다:

개인정보 열람, 정정, 삭제, 처리 정지 요청
동의 철회 및 회원 탈퇴 요청
제 8조 (개인정보 보호를 위한 조치)
① 기술적 조치: 데이터 암호화, 백신 프로그램 적용
② 관리적 조치: 개인정보 취급 직원 교육, 접근 권한 관리

제 9조 (개인정보 파기 절차 및 방법)
① 개인정보는 보유 기간이 경과하거나 이용 목적이 달성된 후 지체 없이 파기됩니다.
② 전자 파일 형태의 정보는 복구 불가능한 방법으로 삭제하며, 종이 문서는 분쇄기로 파기합니다.

제 10조 (개인정보 처리방침의 변경)
본 약관은 법령이나 서비스 정책 변경에 따라 개정될 수 있으며, 변경 사항은 서비스 홈페이지를 통해 사전 공지합니다.

제 11조 (문의처)
개인정보 관련 문의는 아래를 통해 가능합니다:

고객센터: 010-9876-5432
이메일: support@dorandoran.com
주소: 부산광역시 연제구 중앙대로 1234`}</p>
                            </div>
                        )}
                    </div>

                    <div className={signUp ? "login-btn" : "login-btn-false"}
                        onClick={signUp ? onSignUpClickHandler : undefined}>회원가입</div>

                </div>
            </div>
        </div>
    )
}