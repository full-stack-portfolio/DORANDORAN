import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useEffect, useState } from 'react';
import { EventInput } from '@fullcalendar/core';
import './style.css'; // CSS 파일
import { useNavigate } from 'react-router-dom';
import { MY_ABSOLUTE_ATTENDANCE_CHECK_PATH, MY_ABSOLUTE_MILEAGE_PATH, MY_INFO_PW_ABSOLUTE_PATH } from '../../../constants';
import { FaUserEdit, FaCoins, FaHistory, FaCalendarCheck } from "react-icons/fa";
import { useSignInUserStore } from '../../../stores';
import MypageSidebar from '../../../components/mypage/sidebar';

export default function Attendance() {
  const [attendanceDates, setAttendanceDates] = useState<string[]>([]);
  const [events, setEvents] = useState<EventInput[]>([]);

  // state: 로그인 유저 정보 상태 //
  const { signInUser, setSignInUser } = useSignInUserStore();


  const handleAttendance = () => {
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD 형식

    if (attendanceDates.includes(today)) {
      alert("이미 출석 체크되었습니다.");
      return;
    }


    // 출석 날짜 저장
    setAttendanceDates([...attendanceDates, today]);

    // 이벤트 상태 업데이트
    setEvents((prev) => [
      ...prev,
      {
        title: "", // 제목을 비워두고 이미지로만 표시
        start: today,
        allDay: true,
        // extendedProps: {
        //   url: '/public/mypage/attendance.png', // 표시할 이미지 URL
        // },
        display: 'background'
      },
    ]);
  };


  // function: 네비게이터 함수 처리 //
  const navigator = useNavigate();

  // effect: //
  useEffect(() => {
    console.log(signInUser);
  }, []);

  return (
    <div className='mypage-wrapper'>
      <MypageSidebar />
      <div className='mypage-attendance-wrapper'>
        <div id='main-calendar'>
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={events}
            eventContent={(info) => {
              return (
                <div className="attendance-event">
                  <div className='attendance-check' />
                </div>

              );
            }}
            eventDidMount={(info) => {
              // 이미지가 있는 이벤트에 스타일 적용
              info.el.style.backgroundColor = 'rgba(255, 255, 255, 1)'; // 배경색
              info.el.style.border = 'none'; // 기본 테두리 제거
              info.el.style.backgroundImage = `url(/public/mypage/attendance.png)`;
            }}
          />

          <button onClick={handleAttendance}>출석체크</button>
        </div>
      </div>
    </div>
  );
}
