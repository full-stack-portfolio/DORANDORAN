import React from 'react';
import './style.css';

export default function Footer() {
    return (
        <div id='footer'>
            <div className='footer-in-box'>
                <div className='footer-title-logo'>
                    <div style={{ fontWeight: '600' }}>도란도란</div>
                    <div style={{ fontSize: '12px' }}> &copy; 2025 Team 도란도란. All rights reserved</div>
                </div>
                <div className='footer-content'>
                    <div>이메일: DoranDoran@email.com</div>
                    <div>대표자: 박현우, 송태휘, 정호정, 김도연</div>
                    <div>최종 업데이트: 2025.01.01</div>
                </div>
            </div>
        </div>
    );
}
