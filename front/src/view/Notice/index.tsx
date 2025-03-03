import React, { ChangeEvent, useEffect, useState } from "react";
import './style.css';
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, NOTICE_DETAIL_ABSOLUTE_PATH, NOTICE_WRITE_ABSOLUTE_PATH } from "../../constants";
import { usePagination } from "../../hooks";
import Pagination from "../../components/pagination";
import NoticeList from "../../types/notice.interface";
import formatDate from "../../components/dateFormat/changeDate";
import { useSignInUserStore } from "../../stores";
import { getNoticeListRequest } from "../../apis";
import GetNoticeListResponseDto from "../../apis/dto/response/notice/Get-notice-list.response.dto";
import ResponseDto from "../../apis/dto/response/response.dto";
import { useCookies } from "react-cookie";

// interface: 공지사항 리스트 아이템 //
interface TableRowProps {
    notice: NoticeList;
    getNoticeList: () => void;
    onDetailClickHandler: (noticeNumber: number) => void;
    index? : number;
};

// component: NoticeRow 컴포넌트 //
export function NoticeRow({ notice, getNoticeList, onDetailClickHandler, index }: TableRowProps) {

    // render: NoticeRow 컴포넌트 렌더링 //
    return (
        <div id="tr" onClick={() => onDetailClickHandler(notice.noticeId)}>
            <div className="td-no">{index}</div>
            <div className="td-title">{notice.title}</div>
            <div className="td-date">{notice.noticeDate}</div>
        </div>
    )
}

// component: 상단 고정 공지사항 컴포넌트 //
export function TopNotice({ notice, getNoticeList, onDetailClickHandler }: TableRowProps) {
    
    // render: 상단 고정 공지사항 컴포넌트 렌더링 //
    return (
        <div id="tr" onClick={() => onDetailClickHandler(notice.noticeId)}>
            <div className="td-pin"></div>
            <div className="td-pin-title">{notice.title}</div>
            <div className="td-pin-date">{notice.noticeDate}</div>
        </div>
    )
}

// component: 공지사항 컴포넌트 //
export default function Notice() {

    // state: 쿠키 상태 //
    const [cookies, setCookie, removeCookie] = useCookies();

    // state: 로그인 유저 정보 상태 //
    const { signInUser, setSignInUser } = useSignInUserStore();

    // state: 검색 입력 창 상태 //
    const [searchWords, setSearchWords] = useState<string>('');

    // state: 원본 리스트 상태 //
    const [originalList, setOriginalList] = useState<NoticeList[]>([]);

    // variable: access token //
    const accessToken = cookies[ACCESS_TOKEN];

    // event handler: 등록 버튼 클릭 이벤트 핸들러 //
    const onWriteClickHandler = () => {
        navigator(NOTICE_WRITE_ABSOLUTE_PATH);
    }

    // event handler: 공지사항 tr 클릭 이벤트 핸들러 //
    const onTrClickHandler = (noticeNumber: string | number) => {
        navigator(NOTICE_DETAIL_ABSOLUTE_PATH(noticeNumber));
    }

    // event handler: 검색 입력 창 내용 변경 감지 //
    const onSearchChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setSearchWords(value);
    };

    // event handler: 공지사항 검색 버튼 //
    const onSearchButtonHandler = () => {
        const searchedList = originalList.filter(notice => notice.title.includes(searchWords));
        setTotalList(searchedList);
        initViewList(searchedList);
    };

    // event handler: 엔터키로 검색 버튼 동작 //
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onSearchButtonHandler();
        }
    }

    // function: navigator //
    const navigator = useNavigate();

    // function: notice list 불러오기 함수 //
    const getNoticeList = () => {
        if(!accessToken) return;

        getNoticeListRequest(accessToken).then(getNoticeListResponse);
    };

    // function: getNoticeList response 처리 함수 //
    const getNoticeListResponse = (responseBody: GetNoticeListResponseDto | ResponseDto | null) => {
        const message =
            responseBody === null ? '서버에 문제가 있습니다.' :
                responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' : 'SU';

        const isSuccessed = responseBody !== null && responseBody.code === 'SU';
        if (!isSuccessed) {
            alert(message);
            return;
        }

        const { notices } = responseBody as GetNoticeListResponseDto;
        setTotalList(notices);
        setOriginalList(notices);
    };

    // effect: 컴포넌트 로드시 공지사항 리스트 불러오기 함수 //
    useEffect(getNoticeList, [signInUser]);

    //* 커스텀 훅 가져오기
    const {
        currentPage,
        totalCount,
        viewList,
        pageList,
        setTotalList,
        initViewList,
        onPageClickHandler,
        onPreSectionClickHandler,
        onNextSectionClickHandler,
    } = usePagination<NoticeList>();

    const pinnedNotices = viewList.filter(notice => notice.topStatus); // 상단 고정 공지
    const normalNotices = viewList.filter(notice => !notice.topStatus); // 일반 공지

    // render: 공지사항 화면 렌더링 //
    return (
        <div id="notice">
            <div className="title">공지사항</div>

            {signInUser?.role ? 
                <div className="write-btn" onClick={onWriteClickHandler}>작성</div>
            : '' }
            
            <div className="table">
                <div className="th">
                    <div className="td-no">NO.</div>
                    <div className="td-title">TITLE.</div>
                    <div className="td-date">DATE.</div>
                </div>

                {/* 상단 고정 공지 먼저 출력 */}
                {pinnedNotices.map(notice => (
                    <TopNotice 
                        key={notice.noticeId} 
                        notice={notice} 
                        getNoticeList={getNoticeList} 
                        onDetailClickHandler={onTrClickHandler} 
                    />
                ))}

                {/* 일반 공지는 1부터 번호를 매겨서 출력 */}
                {normalNotices.map((notice, index) => (
                    <NoticeRow 
                        key={notice.noticeId} 
                        notice={notice} 
                        getNoticeList={getNoticeList} 
                        onDetailClickHandler={onTrClickHandler} 
                        index={index + 1} // 일반 공지는 1부터 번호 증가
                    />
                ))}
            </div>

            <div className="search">
                <input value={searchWords} className="search-input" placeholder="제목"
                    onChange={onSearchChangeHandler} onKeyDown={handleKeyDown} />
                <div className="search-btn">검색</div>
            </div>

            <Pagination
                pageList={pageList}
                currentPage={currentPage}
                onPageClickHandler={onPageClickHandler}
                onPreSectionClickHandler={onPreSectionClickHandler}
                onNextSectionClickHandler={onNextSectionClickHandler}
            />
        </div>
    )
}