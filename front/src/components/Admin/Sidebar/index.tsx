import React, { useState } from 'react'
import './style.css';
import { ADMIN_ABSOLUTE_ACCUSE_PATH, ADMIN_ABSOLUTE_MILEAGE_PATH, ADMIN_ABSOULTE_PATH } from '../../../constants';
import { useNavigate } from 'react-router-dom';
export default function AdminSideBar() {
    // state: 관리자 사이드바 상태 //
    const [sideIndex, setSideIndex] = useState<number | null>(null);

    // function: 네비게이터 함수 //
    const navigator = useNavigate();
    const sidenavi :(()=>void)[] = [
        ()=> navigator(ADMIN_ABSOULTE_PATH),
        ()=> navigator(ADMIN_ABSOLUTE_ACCUSE_PATH),
        ()=> navigator(ADMIN_ABSOLUTE_MILEAGE_PATH)
    ];

    // event handler: 관리자 사이드바 메뉴 아이템 클릭 이벤트 처리 함수 //
    const onSideButtonHandler = (index:number)=>{
        setSideIndex(index)
        sidenavi[index]();
    }
    return (
        <>
        <div className="admin-title">관리자 페이지</div>
                <div className="admin-menu-box">
                    {['실시간 토론방 현황', '신고 관리','마일리지 관리'].map((item, index)=>(
                        <div 
                            key={index} 
                        className={`admin-menu-item ${sideIndex === index ? 'clicked': ''}`} 
                        onClick={() => onSideButtonHandler(index)}>
                            {item}
                        </div>
                    ))}
                </div>
        </>
    )
}
