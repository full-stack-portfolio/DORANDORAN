import React, { useEffect } from 'react';
import './App.css';
import { Route, Routes, useNavigate, useSearchParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import { ACCESS_TOKEN, GEN_DISC_DETAIL_ABSOLUTE_PATH, GEN_DISC_PATH, GEN_DISC_WRITE_ABSOLUTE_PATH, LOGIN_ABSOLUTE_PATH, LOGIN_PATH, MAIN_ABSOLUTE_PATH, MAIN_PATH, MY_PATH, NOTICE, OTHERS_PATH, ROOT_PATH, RT_DISC_PATH, SCHEDULE, SNS_SUCCESS_PATH, CHANGE_PW, FIND_ID, FIND_ID_RESULT, FIND_PW, SIGN_UP, ADMIN_PATH, MY_UPDATE_PATH, NOTICE_WRITE, NOTICE_DETAIL, MY_INFO_UPDATE_PATH, MY_INFO_PW_PATH, ADMIN_ABSOLUTE_ACCUSE_PATH, ADMIN_ABSOLUTE_MILEAGE_PATH, MY_MILEAGE_PATH, MY_ATTENDANCE_CHECK_PATH, MY_ACCOUNT_MANAGEMENT_PATH } from './constants';
import MainLayout from './layouts/MainLayout';
import GD from './view/General_Discuss';
import RTDiscuss from './view/RT_Discuss';
import Schedule from './view/Schedule';
import Main from './view/Main';
import Mypage from './view/Mypage';
import Login from './view/Auth/Login';
import GDDetail from './view/General_Discuss/Detail';
import GDWrite from './view/General_Discuss/Write';
import FindId from './view/Auth/Find-id';
import FindPw from './view/Auth/Find-pw';
import SignUp from './view/Auth/Sign-up';
import FindIdResult from './view/Auth/Find-id-result';
import ChangePw from './view/Auth/Change-pw';

import Update from './view/Mypage/Update';
import Accuse from './view/Mypage/Admin/Accuse';
import Mileage from './view/Mypage/Admin/Mileage';
import Admin from './view/Mypage/Admin';
import NoticeWrite from './view/Notice/write';
import NoticeDetail from './view/Notice/detail';
import PwCheck from './view/Mypage/Change-info/Password-check';
import ChangeInfo from './view/Mypage/Change-info/change-info';
import Notice from './view/Notice';
import MypageMileage from './view/Mypage/Mileage';
import ResponseDto from './apis/dto/response/response.dto';
import GetSignInResponseDto from './apis/dto/response/auth/get-sign-in.response.dto';
import { GetSignInRequest } from './apis';
import { useSignInUserStore } from './stores';
import Attendance from './view/Mypage/Attendance';
import AccountManagement from './view/Mypage/Account_Management';

// component: root path 컴포넌트 //
function Index() {

  // state: 쿠키 상태 //
  const [cookies] = useCookies();

  // function: 네비게이터 함수 //
  const navigator = useNavigate();

  // effect: 마운트 시 경로 이동 effect //
  useEffect(() => {
    if (cookies[ACCESS_TOKEN]) navigator(MAIN_ABSOLUTE_PATH);
    else navigator(LOGIN_ABSOLUTE_PATH);
  }, []);

  // render: root path 컴포넌트 렌더링 //
  return (
    <></>
  );
}


// component: sns success 컴포넌트 //
function SnsSuccess() {

  // state: query parameter 상태 //
  const [queryParam] = useSearchParams();
  const accessToken = queryParam.get('accessToken');
  const expiration = queryParam.get('expiration');

  // state: cookie 상태 //
  const [cookies, setCookie] = useCookies();

  // function: 네비게이터 함수 //
  const navigator = useNavigate();

  // effect: sns success 컴포넌트 로드시 accessToken과 expiration을 확인하여 로그인 처리하는 함수 //
  useEffect(() => {
    if (accessToken && expiration) {
      const expires = new Date(Date.now() + (Number(expiration) * 1000));
      setCookie(ACCESS_TOKEN, accessToken, { path: ROOT_PATH, expires });

      navigator(MAIN_ABSOLUTE_PATH);
    } else {
      navigator(LOGIN_ABSOLUTE_PATH);
    }
  }, []);

  // render: sns success 컴포넌트 렌더링 //
  return <></>;

}

// component: 도란도란 컴포넌트 //
export default function DoranDoran() {

  // state: 로그인 유저 정보 상태 //
  const { signInUser, setSignInUser } = useSignInUserStore();

  // state: cookie 상태 //
  const [cookies, setCookie, removeCookie] = useCookies();
  
  // function: navigator 함수 //
  const navigator = useNavigate();

  // function: get sign in response 처리 함수 //
  const getSignInResponse = (responseBody: GetSignInResponseDto | ResponseDto | null) => {
    const message = 
      !responseBody ? '로그인 유저 정보를 불러오는데 문제가 발생했습니다.' :
      responseBody.code === 'NI' ? '로그인 유저 정보가 존재하지 않습니다.' :
      responseBody.code === 'AF' ? '잘못된 접근입니다.' :
      responseBody.code === 'DBE' ? '로그인 유저 정보를 불러오는데 문제가 발생했습니다.' : '';

    const isSuccessed = responseBody !== null && responseBody.code === 'SU';
    if(!isSuccessed) {
      alert(message);
      removeCookie(ACCESS_TOKEN, {path:ROOT_PATH});
      setSignInUser(null);
      navigator(LOGIN_ABSOLUTE_PATH);
      return ;
    }

    const {userId, name, telNumber, profileImage, role, nickName, mileage, 
      statusMessage, isVoted, isLikePost, isLikeComment} = responseBody as GetSignInResponseDto;
    setSignInUser({userId, name, telNumber, profileImage, role, nickName, mileage, statusMessage, isVoted, isLikePost,isLikeComment});
  };
  
  //effect: cookie의 accesstoken 값이 변경될 때 마다 로그인 유저 정보를 요청하는 함수 //
  useEffect(() => {
    const accessToken = cookies[ACCESS_TOKEN];
    if(accessToken) GetSignInRequest(accessToken).then(getSignInResponse);
    else setSignInUser(null);
  }, [cookies[ACCESS_TOKEN]]);


  // render: 메인 화면 렌더링 //
  return (
    <Routes>
      <Route index element={<Index />} />
      <Route path={LOGIN_PATH} element={<Login />}></Route>
      <Route path={FIND_ID} element={<FindId />} />
      <Route path={FIND_ID_RESULT} element={<FindIdResult />} />
      <Route path={FIND_PW} element={<FindPw />}></Route>
      <Route path={CHANGE_PW} element={<ChangePw />} />
      <Route path={SIGN_UP} element={<SignUp />}></Route>

      <Route path={MAIN_PATH} element={<MainLayout />} >
        <Route index element={<Main />} />
      </Route>

      <Route path={GEN_DISC_PATH} element={<MainLayout />}>
        <Route index element={<GD />} />
        <Route path={GEN_DISC_DETAIL_ABSOLUTE_PATH(':roomId')} element={<GDDetail />} />
        <Route path={GEN_DISC_WRITE_ABSOLUTE_PATH} element={<GDWrite />} />
      </Route>

      <Route path={RT_DISC_PATH} element={<MainLayout />}>
        <Route index element={<RTDiscuss />} />
      </Route>

      <Route path={NOTICE} element={<MainLayout />} >
        <Route index element={<Notice />} />
        <Route path={NOTICE_WRITE} element={<NoticeWrite />} />
        <Route path={NOTICE_DETAIL(':noticeNumber')} element={<NoticeDetail />} />
      </Route>

      <Route path={SCHEDULE} element={<MainLayout />} >
        <Route index element={<Schedule />} />
      </Route>

      <Route path={MY_PATH} element={<MainLayout />}  >
        <Route index element={<Mypage />} />
        <Route path={MY_UPDATE_PATH(':userId')} element={<Update />} />
        <Route path={MY_INFO_PW_PATH(':userId')} element={<PwCheck />} />
        <Route path={MY_INFO_UPDATE_PATH(':userId')} element={<ChangeInfo />} />
        <Route path={MY_MILEAGE_PATH} element={<MypageMileage />} />
        <Route path={MY_ACCOUNT_MANAGEMENT_PATH} element={<AccountManagement />} />
        <Route path={MY_ATTENDANCE_CHECK_PATH(':userId')} element={<Attendance />} />
      </Route>

      <Route path={ADMIN_PATH} element={<MainLayout />}>
        <Route index element={<Admin />} />
      </Route>
      <Route path={ADMIN_PATH} element={<MainLayout />}>
        <Route index element={<Admin />} />
        <Route path={ADMIN_ABSOLUTE_ACCUSE_PATH} element={<Accuse />} />
        <Route path={ADMIN_ABSOLUTE_MILEAGE_PATH} element={<Mileage />} />
      </Route>

      <Route path={SNS_SUCCESS_PATH} element={<SnsSuccess />} />
      <Route path={OTHERS_PATH} element={<Index />} />
    </Routes>
  );
}
