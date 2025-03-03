import React, { useEffect, useState } from "react";
import './style.css';
import { useLocation, useNavigate } from "react-router-dom";

import { MY_ABSOLUTE_ACCOUNT_MANAGEMENT_PATH, MY_ABSOLUTE_ATTENDANCE_CHECK_PATH, MY_ABSOLUTE_MILEAGE_PATH, MY_ABSOLUTE_PATH, MY_ABSOLUTE_UPDATE_PATH, MY_INFO_PW_ABSOLUTE_PATH } from  "../../../constants";
import { FaUserEdit, FaCoins, FaHistory, FaCalendarCheck, FaCreditCard } from "react-icons/fa";
import { useSignInUserStore } from "../../../stores";


export default function MypageSidebar() {

    // state: 로그인 유저 정보 상태 //
    const { signInUser, setSignInUser } = useSignInUserStore();

    // state: 마이페이지 상태 //
    // const [state] = useState<boolean>(true);
    const [subscribe, setSubscribe] = useState<boolean>(false);
    const [user] = useState<boolean>(false);
    // const [stateType, setStateType] = useState<boolean>(false);
    const [editbutton, setEditButton] = useState<boolean>(false);

    // variable: 자기자신 확인 //
    const isUser = user && true;

    // event handler: 구독 버튼 클릭 이벤츠 처리 함수 //
    const onSubscribeButtonHandler = () => {
        setSubscribe(!subscribe)
    }

    // function: 네비게이터 함수 처리 //
    const navigator = useNavigate();

    // event handler: 게시물 메뉴 버튼 클릭 이벤트 처리 함수 //
    const onPostMenuButtonHandler = () => {
        setEditButton(!editbutton);
    }

    // event handler: 마일리지 관리 버튼 클릭 이벤트 처리 함수 //
    const navigateToMyPage = () => {
        navigator(MY_ABSOLUTE_PATH);
    };

    // event handler: 마일리지 관리 버튼 클릭 이벤트 처리 함수 //
    const navigateToMileage = () => {
        navigator(MY_ABSOLUTE_MILEAGE_PATH);
    };

    // event handler: 마일리지 관리 버튼 클릭 이벤트 처리 함수 //
    const navigateToAccountManagement = () => {
        navigator(MY_ABSOLUTE_ACCOUNT_MANAGEMENT_PATH);
    };

    // event handler: 개인 정보 수정 버튼 클릭 이벤트 핸들러 //
    const onChangeInfoClickHandler = () => {
        navigator(MY_INFO_PW_ABSOLUTE_PATH('qwer1234'));
    }

    // event handler: 출석체크 버튼 클릭 이벤트 핸들러 //
    const naviagateToAttendance = () => {
        navigator(MY_ABSOLUTE_ATTENDANCE_CHECK_PATH('songth'));
    }

    // effect: //
    useEffect(() => {
        console.log(signInUser);
    }, []);

    return (
        <>
            <div className="mypage-left-opstions">
                <aside className="mypage-sidebar">
                    <h2 onClick={navigateToMyPage}>마이페이지</h2>
                    <ul>
                        <li onClick={onChangeInfoClickHandler}><FaUserEdit /> 개인정보 수정</li>
                        <li><FaHistory /> 실시간 토론 참여 이력</li>
                        <li onClick={naviagateToAttendance}><FaCalendarCheck /> 출석체크</li>
                        <li onClick={navigateToMileage}><FaCoins /> 마일리지 관리</li>
                        <li onClick={navigateToAccountManagement}><FaCreditCard  /> 계좌 관리</li>
                    </ul>
                </aside>
                <div className="subscribe-wrapper">
                    <div>
                        <h2 className="subscribe-title">내가 구독한 사람 2명</h2>
                        <div className="subscribe-search-box">
                            <input className="input" placeholder="아이디를 입력하세요. " />
                            <div className="button active">검색</div>
                        </div>
                        <div className="subscribe-box">
                            <div className="subscribe-image"></div>
                            <div className="subscribe-user-info">
                                <div className="subscribe-nickname">마이멜로디</div>
                                <div className="subscribe-user">@1000JEA</div>
                            </div>
                            <div className="subscribe-cancel-button">
                                <div className="subscribe-cancel">구독취소</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
