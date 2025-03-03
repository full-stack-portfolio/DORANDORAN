import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import './style.css';
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN, MY_PATH } from '../../../constants';
import { useSignInUserStore } from '../../../stores';
import PatchProfileRequestDto from '../../../apis/dto/request/mypage/myInfo/patch-profile.request.dto';
import { fileUploadRequest, patchProfileRequest } from '../../../apis';
import { useCookies } from 'react-cookie';
import ResponseDto from '../../../apis/dto/response/response.dto';

// component: 내 정보 수정 화면 컴포넌트 //
export default function Update() {

    // variable: 기본 이미지 URL //
    const defaultProfileImageUrl = 'http://localhost:3000/defaultProfile.png';

    // state: 쿠키 상태 //
    const [cookies, setCookie] = useCookies();

    // state: 로그인 유저 정보 상태 //
    const { signInUser, setSignInUser } = useSignInUserStore();

    // state: 내정보 입력 상태 //
    const [nickname, setNickName] = useState<string>('');
    const [stateMessage, setStateMessage] = useState<string>('');
    const [state] = useState<boolean>(true);  

    // state: 등록 파일 상태 //
    const storeUrlInputRef = useRef<HTMLInputElement | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>(defaultProfileImageUrl);
    const [storeImageUrl, setStoreImageUrl] = useState<File | null>(null);
    
    // variable: access token //
    const accessToken = cookies[ACCESS_TOKEN];

    // function: navigator 함수 처리 //
    const navigator = useNavigate();

    // event handler: 닉네임 변경 이벤트 처리 함수 //
    const onNickNameChangeHandler = (event:ChangeEvent<HTMLInputElement>)=> {
        const {value} = event.target;
        setNickName(value);
    }

    // event handler: 상태메세지 변경 이벤트 처리 함수 //
    const onStateMessageChangeHandler = (event:ChangeEvent<HTMLInputElement>)=> {
        const { value } = event.target;
        setStateMessage(value);
    }

    // event handler: 이미지 클릭 이벤트 핸들러 //
    const onStoreImageClickHandler = () => {
        const { current } = storeUrlInputRef;
        if (!current) return;
        current.click();
    };

    // event handler: 대표 이미지 파일 선택 //
    const onStoreUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target;
        if (!files || !files.length) return;

        const file = files[0];
        setStoreImageUrl(file);

        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onloadend = () => {
            setPreviewUrl(fileReader.result as string);
        }
    };

    // event handler: 수정 완료 버튼 클릭 이벤트 처리 함수 //
    const onCompleteButtonHandler = async() => {
        if (!nickname || !signInUser) return;

        let url: string | null = null;
        if (storeImageUrl) {
            const formData = new FormData();
            formData.append('file', storeImageUrl);
            url = await fileUploadRequest(formData);
        }

        const requestBody : PatchProfileRequestDto = {
            nickName: nickname,
            profileImage: url,
            statusMessage: stateMessage,
        }
        console.log(requestBody);
        patchProfileRequest(requestBody, accessToken).then(patchProfileResponse);
    }

    // function: 프로필 수정 완료 처리 함수 //
    const patchProfileResponse = (responseBody: ResponseDto | null) => {
    
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
        }

        navigator(MY_PATH);
        window.location.reload();
    };

    // effect: 기존 정보 불러오기 //
    useEffect(()=> {
        if(signInUser) {
            setNickName(signInUser.nickName);
            setStateMessage(signInUser.statusMessage ?? '');
            setPreviewUrl(signInUser.profileImage ?? defaultProfileImageUrl);
        }
    }, [signInUser]);

    // render: 내정보 수정 화면 렌더링 
    return (
        <div className="mypage-update-wrapper">
            <div className="mypage-main-wrapper">
                <div className="user-box">
                    <div id='image'>
                        <div className="main-profile" onClick={onStoreImageClickHandler}
                            style={{ backgroundImage: `url(${previewUrl})` }}>
                            <input ref={storeUrlInputRef} style={{ display: 'none' }} type='file' accept='image/*' onChange={onStoreUrlChange} />
                        </div>
                    </div>

                    <div className="mypage-info">
                        <input className="mypage-nickname edit" value={nickname} placeholder='닉네임을 입력해주세요. ' onChange={onNickNameChangeHandler}/>
                        <div className="mypage-id">@{signInUser?.userId}</div>
                    </div>
                    <div className="mypage-user">구독자 <span>28</span>명 / 토론방<span>9</span>개</div>
                    <div className="edit-button-box" >
                        <div className={`edit-button ${nickname ? 'complete' : 'fail'}` } onClick={onCompleteButtonHandler}>완료</div>
                    </div>
                </div>
                <input className="mypage-state-message edit" value={stateMessage} 
                placeholder='상태메세지를 입력해주세요 'onChange={onStateMessageChangeHandler}/>
                <div className="mypage-discussion-room">내가 개설한 토론방</div>
                <div className="myapge-middle-box">
                    <div className="mypage-middle-icon"></div>
                    <div className="mypage-middle-nickname">별별이</div>
                </div>
                <div className="discussion-room-list">
                    <div className="discussion-image"></div>
                    <div className="discussion-info">
                        <div className="discussion-title-box">
                            <div className="discussion-title">대마초 합법화</div>
                            <div className="discussion-icon"></div>
                        </div>
                        <div className="discussion-contents">범죄 감소와 세수 증대 효과가 있다. vs 건강 문제와 사회적 부작용이 우려된다.</div>
                        <div className="discussion-bottom">
                            <div className="discussion-bottom-box">
                                <div className="discussion-created">20204.12.30 16:30</div>
                                <div className="discussion-fixed">(수정됨)</div>
                                {!state ? <div className="discussion-state-box continue">
                                    <div className="discussion-state ">진행중</div>
                                </div> :
                                <div className="discussion-state-box end">
                                    <div className="discussion-state ">종료</div>
                                </div>
                                }
                            </div>
                            <div className="discussion-icons">
                                <div className="discussion-comment-icon"></div>
                                <div className="discussion-comment">25</div>
                                <div className="discussion-like-icon"></div>
                                <div className="discussion-like">127</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="subscribe-wrapper">
                <div className="subscribe-title">내가 구독한 사람 2명</div>
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
    )
}
