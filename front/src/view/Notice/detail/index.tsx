import React, { useEffect, useState } from 'react'
import './style.css';
import { useSignInUserStore } from '../../../stores';
import { ACCESS_TOKEN, NOTICE_ABSOLUTE_PATH, NOTICE_DETAIL_ABSOLUTE_PATH } from '../../../constants';
import { useCookies } from 'react-cookie';
import { deleteNoticeRequest, getNoticeDetailRequest } from '../../../apis';
import { useNavigate, useParams } from 'react-router-dom';
import GetNoticeDetailResponseDto from '../../../apis/dto/response/notice/Get-notice-detail.response.dto';
import ResponseDto from '../../../apis/dto/response/response.dto';

// component: 공지사항 상세보기 화면 컴포넌트 //
export default function NoticeDetail() {

    // state: 쿠키 상태 //
    const [cookies, setCookie, removeCookie] = useCookies();

    // state: 로그인 유저 정보 상태 //
    const { signInUser, setSignInUser } = useSignInUserStore();

    // state: 가게 번호 경로 변수 상태 //
    const { noticeNumber } = useParams();

    // state: 공지사항 관련 상태 //
    const [title, setTitle] = useState<String>('');
    const [userId, setUserId] = useState<String>('');
    const [noticeId, setNoticeId] = useState<number>(0);
    const [noticeDate, setNoticeDate] = useState<String>('');
    const [contents, setContents] = useState<String>('');
    const [preTitle, setPreTitle] = useState<String>('');
    const [nextTitle, setNextTitle] = useState<string>('');

    // variable: access token //
    const accessToken = cookies[ACCESS_TOKEN];

    // function: navigator //
    const navigator = useNavigate();

    // event handler: 수정 버튼 클릭 이벤트 핸들러 //
    const onPatchNoticeClickHandler = () => {

    }

    // event handler: 삭제 버튼 클릭 이벤트 핸들러 //
    const onDeleteNoticeClickHandler = () => {
        const answer = window.confirm("정말로 삭제하시겠습니까?");
        if(!answer) return;
        else {
            if(!accessToken || !noticeNumber) return;
            deleteNoticeRequest(noticeNumber, accessToken).then(deleteNoticeResponse);
        }
    }

    // event handler: 이전글 클릭 이벤트 핸들러 //
    const onPreNoticeClickHandler = () => {
        navigator(NOTICE_DETAIL_ABSOLUTE_PATH((noticeId - 1)));
        window.location.reload();
    }

    // event handler: 다음글 클릭 이벤트 핸들러 //
    const onNextNoticeClickHandler = () => {
        navigator(NOTICE_DETAIL_ABSOLUTE_PATH((noticeId + 1)));
        window.location.reload();
    }

    // function: notice detail 불러오기 함수 //
    const getNoticeDetail = () => {
        if(!accessToken || !noticeNumber) return;
        
        getNoticeDetailRequest(noticeNumber, accessToken).then(getNoticeListResponse);
    };

    // function: getNoticeDetail response 처리 함수 //
    const getNoticeListResponse = (responseBody: GetNoticeDetailResponseDto | ResponseDto | null) => {
        const message =
            responseBody === null ? '서버에 문제가 있습니다.' :
            responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' :
            responseBody.code === 'NN' ? '존재하지 않는 공지사항입니다.' : '';
    
        const isSuccessed = responseBody !== null && responseBody.code === 'SU';
        if (!isSuccessed) {
            alert(message);
            return;
        }
    
        const {title, userId, noticeDate, contents, noticeId, preTitle, nextTitle} 
            = responseBody as GetNoticeDetailResponseDto;
        setTitle(title);
        setUserId(userId);
        setNoticeDate(noticeDate);
        setContents(contents);
        setNoticeId(noticeId);
        setPreTitle(preTitle);
        setNextTitle(nextTitle);
    };

    // function: delete notice response 처리 함수 //
    const deleteNoticeResponse = (responseBody: ResponseDto | null) => {
        const message =
            responseBody === null ? '서버에 문제가 있습니다.' :
            responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' :
            responseBody.code === 'NN' ? '존재하지 않는 공지사항입니다.' : '';
    
        const isSuccessed = responseBody !== null && responseBody.code === 'SU';
        if (!isSuccessed) {
            alert(message);
            return;
        }
        alert("삭제되었습니다.");
        navigator(NOTICE_ABSOLUTE_PATH);
        window.location.reload();
    }

    // effect: 컴포넌트 로드시 공지사항 리스트 불러오기 함수 //
    useEffect(getNoticeDetail, [signInUser]);

    // render: 공지사항 상세보기 화면 렌더링 //
    return (
        <div id='notice-detail'>
            <div className='background'>
                <div className='notice-info'>
                    <div className='title'>{title}</div>
                    <div className='admin'>@{userId}</div>
                    <div className='date'>{noticeDate}</div>
                </div>
                <div className='contents'>{contents}</div>
                
                {signInUser?.role ? 
                    <div className='btn-box'>
                        <div className='patch-btn' onClick={onPatchNoticeClickHandler}>수정</div>
                        <div className='delete-btn' onClick={onDeleteNoticeClickHandler}>삭제</div>
                    </div> 
                : 
                    ''
                }
            </div>

            <div className='table'>
                <div className='pre' onClick={onPreNoticeClickHandler}>
                    <div className='pre-notice'>이전글</div>
                    <div className='pre-title'>{preTitle}</div>
                </div>
                <div className='next' onClick={onNextNoticeClickHandler}>
                    <div className='next-notice'>다음글</div>
                    <div className='next-title'>{nextTitle}</div>
                </div>
            </div>
        </div>
    )
}
