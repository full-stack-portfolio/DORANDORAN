import React, { useState } from 'react'
import './style.css';
import AccuseComponentProps from '../../../types/accuseList.interface';
import { useParams } from 'react-router';
import ResponseDto from '../../../apis/dto/response/response.dto';
import { postAccuseRequest } from '../../../apis';
import { PostAccuseRequestDto } from '../../../apis/dto/request/accuse';
import { ACCESS_TOKEN } from '../../../constants';
import { useCookies } from 'react-cookie';
import DiscussionData from '../../../types/discussionData.interface';
import { useSignInUserStore } from '../../../stores';
interface accuseModalProps {
    cancelHandler: () => void;
    accuse?: AccuseComponentProps;
    discussionData: DiscussionData | null;
}

// component: 신고하기 모달창 컴포넌트 //
export default function AccuseModal({ accuse, cancelHandler, discussionData }: accuseModalProps) {
    const { roomId } = useParams<{ roomId: string }>();
    const [cookies] = useCookies();
    const { signInUser } = useSignInUserStore();
    const discussionId = signInUser?.userId;
    const [selectedReportReason, setSelectedReportReason] = useState<string | null>(null);
    const [reportTarget, setReportTarget] = useState<{ type: 'POST' | 'COMMENT'; id: number | null }>({
        type: 'POST',
        id: roomId ? parseInt(roomId, 10) : null,
    });

    // function: 신고 사유 작성 //
    const handleReportSubmit = () => {
        if (!selectedReportReason) {
            alert('신고 사유를 선택해 주세요.');
            return;
        }
        cancelHandler();

        const accessToken = cookies[ACCESS_TOKEN];
        if (!accessToken) {
            alert('토큰 오류');
            return;
        }

        const formatDate = (date: Date): string => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0'); // 1월 = 0이므로 +1 필요
            const day = String(date.getDate()).padStart(2, '0');

            const days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
            const dayOfWeek = days[date.getDay()];

            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');

            return `${year}. ${month}. ${day}. ${dayOfWeek} ${hours}:${minutes}`;
        };

        const now = new Date();
        const accuseDate = formatDate(now);

        const requestBody: PostAccuseRequestDto = {
            reportType: 'POST',
            reportContents: selectedReportReason,
            userId: discussionId as string,
            accuseUserId: discussionData?.userId as string,
            postId: reportTarget.id,
            replyId: null,
            accuseDate: accuseDate
        }
        postAccuseRequest(requestBody, accessToken).then(postAccuseResponse);
    };

    // function: post accuse response 처리 함수 //
    const postAccuseResponse = (responseBody: ResponseDto | null) => {
        const message =
            !responseBody ? '서버에 문제가 있습니다.' :
                responseBody.code === 'VF' ? '유효하지 않은 데이터입니다.' :
                    responseBody.code === 'AF' ? '잘못된 접근입니다.' :
                        responseBody.code === 'NS' ? '자기신이 올린 글은 신고가 불가능 합니다.' :
                            responseBody.code === 'NT' ? '신고할려는 항목이 존재하지 않습니다.' :
                                responseBody.code === 'DA' ? '이미 신고를 하셨습니다.' : '';

        const isSuccessed = responseBody !== null && responseBody.code === 'SU';
        if (!isSuccessed) {
            alert(message);
            return;
        }

        alert('정상적으로 신고가 접수되었습니다.');
    }

    return (
        <div>
            <div className="report-modal">
                <div className="report-modal-content">
                    <h3>신고 사유 선택</h3>
                    <div className='report-modal-labels'>
                        <div>
                            <label>
                                <input
                                    type="radio"
                                    value="폭력성"
                                    checked={selectedReportReason === '폭력성'}
                                    onChange={(e) => setSelectedReportReason(e.target.value)}
                                />
                                폭력성
                            </label>
                        </div>
                        <div>
                            <label>
                                <input
                                    type="radio"
                                    value="선정성"
                                    checked={selectedReportReason === '선정성'}
                                    onChange={(e) => setSelectedReportReason(e.target.value)}
                                />
                                선정성
                            </label>
                        </div>
                        <div>
                            <label>
                                <input
                                    type="radio"
                                    value="따돌림 또는 왕따"
                                    checked={selectedReportReason === '따돌림 또는 왕따'}
                                    onChange={(e) => setSelectedReportReason(e.target.value)}
                                />
                                따돌림 또는 왕따
                            </label>
                        </div>
                        <label>
                            <input
                                type="radio"
                                value="도배"
                                checked={selectedReportReason === '도배'}
                                onChange={(e) => setSelectedReportReason(e.target.value)}
                            />
                            도배
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="개인정보 유출"
                                checked={selectedReportReason === '개인정보 유출'}
                                onChange={(e) => setSelectedReportReason(e.target.value)}
                            />
                            개인정보 유출
                        </label>
                    </div>
                    <div className="modal-buttons">
                        <button onClick={cancelHandler}>취소</button>
                        <button onClick={handleReportSubmit}>신고하기</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
