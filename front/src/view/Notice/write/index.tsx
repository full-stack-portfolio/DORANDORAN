import React, { ChangeEvent, useState } from 'react'
import './style.css';
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN, NOTICE_ABSOLUTE_PATH } from '../../../constants';
import { useSignInUserStore } from '../../../stores';
import { useCookies } from 'react-cookie';
import PostNoticeRequestDto from '../../../apis/dto/request/notice/Post-notice.request.dto';
import { postNoticeRequest } from '../../../apis';
import ResponseDto from '../../../apis/dto/response/response.dto';

// component: 공지사항 작성 화면 컴포넌트 //
export default function NoticeWrite() {

    // state: 로그인 유저 정보 상태 //
    const { signInUser, setSignInUser } = useSignInUserStore();

    // state: 쿠키 상태 //
    const [cookies, setCookie] = useCookies();

    // state: 공지사항 관련 상태 //
    const [title, setTitle] = useState<string>('');
    const [contents, setContents] = useState<string>('');
    const [isTop, setIsTop] = useState<boolean>(false);

    // variable: access token //
    const accessToken = cookies[ACCESS_TOKEN];

    // event handler: 제목 변경 이벤트 핸들러 //
    const titleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const {value} = event.target;
        setTitle(value);
    }

    // event handler: 본문 변경 이벤트 핸들러 //
    const contentsChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const {value} = event.target;
        setContents(value);
    }

    // event handler: 상단 고정 체크 이벤트 핸들러 //
    const isCheckedChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setIsTop(event.target.checked);
    }

    // event handler: 등록 버튼 클릭 이벤트 핸들러 //
    const onRegisterClickHandler = () => {
        if(!title || !contents || !signInUser || !accessToken) return;

        const now = new Date();
        const formattedDate = now.toISOString().split('T')[0];

        const requestBody : PostNoticeRequestDto = {
            title, 
            contents,
            noticeDate: formattedDate,
            topStatus: isTop,
            userId: signInUser.userId
        };
        console.log(requestBody);

        postNoticeRequest(requestBody, accessToken).then(postNoticeResponse);
    }

    // event handler: 취소 버튼 클릭 이벤트 핸들러 //
    const onCancleClickHandler = () => {
        navigator(NOTICE_ABSOLUTE_PATH);
    }

    // function: navigator //
    const navigator = useNavigate();

    // function: 공지사항 작성 응답 처리 //
    const postNoticeResponse = (responseBody: ResponseDto | null) => {
        const message =
            !responseBody ? '서버에 문제가 있습니다.' :
            responseBody.code === 'VF' ? '일치하는 정보가 없습니다.' :
            responseBody.code === 'AF' ? '일치하는 정보가 없습니다.' :
            responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' :
            responseBody.code === 'NI' ? '존재하지 않는 사용자입니다.' : '';
        
        const isSuccessed = responseBody !== null && responseBody.code === 'SU';
        
        if (!isSuccessed) {
            alert(message);
            return;
        } else navigator(NOTICE_ABSOLUTE_PATH);
        
    };

    // render: 공지사항 작성 화면 렌더링 //
    return (
        <div id='notice-write'>
            <div className='top-box'>
            <input 
                    type="checkbox" 
                    id="all"
                    checked={isTop} 
                    onChange={isCheckedChangeHandler} 
                />
                <label htmlFor="all">상단 고정</label>
            </div>
            
            <div className='title-box'>
                <div className='title'>TITLE</div>
                <input className='title-input' placeholder='제목을 입력하세요.' onChange={titleChangeHandler}></input>
            </div>

            <textarea className='contents' placeholder='내용을 입력하세요.' onChange={contentsChangeHandler}/>

            <div className='btn-box'>
                <div className='register' onClick={onRegisterClickHandler}>등록</div>
                <div className='cancle' onClick={onCancleClickHandler}>취소</div>
            </div>
        </div>
    )
}
