import React, { useEffect, useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import './style.css';
import ResponseDto from '../../apis/dto/response/response.dto';
import { PostScheduleRequestDto } from '../../apis/dto/request/schedule';
import { getScheduleListRequest, postScheduleRequest } from '../../apis';
import { useCookies } from 'react-cookie';
import { ACCESS_TOKEN } from '../../constants';
import ScheduleComponentProps from '../../types/schedule.interface';
import { GetScheduleListResponseDto } from '../../apis/dto/response/schedule';

export default function MyCalendar() {

    // state: cookie 상태 //
    const [cookies] = useCookies();

    const [events, setEvents] = useState<ScheduleComponentProps[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentEvent, setCurrentEvent] = useState<any>(null);

    const handleEventClick = (clickInfo: any) => {
        setCurrentEvent(clickInfo.event);
        setModalOpen(true);
        // alert(`이벤트: ${clickInfo.event.title}, 날짜: ${clickInfo.event.start}, locatioin: ${clickInfo.event.extendedProps.location}, description: ${clickInfo.event.extendedProps.description}`);
    };

    const formatDateString = (dateStr: string): string => {
        // 날짜 문자열에서 불필요한 한글(요일) 제거
        const dateWithoutDay = dateStr.replace(/월요일|화요일|수요일|목요일|금요일|토요일|일요일/g, "").trim();

        // "2025. 02. 08. 12:41" 형태로 남으므로, 이를 분해
        const [year, month, day, time] = dateWithoutDay.split(". ").map(s => s.trim());

        // 원하는 형식으로 조합
        return `${year}-${month}-${day}T${time}:00`;
    };

    const schedule = events.map(schedule => {
        const parsedDate = formatDateString(schedule.scheduleDate);
        return {
            title: schedule.title,
            start: parsedDate ? parsedDate.toString() : undefined, // 변환된 날짜를 ISO 형식으로
            extendedProps: { link: schedule.link, description: schedule.description }
        };
    }).filter(event => event.start !== null); // 유효하지 않은 날짜는 제외

    const schedules = [...schedule];

    // function: 스케줄 리스트 불러오기 response 처리 함수 //
    const getScheduleListResponse = (responseBody: GetScheduleListResponseDto | ResponseDto | null) => {

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
        const { schedules } = responseBody as GetScheduleListResponseDto;

        setEvents(schedules);
    }

    // effect: 마운트 될 때 일정 불러오기 //
    useEffect(() => {

        const accessToken = cookies[ACCESS_TOKEN];
        if (!accessToken) {
            alert('접근 권한이 없습니다.');
            return;
        }

        console.log('접근');
        getScheduleListRequest(accessToken)
            .then((response) => getScheduleListResponse(response as GetScheduleListResponseDto | ResponseDto | null));
    }, []);

    // component: 일정 작성 모달창 //
    function WriteDaily() {

        const [modalOpen, setModalOpen] = useState(false);
        const modalBackground = useRef<HTMLDivElement | null>(null);

        const [title, setTitle] = useState<string>('');
        const [date, setDate] = useState<string>('');
        const [link, setLink] = useState<string>('');
        const [description, setDescription] = useState<string>('');

        // function: 날짜 형식 고정 //
        const handleSave = () => {
            const formatDate = (dateString: string): string => {
                const dateObj = new Date(dateString);
                const days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];

                const year = dateObj.getFullYear();
                const month = String(dateObj.getMonth() + 1).padStart(2, '0');
                const day = String(dateObj.getDate()).padStart(2, '0');
                const dayOfWeek = days[dateObj.getDay()];
                const hours = String(dateObj.getHours()).padStart(2, '0');
                const minutes = String(dateObj.getMinutes()).padStart(2, '0');

                return `${year}. ${month}. ${day}. ${dayOfWeek} ${hours}:${minutes}`;
            };

            const formattedDate = formatDate(date);

            const accessToken = cookies[ACCESS_TOKEN];
            if (!accessToken) {
                alert('토큰 오류');
                return;
            }

            const requestBody: PostScheduleRequestDto = {
                title: title,
                scheduleDate: formattedDate,
                link: link,
                description: description
            };

            postScheduleRequest(requestBody, accessToken).then(postScheduleResponse);

            setModalOpen(false);
            window.location.reload()
        };

        const handleClose = () => {
            setModalOpen(false);
        };

        // function: post schedule response 처리 함수 //
        const postScheduleResponse = (responseBody: ResponseDto | null) => {
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
        }

        return (
            <div id='schedule-modal'>
                <button type="submit" onClick={() => setModalOpen(true)}>일정 추가</button>
                {
                    modalOpen &&
                    <div className='modal-container' ref={modalBackground} onClick={e => {
                        if (e.target === modalBackground.current) {
                            setModalOpen(false);
                        }
                    }}>
                        <div className="event-form">
                            <h2>일정 입력</h2>
                            <div className="form-group">
                                <label>일정 제목:</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                    placeholder="일정 제목을 입력하세요"
                                />
                            </div>
                            <div className="form-group">
                                <label>날짜:</label>
                                <div className="date-group">
                                    <input
                                        type="datetime-local"
                                        value={date}
                                        onChange={e => setDate(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>링크:</label>
                                <input
                                    type="text"
                                    value={link}
                                    onChange={e => setLink(e.target.value)}
                                    placeholder="장소를 입력하세요"
                                />
                            </div>
                            <div className="form-group">
                                <label>일정 설명:</label>
                                <textarea
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                    placeholder="일정 설명을 입력하세요"
                                />
                            </div>
                            <div className="button-group">
                                <button onClick={handleSave}>저장</button>
                                <button onClick={handleClose}>닫기</button>
                            </div>
                        </div>

                    </div>
                }
            </div>
        );
    }

    // component: 일정 확인 모달창 //
    function DetailDaily() {

        const modalBackground = useRef<HTMLDivElement | null>(null);

        const handleClose = () => {
            setModalOpen(false);
        };

        if (!currentEvent) return null; // 이벤트가 없으면 null 반환
        return (
            <div className='modal-container' ref={modalBackground} onClick={e => {
                if (e.target === modalBackground.current) {
                    setModalOpen(false);
                }
            }}>
                <div className="event-form">
                    <h2>일정 설명</h2>
                    <div className="form-group">
                        <label>일정 제목:</label>
                        <div>{currentEvent.title}</div>
                    </div>
                    <div className="form-group">
                        <label>날짜:</label>
                        <div className="date-group">
                            {currentEvent.start && (
                                <div>
                                    {currentEvent.start.toLocaleDateString('ko-KR', {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit',
                                        weekday: 'long' // 요일 추가
                                    })} {currentEvent.start.toLocaleTimeString('ko-KR', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: false // 24시간 형식
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="form-group">
                        <label>링크:</label>
                        <div>{currentEvent.extendedProps.link}</div>
                    </div>
                    <div className="form-group">
                        <label>일정 설명:</label>
                        <div>{currentEvent.extendedProps.description}</div>
                    </div>
                    <div className="button-group">
                        <button onClick={handleClose}>닫기</button>
                        <button onClick={handleClose} className='delete-schedule'>삭제</button>
                    </div>
                </div>

            </div>
        );
    }

    // component: 달력 화면 //
    return (
        <div id='main-calendar'>
            <WriteDaily />
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                themeSystem='bootstrap5'
                events={schedules}
                eventClick={handleEventClick}
                contentHeight={100}
                height={1000}
                eventContent={(info) => {
                    let timeString = '';
                    if (info.event.start) { // start가 null이 아닐 때만 처리
                        timeString = info.event.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
                    }
                    return (
                        <div className='event-title' style={{ color: 'white' }}>
                            <span>{timeString}</span> {info.event.title}
                        </div>
                    );
                }}
                dayMaxEvents={3} // 최대 이벤트 수 설정
            />
            {modalOpen && <DetailDaily />}
        </div>
    );
}
