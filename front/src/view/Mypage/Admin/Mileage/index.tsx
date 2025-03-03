import React, { useEffect, useState } from 'react';
import './style.css';
import AdminSideBar from '../../../../components/Admin/Sidebar';
import Modal from '../../../../components/modal';
import { useCookies } from 'react-cookie';
import { giveMileage, getRefundRequests, updateRefundStatus } from '../../../../apis';
import { MileageRequestDto } from '../../../../apis/dto/response/get-mileage.response.dto';

export default function Mileage() {
    const [cookies] = useCookies();
    const accessToken = cookies.accessToken;

    // 상태 관리
    const [activeTypes, setActiveTypes] = useState<string>('대기중');
    const [refundRequests, setRefundRequests] = useState<MileageRequestDto[]>([]);
    const [selectedRefund, setSelectedRefund] = useState<MileageRequestDto | null>(null);

    // 마일리지 지급 관련 상태
    const [userId, setUserId] = useState<string>('');
    const [amount, setAmount] = useState<number | ''>('');
    const [reason, setReason] = useState<string>('');
    const [customReason, setCustomReason] = useState<string>('');

    useEffect(() => {
        if (!accessToken) {
            alert("로그인이 필요합니다.");
            return;
        }

        async function fetchRefundRequests() {
            const data = await getRefundRequests(accessToken);
            if (data) setRefundRequests(data);
        }

        fetchRefundRequests();
    }, [accessToken]);

    // 마일리지 지급 핸들러
    const handleGiveMileage = async () => {
        if (!userId || !amount || !reason) {
            alert('모든 입력란을 정확히 입력해 주세요.');
            return;
        }

        const finalReason = reason === '기타' ? customReason : reason;

        const requestBody = { userId, amount, reason: finalReason };
        const response = await giveMileage(requestBody, accessToken);

        if (response && response.code === "SU") {
            alert(`마일리지 ${amount}p 지급 완료`);
            setUserId('');
            setAmount('');
            setReason('');
            setCustomReason('');
        } else {
            alert('마일리지 지급 실패. 다시 시도해 주세요.');
        }
    };

    const handleUpdateRefundStatus = async (mileageId: number, status: string) => {
        const response = await updateRefundStatus(mileageId, status, accessToken);

        if (response && response.code === "SU") {
            alert(`환급 요청이 ${status} 처리되었습니다.`);
            setRefundRequests(prev =>
                prev.map(req => (req.mileageId === mileageId ? { ...req, status } : req))
            );
        } else {
            alert('처리에 실패했습니다.');
        }
    };

    return (
        <div id="admin-mypage-wrapper">
            <div className="admin-side-wrapper">
                <AdminSideBar />
            </div>
            <div className='send-mileage-box'>
                <div className='send-mileage'>
                    <div className="accuse-title">마일리지 지급</div>
                    <div className="input-box">
                        <div>
                            <label>사용자 아이디</label>
                            <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="지급할 사용자 아이디" />
                        </div>
                        <div>
                            <label>금액</label>
                            <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} placeholder="금액 입력" min="1" />
                        </div>
                        <div>
                            <label>지급 사유</label>
                            <div className="radio-group">
                                {['생일 축하금', '실시간 토론 참여', '일반 토론 댓글 작성', '기타'].map((option) => (
                                    <label key={option} className={`radio-label ${reason === option ? 'active' : ''}`}>
                                        <input type="radio" name="reason" value={option} checked={reason === option} onChange={() => setReason(option)} />
                                        {option}
                                    </label>
                                ))}
                            </div>
                        </div>
                        {reason === '기타' && (
                            <div>
                                <label>기타 사유 입력</label>
                                <input type="text" value={customReason} onChange={(e) => setCustomReason(e.target.value)} placeholder="직접 입력" />
                            </div>
                        )}
                        <div className='send-mileage-button-box'>
                            <button onClick={handleGiveMileage} className="send-mileage-button">마일리지 지급</button>
                        </div>
                    </div>
                </div>

                {/* 환급 신청 목록 */}
                <div className="mypage-main-wrapper">
                    <div className="accuse-title">환급 신청 목록</div>
                    <div className="accuse-box">
                        {['대기중', '|', '처리 완료'].map((type) => (
                            <div key={type} className={`accuse-type ${activeTypes === type ? 'active' : ''}`} onClick={() => setActiveTypes(type)}>
                                {type}
                            </div>
                        ))}
                    </div>
                    <table className="refund-table">
                        <thead>
                            <tr>
                                <th>번호</th>
                                <th>사용자</th>
                                <th>신청 금액</th>
                                <th>계좌번호</th>
                                <th>은행</th>
                                <th>신청 일시</th>
                                {activeTypes === '처리 완료' && <th>상태</th>}
                                {activeTypes === '대기중' && <th>처리</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {refundRequests.length > 0 ? (
                                refundRequests
                                    .filter(req => (activeTypes === '대기중' ? req.status === '승인 대기' : req.status !== '승인 대기'))
                                    .map((request, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{request.userId}</td>
                                            <td>{request.amount}p</td>
                                            <td>{request.accountNumber}</td>
                                            <td>{request.bankName}</td>
                                            <td>{new Date(request.transactionDate).toISOString().slice(0, 16).replace('T', ' ')}</td>
                                            {activeTypes === '처리 완료' && <td>{request.status}</td>}
                                            {request.status === "승인 대기" && (
                                                <td className='btns'>
                                                    <button className="action-button approve-btn" onClick={() => handleUpdateRefundStatus(request.mileageId, "승인")}>승인</button>
                                                    <button className="action-button reject-btn" onClick={() => handleUpdateRefundStatus(request.mileageId, "반려")}>반려</button>
                                                </td>
                                            )}
                                        </tr>
                                    ))
                            ) : (
                                <tr>
                                    <td colSpan={8} style={{ textAlign: 'center' }}>환급 요청 내역이 없습니다.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
