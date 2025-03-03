import React, { useState } from 'react';
import './style.css';
import { ACCESS_TOKEN, GEN_DISC_ABSOLUTE_PATH } from '../../../constants';
import Modal from '../../../components/modal';
import ResponseDto from '../../../apis/dto/response/response.dto';
import { useCookies } from 'react-cookie';
import PostDiscussionWirteRequestDto from '../../../apis/dto/request/gd_discussion/post-discussion-wirte.request.dto';
import { fileUploadeRequest, postDiscussionRequest } from '../../../apis';
import useStore from '../../../stores/sign-in-user.store';
import { useNavigate, useParams } from 'react-router-dom';
import { access } from 'fs';

export default function GDWrite() {

    const defaultProfileImageUrl = 'https://blog.kakaocdn.net/dn/4CElL/btrQw18lZMc/Q0oOxqQNdL6kZp0iSKLbV1/img.png';
    
    const [firstOpinion, setFirstOpinion] = useState<string>('찬성');
    const [secondOpinion, setSecondOpinion] = useState<string>('반대');
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [category, setCategory] = useState<string>('시사·교양');
    const [image, setImage] = useState<File | string | null>(null);
    const [deadline, setDeadline] = useState<string>('');
    const [showModal, setShowModal] = useState<boolean>(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [cookies] = useCookies();
    const {signInUser} = useStore();

    // state: params 상태 관리 //
    const { roomId } = useParams();

    // function: navigator 함수 처리 //
    const navigator = useNavigate();
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const first = firstOpinion || '찬성';
        const second = secondOpinion || '반대';

        const newErrors: { [key: string]: string } = {};
        if (!title) newErrors.title = '내용을 입력해주세요.';
        if (!content) newErrors.content = '내용을 입력해주세요.';
        if (!deadline) newErrors.deadline = '마감일을 입력해주세요.';

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            setShowModal(true);
        }
    };

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const minDate = tomorrow.toISOString().split('T')[0]; // 내일 날짜 가져오기

    // function: 일반 토론방 작성 response 처리 함수 //
    const writeDiscussionResponse = (responseBody: ResponseDto | null) => {
        const message = 
            !responseBody ? '서버에 문제가 있습니다. ':
            responseBody.code === "VF" ? '값을 모두 입력하세요 ':
            responseBody.code === "DBE" ? '서버에 문제가 있습니다. ':
            responseBody.code === "AF" ? '서버에 문제가 있습니다.' : '';

        const isSuccessed = responseBody !== null && responseBody.code === 'SU';
        if (!isSuccessed) {
            alert(message);
            return;
        }
        navigator(GEN_DISC_ABSOLUTE_PATH)
    }

    // event handler: 게시전 주의 사항 알림 이벤트 처리 //
    const onCautionAlarmHandler = () => {
        alert('*주의 한번 게시한 게시물은 수정이 불가합니다.*')
    }

    // event handler: 게시하기 버튼 클릭 이벤트 처리//
    const onRegisterClickHandler = async() => {
        const accessToken = cookies[ACCESS_TOKEN];
        if(!accessToken) return;

        if (!signInUser) return;

        let url: string | null = null;
        if (image) {
            const formData = new FormData();
            formData.append('file', image);
            url = await fileUploadeRequest(formData);
        };
        url = url ? url : defaultProfileImageUrl;

        const requestBody: PostDiscussionWirteRequestDto = {

            userId:signInUser.userId, discussionType:category, roomTitle:title,
            roomDescription:content, discussionImage:url, discussionEnd:deadline, 
            agreeOpinion:firstOpinion, oppositeOpinion:secondOpinion
        };
        postDiscussionRequest(requestBody, accessToken).then(writeDiscussionResponse);
    }

    return (
        <div id="gd-write-wrapper">
            <div className="gd-write-wrapper-in">
                <div className='gd-write-box'>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="category">카테고리 *</label>
                        <select
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="시사·교양">시사·교양</option>
                            <option value="과학">과학</option>
                            <option value="경제">경제</option>
                            <option value="기타">기타</option>
                        </select>

                        <label htmlFor="title">제목 *</label>
                        <input
                            type="text"
                            id="title"
                            placeholder="제목을 입력하세요"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        {errors.title && <span className="error-message">{errors.title}</span>}

                        <label htmlFor="content">본문 *</label>
                        <textarea
                            id="content"
                            placeholder="본문을 입력하세요"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            style={{ resize: 'none', height: '300px' }}
                        />
                        {errors.content && <span className="error-message">{errors.content}</span>}

                        <label htmlFor="image">이미지 (선택사항)</label>
                        <input
                            type="file"
                            id="image"
                            accept="image/*"
                            onChange={(e) => {
                                if (e.target.files) {
                                    setImage(e.target.files[0]);
                                }
                                else{
                                    setImage(defaultProfileImageUrl);
                                }
                            }}
                        />
                        {image && (
                            <div className="image-preview">
                                <img
                                    src={typeof image === 'string' ? image : URL.createObjectURL(image)}
                                    alt="미리보기"
                                />
                            </div>
                        )}

                        <label htmlFor="firstOpinion">첫번째 의견 (미입력 시 '찬성'으로 게시됩니다)</label>
                        <input
                            type="text"
                            id="firstOpinion"
                            placeholder="첫번째 의견을 입력하세요"
                            value={firstOpinion}
                            onChange={(e) => !firstOpinion ? setFirstOpinion(e.target.value): setFirstOpinion('찬성')}
                        />

                        <label htmlFor="secondOpinion">두번째 의견 (미입력 시 '반대'로 게시됩니다)</label>
                        <input
                            type="text"
                            id="secondOpinion"
                            placeholder="두번째 의견을 입력하세요"
                            value={secondOpinion}
                            onChange={(e) => !secondOpinion ? setSecondOpinion(e.target.value):setSecondOpinion('반대')}
                        />

                        <label htmlFor="deadline">토론 마감일 *</label>
                        <input
                            type="date"
                            id="deadline"
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                            min={minDate}
                        />
                        {errors.deadline && <span className="error-message">{errors.deadline}</span>}

                        <div className="button-container">
                            <button type="submit" onClick={onCautionAlarmHandler}>게시하기</button>
                        </div>
                    </form>
                </div>
            </div>

            {showModal && (
                <Modal 
                content="게시하시겠습니까? " 
                lt_btn='아니요' 
                rt_btn='예' 
                lt_handler={()=>setShowModal(false)} 
                rt_handler={onRegisterClickHandler}/>
            )}
        </div>
    );
}
