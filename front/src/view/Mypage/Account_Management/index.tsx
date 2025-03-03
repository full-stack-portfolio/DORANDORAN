import React, { useEffect, useState } from 'react';
import './style.css';
import MypageSidebar from '../../../components/mypage/sidebar';
import { FaTrashAlt } from 'react-icons/fa';
import { getAccounts, postAccount, deleteAccount } from '../../../apis';
import { useCookies } from 'react-cookie';
import { PostAccountRequestDto } from '../../../apis/dto/request/account/post-account.request.dto';

// 은행 목록
const bankList = [
    "국민은행", "신한은행", "우리은행", "하나은행", "농협은행",
    "기업은행", "SC제일은행", "씨티은행", "카카오뱅크", "토스뱅크",
    "우체국", "새마을금고", "신협", "수협", "산업은행"
];

export default function AccountManagement() {
    const [cookies] = useCookies();
    const accessToken = cookies.accessToken;

    const [selectedBank, setSelectedBank] = useState<string>('');
    const [accountNumber, setAccountNumber] = useState<string>('');
    const [accountAlias, setAccountAlias] = useState<string>('');
    const [accounts, setAccounts] = useState<PostAccountRequestDto[]>([]);

    useEffect(() => {
        async function fetchAccounts() {
            if (!accessToken) {
                console.warn("🚨 No Access Token! Redirecting to login...");
                return;  // ✅ 토큰이 없으면 API 요청 안 함
            }

            try {
                const data = await getAccounts(accessToken);
                if (data) setAccounts(data);
            } catch (error) {
                console.error("🚨 Error fetching accounts:", error);
            }
        }
        fetchAccounts();
    }, [accessToken]);

    const handlePostAccount = async () => {
        if (!selectedBank || !accountNumber || !accountAlias) {
            alert('모든 항목을 입력해주세요.');
            return;
        }
        if (!accessToken) {
            alert('로그인이 필요합니다.');
            return;
        }

        const newAccount: PostAccountRequestDto = {
            bankName: selectedBank,
            accountNumber,
            accountAlias,
        };

        try {
            const response = await postAccount(newAccount, accessToken);
            if (response?.code === "SU") {
                setAccounts([...accounts, newAccount]);
                setSelectedBank('');
                setAccountNumber('');
                setAccountAlias('');
            } else {
                alert("계좌 등록에 실패했습니다.");
            }
        } catch (error) {
            console.error("🚨 Error posting account:", error);
        }
    };

    const handleDeleteAccount = async (accountNumber: string) => {
        if (!accessToken) {
            alert('로그인이 필요합니다.');
            return;
        }

        try {
            const response = await deleteAccount(accountNumber, accessToken);
            if (response?.code === "SU") {
                setAccounts(accounts.filter(account => account.accountNumber !== accountNumber));
            } else {
                alert("계좌 삭제에 실패했습니다.");
            }
        } catch (error) {
            console.error("🚨 Error deleting account:", error);
        }
    };

    return (
        <div id="account-management-wrapper">
            <MypageSidebar />
            <div id="account-management-main-wrapper">
                
                {/* 계좌 등록 섹션 */}
                <div className="account-form">
                    <h3>계좌 등록</h3>
                    <div className="bank-select">
                        <label>은행 선택</label>
                        <div className="bank-options">
                            {bankList.map((bank, index) => (
                                <label key={index} className={`bank-option ${selectedBank === bank ? 'selected' : ''}`}>
                                    <input
                                        type="radio"
                                        name="bank"
                                        value={bank}
                                        checked={selectedBank === bank}
                                        onChange={() => setSelectedBank(bank)}
                                    />
                                    {bank}
                                </label>
                            ))}
                        </div>
                    </div>
                    <input
                        type="text"
                        placeholder="계좌 번호 입력"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="계좌 별명 입력"
                        value={accountAlias}
                        onChange={(e) => setAccountAlias(e.target.value)}
                    />
                    <button onClick={handlePostAccount} className="register-button">
                        계좌 등록
                    </button>
                </div>

                {/* 등록된 계좌 목록 */}
                <div className="registered-accounts">
                    <h3>등록된 계좌</h3>
                    <div className="accounts-list">
                        {accounts.length > 0 ? (
                            accounts.map((account) => (
                                <div key={account.accountNumber} className="account-item">
                                    <div className="bank-logo">{account.bankName.charAt(0)}</div>
                                    <div className="account-info">
                                        <div className="account-alias">{account.accountAlias}</div>
                                        <div className="account-number">{account.accountNumber}</div>
                                    </div>
                                    <FaTrashAlt className="delete-icon" onClick={() => handleDeleteAccount(account.accountNumber)} />
                                </div>
                            ))
                        ) : (
                            <p className="no-accounts">등록된 계좌가 없습니다.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
