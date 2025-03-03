import React from 'react'
import './style.css'
import { useNavigate } from 'react-router-dom';
import { FIND_PW_ABSOLUTE_PATH, LOGIN_ABSOLUTE_PATH } from '../../../constants';
import useIdSearchResultZustand from '../../../stores/id-search-result-store';

// component: 아이디 찾기 결과 화면 컴포넌트 //
export default function FindIdResult() {

    // state: zustand 상태 //
    const { name, telNumber, userId, telAuthNumber,
        setName, setTelNumber, setUserId, setTelAuthNumber
    } = useIdSearchResultZustand();

    // event handler: 로그인 버튼 클릭 이벤트 핸들러 //
    const loginBtnClickHandler = () => {
        setName('');
        setTelNumber('');
        setUserId('');
        navigator(LOGIN_ABSOLUTE_PATH);
    }

    // event handler: 비밀번호 찾기 버튼 클릭 이벤트 핸들러 //
    const findPwBtnClickHandler = () => {
        setName('');
        setTelNumber('');
        setUserId('');
        navigator(FIND_PW_ABSOLUTE_PATH);
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

    // render: 아이디 찾기 결과 화면 렌더링 //
    return (
        <div className="auth">
            <div className="pic"></div>

            <div id="Login">
                <div className="title">아이디 찾기 결과</div>

                <div className='login-box'>
                    <div className='one-line'>
                        <div className='name'>이름</div>
                        <div className='name-result'>{name}</div>
                    </div>
                    <div className='one-line'>
                        <div className='telNumber'>전화번호</div>
                        <div className='telNumber-result'>{displayFormattedPhoneNumber(telNumber)}</div>
                    </div>
                    <div className='one-line'>
                        <div className='id'>아이디</div>
                        <div className='id-result'>{userId}</div>
                    </div>
                </div>
                
                <div className='login-btn' onClick={loginBtnClickHandler}
                    style={{marginBottom: "10px"}}>로그인</div>
                <div className='login-btn' onClick={findPwBtnClickHandler}>비밀번호 찾기</div>
            </div>
        </div>
    )
}
