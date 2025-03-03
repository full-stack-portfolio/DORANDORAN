import React, { useEffect, useRef, useState } from 'react'
import './style.css';
import AdminSideBar from '../../../../components/Admin/Sidebar';
import Modal from '../../../../components/modal';
import GetAccuseListResponseDto from '../../../../apis/dto/response/accuse/get-accuse-list.response.dto';
import ResponseDto from '../../../../apis/dto/response/response.dto';
import { useCookies } from 'react-cookie';
import { ACCESS_TOKEN } from '../../../../constants';
import AccuseComponentProps from '../../../../types/accuseList.interface';
import { getAccuseListRequest, getAccuseRequest } from '../../../../apis';
import { useSignInUserStore } from '../../../../stores';
import { usePagination } from '../../../../hooks';
import Pagination from '../../../../components/pagination';
import GetAccuseResponseDto from '../../../../apis/dto/response/accuse/get-accuse.response.dto';
import AccuseDetail from '../../../../types/accuseDetail.interface';


const ITEMS_PER_PAGE = 5;
const PAGES_PER_SECTION = 5;

export default function Accuse() {

    // state: 신고 타입 상태 //
    const [activeTypes, setActiveTypes] = useState<string | null>(null);
    const [toggleDown, setToggleDown] = useState<boolean>(false)
    const [sortingState, setSortingState] = useState({
        selected: '정렬순'
    })
    const typeMapping: Record<string, string> = {
        '댓글': 'COMMENT',
        '게시글': 'POST',
        '채팅': 'CHAT'
    };

    // state: cookie 상태 //
    const [cookies] = useCookies();

    const { signInUser, setSignInUser } = useSignInUserStore();
    const [adminCheck, setAdminCheck] = useState<string>('');

    // state: 신고 리스트 상태 //
    const [accuseList, setAccuseList] = useState<AccuseComponentProps[]>([]);

    //* 커스텀 훅 가져오기
    const {
        currentPage,
        totalPage,
        totalCount,
        totalSection,
        viewList,
        pageList,
        setTotalList,
        setTotalPage,
        setTotalSection,
        onPageClickHandler,
        onPreSectionClickHandler,
        onNextSectionClickHandler
    } = usePagination<AccuseComponentProps>();

    // event handler: 신고 타입 클릭 이벤트 처리  //
    const onAccuseTypeClickHandler = (type: string) => {
        if (type === '|') return;
        setActiveTypes(type);
    };

    // event handler: 정렬 메뉴 버튼 이벤트 처리 함수 //
    const onSortingButtonHandler = () => {
        setToggleDown(!toggleDown);
        setSortingState((prevState) => ({
            ...prevState
        }));

    };
    // event handler: 정렬 메뉴 아이템 클릭 이벤트 처리 함수 //
    const onSortOptionClickHandler = (option: string) => {
        setSortingState({
            selected: option,
        })
        setToggleDown(!toggleDown)
    }

    // interface: 신고 컴포넌트 Props //
    interface AccuseRowProps {
        accuse: AccuseComponentProps;
    }
    // function: 신고 컴포넌트 //
    function Accusetr({ accuse, index }: AccuseRowProps & { index: number }) {

        const [accuses, setAccuses] = useState<AccuseComponentProps[]>([]);
        const [accuseData, setAccuseData] = useState<AccuseDetail | null>(null);
        const [modalOpen, setModalOpen] = useState<boolean>(false);
        const modalBackground = useRef<HTMLDivElement | null>(null);

        const handleSave = () => {
            setModalOpen(false);
            window.location.reload()
        };

        const handleClose = () => {
            setModalOpen(false);
        };

        // event handler: 모달창 오픈 이벤트 처리 함수 //
        const onModalOpenHandler = () => {
            setModalOpen(!modalOpen);

            const accessToken = cookies[ACCESS_TOKEN];
            if (!accessToken) {
                alert('접근 권한이 없습니다.');
                return;
            }

            getAccuseRequest(accuse.accuseId, accessToken)
                .then((response) => getAccuseResponse(response as GetAccuseResponseDto | ResponseDto | null));
        }

        // function: 신고 Detail 불러오기 함수 //
        const getAccuseResponse = (responseBody: GetAccuseResponseDto | ResponseDto | null) => {
            if (!responseBody) {
                alert('서버에 문제가 있습니다.');
                return;
            }
            const message =
                !responseBody ? '서버에 문제가 있습니다.' :
                    responseBody.code === 'VF' ? '유효하지 않은 데이터입니다.' :
                        responseBody.code === 'AF' ? '잘못된 접근입니다.' :
                            responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' :
                                responseBody.code === 'NA' ? '신고 내역이 존재하지 않습니다.' : '';

            const isSuccessed = responseBody !== null && responseBody.code === 'SU';
            if (!isSuccessed) {
                alert(message);
                return;
            }

            if ("getAccuseResultSet" in responseBody) {
                setAccuseData(responseBody.getAccuseResultSet as AccuseDetail);
            }
        }


        // function: 신고 리스트 불러오기 response 처리 함수 //
        const getAccuseListResponse = (responseBody: GetAccuseListResponseDto | ResponseDto | null) => {

            if (!responseBody) {
                alert('서버에 문제가 있습니다.');
                return;
            }
            const message =
                !responseBody ? '서버에 문제가 있습니다.' :
                    responseBody.code === 'VF' ? '유효하지 않은 데이터입니다.' :
                        responseBody.code === 'AF' ? '잘못된 접근입니다.' :
                            responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

            const isSuccessed = responseBody !== null && responseBody.code === 'SU';
            if (!isSuccessed) {
                alert(message);
                return;
            }

            const accessToken = cookies[ACCESS_TOKEN];
            if (!accessToken) {
                alert('토큰 오류');
                return;
            }
            const { accuses } = responseBody as GetAccuseListResponseDto;
            setAccuses(accuses);
        }

        // effect: 마운트 될 때 신고  불러오기 //
        useEffect(() => {

            const accessToken = cookies[ACCESS_TOKEN];
            if (!accessToken) {
                alert('접근 권한이 없습니다.');
                return;
            }
            if (signInUser?.userId) {
                setAdminCheck(signInUser.userId);
            }

            getAccuseListRequest(adminCheck, accessToken)
                .then((response) => getAccuseListResponse(response as GetAccuseListResponseDto | ResponseDto | null));
        }, []);

        return (
            <>
                <div className='accuse-table2' onClick={onModalOpenHandler}>
                    <div className='accuse-tr'>{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</div>
                    <div className='accuse-tr'>{accuse.reportType === 'POST' ? '게시글' : '댓글'}</div>
                    <div className='accuse-tr'>{accuse.accuseUserId}</div>
                    <div className='accuse-tr'>{accuse.userId}</div>
                    <div className='accuse-tr'>{accuse.accuseDate}</div>
                    <div className='accuse-tr'>{accuse.reportContents}</div>
                </div>
                {
                    modalOpen && <div className='accuse-modal-container' ref={modalBackground} onClick={e => {
                        if (e.target === modalBackground.current) {
                            setModalOpen(false);
                        }
                    }}>
                        <div className="event-form">
                            <h2>신고 내역</h2>
                            <div className="form-group">
                                <label>악용사용자 아이디 : </label>
                                <div>{accuseData?.userId}</div>
                            </div>
                            <div className="form-group">
                                <label>신고 내역 : </label>
                                <div>{accuseData?.roomDescription ?? accuseData?.contents}</div>
                            </div>
                            <div className="form-group">
                                <label>신고사유 : </label>
                                <div>{accuse.reportContents}</div>
                            </div>
                            <div className="button-group">
                                <button onClick={handleSave}>저장</button>
                                <button onClick={handleClose}>닫기</button>
                            </div>
                        </div>

                    </div>
                }
            </>
        )
    }

    // function: 신고 리스트 불러오기 response 처리 함수 //
    const getAccuseListResponse = (responseBody: GetAccuseListResponseDto | ResponseDto | null) => {

        if (!responseBody) {
            alert('서버에 문제가 있습니다.');
            return;
        }
        const message =
            !responseBody ? '서버에 문제가 있습니다.' :
                responseBody.code === 'VF' ? '유효하지 않은 데이터입니다.' :
                    responseBody.code === 'AF' ? '잘못된 접근입니다.' :
                        responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        const isSuccessed = responseBody !== null && responseBody.code === 'SU';
        if (!isSuccessed) {
            alert(message);
            return;
        }

        const accessToken = cookies[ACCESS_TOKEN];
        if (!accessToken) {
            alert('토큰 오류');
            return;
        }
        const { accuses } = responseBody as GetAccuseListResponseDto;

        setAccuseList(accuses);
    }

    useEffect(() => {
        const accessToken = cookies[ACCESS_TOKEN];
        if (!accessToken) {
            alert('접근 권한이 없습니다.');
            return;
        }

        if (signInUser?.userId) {
            setAdminCheck(signInUser.userId);
        }

        getAccuseListRequest('songth', accessToken)
            .then((response) => {
                getAccuseListResponse(response as GetAccuseListResponseDto | ResponseDto | null);
            });

        setActiveTypes('댓글')
    }, [signInUser]);

    // effect: 페이지네이션 적용//
    useEffect(() => {
        if (!accuseList) return;

        // 현재 선택된 신고 유형에 따라 필터링
        const filteredAccuses = accuseList.filter(accuse => {
            const reportType = activeTypes ? typeMapping[activeTypes] : null;
            return reportType && accuse.reportType === reportType;
        });

        setTotalList(filteredAccuses);
        const filteredTotalPage = Math.ceil(filteredAccuses.length / ITEMS_PER_PAGE);
        const filteredTotalSection = Math.ceil(filteredTotalPage / PAGES_PER_SECTION);

        setTotalPage(filteredTotalPage);
        setTotalSection(filteredTotalSection);
    }, [accuseList, activeTypes]);  // activeTypes가 바뀔 때마다 다시 필터링

    return (
        <div className="mypage-wrapper">
            <div className="admin-side-wrapper">
                <AdminSideBar />
            </div>
            <div className="mypage-main-wrapper">
                <div className="user-box">
                    <div className="main-profile"></div>
                    <div className="mypage-info">
                        <div className="mypage-nickname">관리자</div>
                        <div className="mypage-id">{signInUser?.nickName}</div>
                    </div>
                </div>
                <div className="mypage-state-message">관리자 계정 입니다. </div>
                <div className='accuse-title-box'>
                    <div className="accuse-title">신고 접수 목록</div>
                    <div className="discussion-state-box" onClick={onSortingButtonHandler}>{sortingState.selected}
                        {toggleDown && <div className="state-type-box" >
                            <div className="state-type" onClick={() => onSortOptionClickHandler('최신순')}>최신순</div>
                            <div className="state-type" onClick={() => onSortOptionClickHandler('누적 신고순')}>누적 신고순</div>
                        </div>}
                    </div>
                </div>
                <div className='accuse-box'>
                    {['댓글', '|', '게시글', '|', '채팅'].map((type) => (
                        <div
                            key={type}
                            className={`accuse-type ${activeTypes === type ? 'active' : ''}`}
                            onClick={() => onAccuseTypeClickHandler(type)}
                        >
                            {type}
                        </div>
                    ))}
                </div>
                <div className='accuse-table2'>
                    <div className='accuse-th'>번호</div>
                    <div className='accuse-th'>신고내용</div>
                    <div className='accuse-th'>신고글 작성자</div>
                    <div className='accuse-th'>신고자</div>
                    <div className='accuse-th'>신고 일시</div>
                    <div className='accuse-th'>신고 사유</div>
                </div>
                {viewList
                    .filter(accuse => {
                        const reportType = activeTypes ? typeMapping[activeTypes] : null;
                        return reportType && accuse.reportType === reportType;
                    })
                    .map((accuse, index) => {
                        return <Accusetr key={`${accuse.accuseId}-${index}`} accuse={accuse} index={index} />;
                    })}

                {/* 페이지네이션 UI */}
                <Pagination
                    pageList={pageList}
                    currentPage={currentPage}
                    onPageClickHandler={onPageClickHandler}
                    onPreSectionClickHandler={onPreSectionClickHandler}
                    onNextSectionClickHandler={onNextSectionClickHandler}
                />

                <div className='asscuse-title-box'>
                    <div className="accuse-title">처리 완료</div>
                </div>
                <div className='accuse-box complete'>
                </div>
                <div className='accuse-table'>
                    <div className='accuse-th'>번호</div>
                    <div className='accuse-th'>신고내용</div>
                    <div className='accuse-th'>신고글 작성자</div>
                    <div className='accuse-th'>신고자</div>
                    <div className='accuse-th'>신고 일시</div>
                    <div className='accuse-th'>누적 신고</div>
                    <div className='accuse-th'>처리 날짜</div>
                </div>
                {activeTypes === '댓글' ? <div className='accuse-table'>
                    <div className='accuse-tr'>1</div>
                    <div className='accuse-tr'>댓글</div>
                    <div className='accuse-tr'>@dorai5</div>
                    <div className='accuse-tr'>@normal</div>
                    <div className='accuse-tr'>25.01.01</div>
                    <div className='accuse-tr'>1</div>
                    <div className='accuse-tr'>25.01.01</div>
                </div>
                    : activeTypes === '게시글' ?
                        <div className='accuse-table'>
                            <div className='accuse-tr'>1</div>
                            <div className='accuse-tr'>게시글</div>
                            <div className='accuse-tr'>@dorai5</div>
                            <div className='accuse-tr'>@normal</div>
                            <div className='accuse-tr'>25.01.01</div>
                            <div className='accuse-tr'>1</div>
                            <div className='accuse-tr'>25.01.01</div>
                        </div>
                        : activeTypes === '채팅' ?
                            <div className='accuse-table'>
                                <div className='accuse-tr'>1</div>
                                <div className='accuse-tr'>채팅</div>
                                <div className='accuse-tr'>@dorai5</div>
                                <div className='accuse-tr'>@normal</div>
                                <div className='accuse-tr'>25.01.01</div>
                                <div className='accuse-tr'>1</div>
                                <div className='accuse-tr'>25.01.01</div>

                            </div> : ''}
            </div>
            <div className="blacklist-wrapper">
                <div className="blacklist-title">활동 중지 2명</div>
                <div className="subscribe-search-box">
                    <input className="input" placeholder="아이디를 입력하세요. " />
                    <div className="button active">검색</div>
                </div>
                <div className="blacklist-box">
                    <div className="blacklist-image"></div>
                    <div className="blacklist-user-info">
                        <div className="blacklist-nickname">마이멜로디</div>
                        <div className="blacklist-user">@1000JEA</div>
                    </div>
                    <div className="subscribe-cancel-button">
                        <div className="subscribe-cancel">취소</div>
                    </div>
                </div>
            </div>
        </div>

    )
}
