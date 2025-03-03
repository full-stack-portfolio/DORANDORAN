import React, { ChangeEvent, useEffect, useState } from 'react'
import './style.css';
import { useNavigate } from 'react-router-dom';
import { MY_ABSOLUTE_MILEAGE_PATH, MY_INFO_PW_ABSOLUTE_PATH, ACCESS_TOKEN, MY_INFO_UPDATE_ABSOLUTE_PATH } from '../../../../constants';
import { FaUserEdit, FaCoins, FaHistory, FaCalendarCheck } from "react-icons/fa";
import { useSignInUserStore } from '../../../../stores';
import CheckPwRequestDto from '../../../../apis/dto/request/mypage/myInfo/check-pw.request.dto';
import { useCookies } from 'react-cookie';
import { pwCheckRequest } from '../../../../apis';
import ResponseDto from '../../../../apis/dto/response/response.dto';
import MypageSidebar from '../../../../components/mypage/sidebar';

// component: 비밀번호 확인 화면 컴포넌트 //
export default function PwCheck() {

    // state: 로그인 유저 정보 상태 //
    const { signInUser, setSignInUser } = useSignInUserStore();

    // state: 비밀번호 상태 //
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<boolean>(false);
    const [errMsg, setErrMsg] = useState<string>('');
    const [editbutton, setEditButton] = useState<boolean>(false);

    // state: 쿠키 상태 //
    const [cookies, setCookie] = useCookies();

    // variable: access token //
    const accessToken = cookies[ACCESS_TOKEN];

    // event handler: 비밀번호 변경 이벤트 핸들러 //
    const onPWchangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setPassword(value);

        const pattern = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,13}$/;
        let isTrue = pattern.test(value);
        if (isTrue) {
            setError(true);
            setErrMsg('');
        } else {
            setError(false);
            setErrMsg('영문, 숫자를 혼용하여 8 ~ 13자 입력해주세요.');
        }
    }

    // event handler: 엔터키로 로그인 버튼 동작 //
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onBtnClickHandler();
        }
    }

    // event handler: 개인정보 관리 버튼 클릭 이벤트 핸들러 //
    const onBtnClickHandler = async () => {

        if (!password || !accessToken) return;

        if (signInUser) {
            const requestBody: CheckPwRequestDto = {
                userId: signInUser?.userId,
                password
            };
            pwCheckRequest(requestBody, accessToken).then(userUpdateResponse);
        }
    }

    // event handler: 게시물 메뉴 버튼 클릭 이벤트 처리 함수 //
    const onPostMenuButtonHandler = () => {
        setEditButton(!editbutton);
    }

    const navigateToMileage = () => {
        navigator(MY_ABSOLUTE_MILEAGE_PATH);
    };

    // event handler: 개인 정보 수정 버튼 클릭 이벤트 핸들러 //
    const onChangeInfoClickHandler = () => {
        navigator(MY_INFO_PW_ABSOLUTE_PATH('qwer1234'));
    }


    // function: navigator //
    const navigator = useNavigate();

    // function: 개인 정보 수정 Response 처리 함수 //
    const userUpdateResponse = (responseBody: ResponseDto | null) => {

        const message =
            !responseBody ? '서버에 문제가 있습니다.' :
                responseBody.code === 'VF' ? '일치하는 정보가 없습니다.' :
                    responseBody.code === 'AF' ? '일치하는 정보가 없습니다.' :
                        responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' :
                            responseBody.code === 'NI' ? '존재하지 않는 사용자입니다.' :
                                responseBody.code === 'MT' ? '비밀번호가 일치하지 않습니다.' : '';

        const isSuccessed = responseBody !== null && responseBody.code === 'SU';

        if (!isSuccessed) {
            setError(false); // 에러 상태 갱신
            setErrMsg(message);
            setPassword(''); // 비밀번호 초기화
            return;
        }

        navigator(MY_INFO_UPDATE_ABSOLUTE_PATH(`${signInUser?.userId}`));
    };

    // render: 비밀번호 확인 화면 렌더링 //
    return (
        <div id='password-check'>
            <div className='mypage-menu'>
            <MypageSidebar />
            </div>

            <div className='background'>
                <div className='title'>개인정보 수정</div>
                <div className='sub-title'>비밀번호 확인</div>
                <div className='pw-check-box'>
                    <input className='pw-check-input' type='password' value={password}
                        placeholder='비밀번호' onChange={onPWchangeHandler} onKeyDown={handleKeyDown} />
                    {/*error ? '' : <div className='errMsg'>{errMsg}</div>*/}
                    <div className={error ? 'message-true' : 'errMsg'}>{errMsg}</div>

                </div>
                <div className='for-changeBtn-center'>
                    <div className={error ? 'changeBtn' : 'changeBtn-false'}
                        onClick={error ? onBtnClickHandler : undefined}>개인정보 수정</div>
                </div>
            </div>
        </div>
    )
}
