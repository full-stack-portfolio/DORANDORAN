// variable: 상대 경로 상수 //
export const ROOT_PATH = '/';

export const LOGIN_PATH = '/login';
export const FIND_ID = '/find-id';
export const FIND_ID_RESULT = '/find-id-result';
export const FIND_PW = '/find-pw';
export const CHANGE_PW = '/change-pw';
export const SIGN_UP = '/sign-up';

export const MAIN_PATH = '/main';

export const GEN_DISC_PATH = '/gen_disc';
export const GEN_DISC_WRITE_PATH = 'write';
export const GEN_DISC_DETAIL_PATH = (roomId: string | number) => `${roomId}`;
export const GEN_DISC_UPDATE_PATH = (roomId: string | number) => `${roomId}/update`;

export const RT_DISC_PATH = '/rt_disc';
export const NOTICE = '/notice';
export const NOTICE_WRITE = 'write';
export const NOTICE_DETAIL = (noticeNumber: string | number) => `${noticeNumber}`;
export const NOTICE_PATCH = (noticeNumber: string | number) => `patch/${noticeNumber}`;

export const SCHEDULE = '/schedule';

export const MY_PATH = '/mypage';
export const MY_UPDATE_PATH = (userId: string | number) => `${userId}/update`;
export const MY_ATTENDANCE_CHECK_PATH = (userId: string | number) => `${userId}/attendance`;
export const MY_MILEAGE_PATH = 'mileage';
export const MY_ACCOUNT_MANAGEMENT_PATH = 'account-management';
export const MY_MILEAGE_REQUEST_PATH = '/request';

export const ADMIN_PATH = '/admin';
export const ADMIN_ACCUSE_PATH = 'accuse';
export const ADMIN_MILEAGE_PATH = 'mileage';

export const MY_INFO_PW_PATH = (userId: string | number) => `${userId}/pw-check`;
export const MY_INFO_UPDATE_PATH = (userId: string | number) => `${userId}/change-info`;

export const SNS_SUCCESS_PATH = '/sns-success';
export const OTHERS_PATH = '*';



// variable: 절대 경로 상수 //
export const ROOT_ABSOLUTE_PATH = ROOT_PATH;

export const LOGIN_ABSOLUTE_PATH = LOGIN_PATH;
export const FIND_ID_ABSOLUTE_PATH = FIND_ID;
export const FIND_PW_ABSOLUTE_PATH = FIND_PW;
export const FIND_ID_RESULT_ABSOLUTE_PATH = FIND_ID_RESULT;
export const CHANGE_PW_ABSOLUTE_PATH = CHANGE_PW;
export const SIGN_UP_ABSOLUTE_PATH = SIGN_UP;

export const MAIN_ABSOLUTE_PATH = MAIN_PATH;

export const GEN_DISC_ABSOLUTE_PATH = GEN_DISC_PATH;
export const GEN_DISC_WRITE_ABSOLUTE_PATH = `${GEN_DISC_PATH}/${GEN_DISC_WRITE_PATH}`;
export const GEN_DISC_DETAIL_ABSOLUTE_PATH = (roomId: string | number) => `${GEN_DISC_PATH}/${GEN_DISC_DETAIL_PATH(roomId)}`;
export const GEN_DISC_UPDATE_ABSOLUTE_PATH = (roomId: string | number) => `${GEN_DISC_PATH}/${GEN_DISC_UPDATE_PATH(roomId)}`;

export const RT_DISC_ABSOLUTE_PATH = RT_DISC_PATH;
export const NOTICE_ABSOLUTE_PATH = NOTICE;
export const NOTICE_WRITE_ABSOLUTE_PATH = `${NOTICE}/${NOTICE_WRITE}`;
export const NOTICE_DETAIL_ABSOLUTE_PATH = (noticeNumber: string | number) => `${NOTICE}/${noticeNumber}`;
export const NOTICE_PATCH_ABSOLUTE_PATH = (noticeNumber: string | number) => `${NOTICE}/${NOTICE_PATCH}`;

export const SCHEDULE_ABSOLUTE_PATH = SCHEDULE;

export const MY_ABSOLUTE_PATH = MY_PATH;
export const MY_ABSOLUTE_UPDATE_PATH = (userId: string | number) => `${MY_PATH}/${MY_UPDATE_PATH(userId)}`
export const MY_INFO_PW_ABSOLUTE_PATH = (userId: string | number) => `${MY_PATH}/${MY_INFO_PW_PATH(userId)}`;
export const MY_INFO_UPDATE_ABSOLUTE_PATH = (userId: string | number) => `${MY_PATH}/${MY_INFO_UPDATE_PATH(userId)}`;

export const ADMIN_ABSOULTE_PATH = ADMIN_PATH;
export const ADMIN_ABSOLUTE_ACCUSE_PATH = `${ADMIN_PATH}/${ADMIN_ACCUSE_PATH}`
export const ADMIN_ABSOLUTE_MILEAGE_PATH = `${ADMIN_PATH}/${ADMIN_MILEAGE_PATH}`
export const OTHERS_ABSOLUTE_PATH = OTHERS_PATH;
export const MY_ABSOLUTE_MILEAGE_PATH =  `${MY_PATH}/${MY_MILEAGE_PATH}`;
export const MY_ABSOLUTE_ACCOUNT_MANAGEMENT_PATH =  `${MY_PATH}/${MY_ACCOUNT_MANAGEMENT_PATH}`;
export const MY_ABSOLUTE_ATTENDANCE_CHECK_PATH = MY_ATTENDANCE_CHECK_PATH;


// variable: HTTP BEARER TOKEN COOKIE NAME //
export const ACCESS_TOKEN = 'accessToken';