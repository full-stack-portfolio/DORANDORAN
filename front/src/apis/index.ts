import axios, { AxiosResponse } from "axios";
import ResponseDto from "./dto/response/response.dto";
import IdCheckRequestDto from "./dto/request/auth/id-check.request.dto";
import TelAuthRequestDto from "./dto/request/auth/tel-auth.request.dto";
import TelAuthCheckRequestDto from "./dto/request/auth/tel-auth-check.request.dto";
import SignUpRequestDto from "./dto/request/auth/sign-up.request.dto";
import SignInRequestDto from "./dto/request/auth/sign-in.request.dto";
import SignInResponseDto from "./dto/response/auth/sign-in.response.dto";
import IdSearchNameTelNumberRequestDto from "./dto/request/auth/id-search-name-tel-number.request.dto";
import findIdResultResponseDto from "./dto/response/auth/find-id-result.response.dto";
import FindPwRequestDto from "./dto/request/auth/find-pw.request.dto";
import PatchPwRequestDto from "./dto/request/auth/patch-pw.request.dto";
import PostDiscussionWirteRequestDto from "./dto/request/gd_discussion/post-discussion-wirte.request.dto";

import { PostScheduleRequestDto } from "./dto/request/schedule";
import { GetScheduleListResponseDto } from "./dto/response/schedule";
import MyMileageRequestDto from "./dto/request/mileage/my-mileage.request.dto";
import { GetMileageResponseDto, MileageRequestDto } from "./dto/response/get-mileage.response.dto";

import GetSignInResponseDto from "./dto/response/auth/get-sign-in.response.dto";
import CheckPwRequestDto from "./dto/request/mypage/myInfo/check-pw.request.dto";
import PatchProfileRequestDto from "./dto/request/mypage/myInfo/patch-profile.request.dto";
import GetUserInfoResponseDto from "./dto/response/mypage/myInfo/get-user-info.response.dto";
import PatchUserInfoRequestDto from "./dto/request/mypage/myInfo/patch-user-info.request.dto";
import ChangePwRequestDto from "./dto/request/mypage/myInfo/change-pw.request.dto";
import PostNoticeRequestDto from "./dto/request/notice/Post-notice.request.dto";
import GetNoticeListResponseDto from "./dto/response/notice/Get-notice-list.response.dto";
import GetNoticeDetailResponseDto from "./dto/response/notice/Get-notice-detail.response.dto";
import GetMainGenDiscListResponseDto from "./dto/response/main/get-main-gen-disc-list.response.dto";
import { GetDiscussionResponseDto } from "./dto/response/gd_discussion";
import PostCommentRequestDto from "./dto/request/comment/post-comment.request.dto";
import PatchCommentRequestDto from "./dto/request/comment/patch-comment.request.dto";
import { PostAccuseRequestDto } from "./dto/request/accuse";
import GetAccuseListResponseDto from "./dto/response/accuse/get-accuse-list.response.dto";
import GetAccuseResponseDto from "./dto/response/accuse/get-accuse.response.dto";
import { PostAdminMileageRequestDto } from "./dto/request/mileage/post-admin-mileage.request.dto";
import { PostAccountRequestDto } from "./dto/request/account/post-account.request.dto";
import { GetAccountsResponseDto } from "./dto/response/mypage/account_management/get-account-management.response.dto";
import GetMyDiscussionListResposneDto from "./dto/response/mypage/myInfo/get-my-discussion-list.response.dto";
import PostVoteRequestDto from "./dto/request/vote/post-vote.request.dto";
import GetVoteResultResponseDto from "./dto/response/vote/get-vote-result.response.dto";

// variable: api url 상수//
const DORANDORAN_API_DOMAIN = process.env.REACT_APP_API_URL;

const AUTH_MODULE_URL = `${DORANDORAN_API_DOMAIN}/api/v1/auth`;
const GENERAL_DISCUSSION_MODULE_URL = `${DORANDORAN_API_DOMAIN}/api/v1/gen_disc`;
const COMMENT_MODULE_URL = `${DORANDORAN_API_DOMAIN}/api/v1/comment`;
const MAIN_GENERAL_DISC_API_URL = `${GENERAL_DISCUSSION_MODULE_URL}/main`;
const VOTE_MODULE_URL = `${DORANDORAN_API_DOMAIN}/api/v1/vote`;
const LIKE_MODULE_URL = `${DORANDORAN_API_DOMAIN}/api/v1/like`

//* ============= 일정관리 
const POST_SCHEDULE_URL = `${DORANDORAN_API_DOMAIN}/schedule`;
const GET_SCHEDULE_LIST_URL = `${DORANDORAN_API_DOMAIN}/schedule`;

const ID_CHECK_API_URL = `${AUTH_MODULE_URL}/id-check`;
const TEL_AUTH_API_URL = `${AUTH_MODULE_URL}/tel-auth`;
const TEL_AUTH_CHECK_API_URL = `${AUTH_MODULE_URL}/tel-auth-check`;
const SIGN_UP_API_URL = `${AUTH_MODULE_URL}/sign-up`;
const SIGN_IN_API_URL = `${AUTH_MODULE_URL}/sign-in`;

const ID_SEARCH_NAME_TEL_API_URL = `${AUTH_MODULE_URL}/find-id`;
const ID_SEARCH_TEL_AUTH_API_URL = `${AUTH_MODULE_URL}/find-id-check`;
const FIND_PW_API_URL = `${AUTH_MODULE_URL}/find-pw`;
const PATCH_PASSWORD_API_URL = `${AUTH_MODULE_URL}/change-pw`;

// 토론방 API URL //
const WRITE_GENENRAL_DISCUSSION_API_URL = `${GENERAL_DISCUSSION_MODULE_URL}/write`;
const GET_GENENRAL_DISCUSSION_LIST_API_URL = `${GENERAL_DISCUSSION_MODULE_URL}`;

const GET_GENERAL_DISCUSSION_API_URL = (roomId: number | string) => `${GENERAL_DISCUSSION_MODULE_URL}/${roomId}`;

// 댓글 및 대댓글 API URL //
const POST_COMMENT_API_URL = (roomId: number | string) => `${COMMENT_MODULE_URL}/${roomId}`;
const PATCH_COMMENT_API_URL = (roomId: number | string, commentId: number | string) => `${COMMENT_MODULE_URL}/${roomId}/${commentId}`;
const DELETE_COMMENT_API_URL = (roomId: number | string, commentId: number | string) => `${COMMENT_MODULE_URL}/delete/${roomId}/${commentId}`;

// 투표 API URL //
const POST_VOTE_API_URL = (roomId: number | string) => `${VOTE_MODULE_URL}/${roomId}`;
const GET_VOTE_RESULT_API_URL = (roomId: number | string) => `${VOTE_MODULE_URL}/${roomId}`;

// 좋아요 API URL //
const POST_LIKE_API_URL = (targetId:number , likeType: string ) => `${LIKE_MODULE_URL}/${targetId}/${likeType}`; 
const DELETE_LIKE_API_URL = (targetId:number , likeType: string ) => `${LIKE_MODULE_URL}/${targetId}/${likeType}`; 


const POST_ACCUSE_URL = `${DORANDORAN_API_DOMAIN}/accuse`;
const GET_ACCUSE_LIST_URL = (userId: string) => `${DORANDORAN_API_DOMAIN}/accuse?userId=${userId}`;
const GET_ACCUSE_URL = (accuseId: number) => `${DORANDORAN_API_DOMAIN}/accuse/${accuseId}`;


const MILEAGE_API_URL = `${DORANDORAN_API_DOMAIN}/mypage/mileage`;
const ADMIN_MILEAGE_API_URL = `${DORANDORAN_API_DOMAIN}/admin/mileage`;
const ACCOUNT_MANAGEMENT_API_URL = `${DORANDORAN_API_DOMAIN}/mypage/account-management`;


const GET_SIGN_IN_API_URL = `${AUTH_MODULE_URL}/sign-in`;

const MYPAGE_MODULE_URL = `${DORANDORAN_API_DOMAIN}/mypage`;
const MYPAGE_USER_INFO_API_URL = `${MYPAGE_MODULE_URL}/user-info`;
const MYPAGE_PATCH_PROFILE_API_URL = `${MYPAGE_USER_INFO_API_URL}/patch-profile`;
const MYPAGE_USER_UPDATE_PASSWORD_CHECK_API_URL = `${MYPAGE_USER_INFO_API_URL}/password-check`;
const MYPAGE_USER_UPDATE_GET_USER_INFO_API_URL = (userId: string) => `${MYPAGE_USER_INFO_API_URL}/${userId}`;
const MYPAGE_USER_CHANGE_PW_API_URL = `${MYPAGE_USER_INFO_API_URL}/change-pw`;
const MYPAGE_PATCH_USER_INFO_API_URL = `${MYPAGE_USER_INFO_API_URL}/patch-user`;
const MYPAGE_USER_DELETE_API_URL = `${MYPAGE_USER_INFO_API_URL}/delete-user`;
const MYPAGE_MY_DISCUSSION_LIST_API_URL = `${MYPAGE_USER_INFO_API_URL}/get-my-discussion`;
const MYPAGE_DELETE_MY_DISCUSSION_API_URL = (roomId: number | string) => 
    `${MYPAGE_USER_INFO_API_URL}/delete/${roomId}`;

const NOTICE_API_URL = `${DORANDORAN_API_DOMAIN}/notice`;
const POST_NOTICE_API_URL = `${NOTICE_API_URL}/post`;
const NOTICE_DETAIL_API_URL = (noticeId: number | string) => `${NOTICE_API_URL}/${noticeId}`;
const NOTICE_DELETE_API_URL = (noticeId: number | string) => `${NOTICE_API_URL}/delete/${noticeId}`;


// function: Authorization Bearer 헤더값 //
const bearerAuthorization = (accessToken: String) => ({ headers: { 'Authorization': `Bearer ${accessToken}` } });

// function: response data 처리 함수 //
const responseDataHandler = <T>(response: AxiosResponse<T, any>) => {
    const { data } = response;
    return data;
};

// function: response error 처리 함수 //
const responseErrorHandler = (error: any) => {
    if (!error.response) return null;
    const { data } = error.response;
    return data as ResponseDto;
};

// function: file upload 요청 함수 //
export const fileUploadeRequest = async (requestBody: FormData) => {
    const url = await axios.post(FILE_UPLOAD_URL, requestBody, multipart)
        .then(responseDataHandler<string>)
        .catch(error => null);
    return url;
};

// function: get sign in api 요청 함수 //
export const getSignInRequest = async (accessToken: string) => {
    const responseBody = await axios.get(GET_SIGN_IN_API_URL, bearerAuthorization(accessToken))
        .then(responseDataHandler<GetSignInResponseDto>)
        .catch(responseErrorHandler)
    return responseBody;
}

// function: id check api 요청 함수 //
export const idCheckRequest = async (requestBody: IdCheckRequestDto) => {
    const responseBody = await axios.post(ID_CHECK_API_URL, requestBody)
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

// function: tel auth api 요청 함수 //
export const telAuthRequest = async (requestBody: TelAuthRequestDto) => {
    const responseBody = await axios.post(TEL_AUTH_API_URL, requestBody)
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

// function: tel auth check 요청 함수 //
export const telAuthCheckRequest = async (requestBody: TelAuthCheckRequestDto) => {
    const responseBody = await axios.post(TEL_AUTH_CHECK_API_URL, requestBody)
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

// function: sign up 요청 함수 //
export const signUpRequest = async (requestBody: SignUpRequestDto) => {
    const responseBody = await axios.post(SIGN_UP_API_URL, requestBody)
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

// function: sign in 요청 함수 //
export const signInRequest = async (requestBody: SignInRequestDto) => {
    const responseBody = await axios.post(SIGN_IN_API_URL, requestBody)
        .then(responseDataHandler<SignInResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

// function: id search first 요청 함수 (name + telNumber) //
export const idSearchNameTelNumberRequest = async (requestBody: IdSearchNameTelNumberRequestDto) => {
    const responseBody = await axios.post(ID_SEARCH_NAME_TEL_API_URL, requestBody)
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

// function: id search middle (전화번호 + 인증번호) 요청 함수 //
export const idSearchTelAuthRequest = async (requestBody: TelAuthCheckRequestDto) => {
    const responseBody = await axios.post(ID_SEARCH_TEL_AUTH_API_URL, requestBody)
        .then(responseDataHandler<findIdResultResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

// function: password resetting (userId + telNumber) 요청 함수 //
export const findPwRequest = async (requestBody: FindPwRequestDto) => {
    const responseBody = await axios.post(FIND_PW_API_URL, requestBody)
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

// function: 비밀번호 재설정 patch password 요청 함수 //
export const patchPasswordRequest = async (requestBody: PatchPwRequestDto) => {
    const responseBody = await axios.patch(PATCH_PASSWORD_API_URL, requestBody)
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
}

// function: 메인 화면 일반 토론 게시글 get 요청 함수 //
export const getMainGenDiscListRequest = async (accessToken: String) => {
    const responseBody = await axios.get(MAIN_GENERAL_DISC_API_URL, bearerAuthorization(accessToken))
        .then(responseDataHandler<GetMainGenDiscListResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
}

// function: 일반 토론방 작성 post discussion 요청 함수 //
export const postDiscussionRequest = async (requestBody: PostDiscussionWirteRequestDto, accessToken: string) => {
    const repsonseBody = await axios.post(WRITE_GENENRAL_DISCUSSION_API_URL, requestBody, bearerAuthorization(accessToken))
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return repsonseBody;
}

// function: 일반 토론방 리스트 get discussion List 요청 함수 //
export const getDiscussionListRequest = async (accessToken: string) => {
    const responseBody = await axios.get(GET_GENENRAL_DISCUSSION_LIST_API_URL, bearerAuthorization(accessToken))
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
}


// function: 토론방 상세보기 get discussion 요청 함수 //
export const getDiscussionRequest = async (roomId: number | string, accessToken: string) => {
    const responseBody = await axios.get(GET_GENERAL_DISCUSSION_API_URL(roomId), bearerAuthorization(accessToken))
        .then(responseDataHandler<GetDiscussionResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
}

// 댓글 및 대댓글 관련 API //

// function: 댓글 등록 post comment 요청 함수 //
export const postCommentRequest = async (requestBody: PostCommentRequestDto, roomId: number | string, accessToken: string) => {
    const responseBody = await axios.post(POST_COMMENT_API_URL(roomId), requestBody, bearerAuthorization(accessToken))
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
}


// function: 댓글 수정 patch comment 요청 함수 //
export const patchCommentRequest = async (requestBody: PatchCommentRequestDto, roomId: number | string, commentId: number | string, accessToken: string) => {
    const responseBody = await axios.patch(PATCH_COMMENT_API_URL(roomId, commentId), requestBody, bearerAuthorization(accessToken))
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
}

// function: 댓글 삭제 patch comment 요청 함수 //
export const deleteCommentRequest = async(roomId:number|string, commentId:number|string,userId:string, accessToken:string) => {
    const responseBody = await axios.patch(DELETE_COMMENT_API_URL(roomId,commentId), userId, bearerAuthorization(accessToken))
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
}

// function: 투표 하기 post vote 요청 함수 //
export const postVoteRequest = async(requsetBody:PostVoteRequestDto, userId:string, roomId:number|string,  accessToken: string) => {
    const responseBody = await axios.post(POST_VOTE_API_URL(roomId), requsetBody,  bearerAuthorization(accessToken))
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
}

// function: 투표 결과 get vote result 요청 함수 //
export const getVoteResultRequest = async(roomId:number|string, accessToken: string) => {
    const responseBody = await axios.get(GET_VOTE_RESULT_API_URL(roomId), bearerAuthorization(accessToken))
        .then(responseDataHandler<GetVoteResultResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
}

// function: 좋아요 post like 요청 함수 //
export const postLikeRequest = async(targetId:number, likeType:string, userId:string, accessToken:string) => {
    const responseBody = await axios.post(POST_LIKE_API_URL(targetId,likeType), userId, bearerAuthorization(accessToken))
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
}

// function: 좋아요 delete like 요청 함수 //
export const deleteLikeRequest = async(targetId:number, likeType:string, userId:string,   accessToken:string) => {
    const responseBody = await axios.delete(DELETE_LIKE_API_URL(targetId,likeType), bearerAuthorization(accessToken))
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
}

// function: POST 신고 요청 함수 //
export const postAccuseRequest = async (requestBody: PostAccuseRequestDto, accessToken: string) => {
    const reseponseBody = await axios.post(POST_ACCUSE_URL, requestBody, bearerAuthorization(accessToken))
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return reseponseBody;
}


// function: 신고 리스트 GET 요청 함수 //
export const getAccuseListRequest = async (userId: string, accessToken: string) => {
    const responseBody = await axios.get(GET_ACCUSE_LIST_URL(userId), bearerAuthorization(accessToken))
        .then(responseDataHandler<GetAccuseListResponseDto>)
        .catch(responseDataHandler);
    return responseBody;
}

// function: 신고 GET 요청 함수 //
export const getAccuseRequest = async (accuseId: number, accessToken: string) => {
    const responseBody = await axios.get(GET_ACCUSE_URL(accuseId), bearerAuthorization(accessToken))
        .then(responseDataHandler<GetAccuseResponseDto>)
        .catch(responseDataHandler);
    return responseBody;
}

// function: 일정 등록 post 요청 함수 //
export const postScheduleRequest = async (requestBody: PostScheduleRequestDto, accessToken: string) => {
    const responseBody = await axios.post(POST_SCHEDULE_URL, requestBody, bearerAuthorization(accessToken))
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
}

// function: 일정 리스트 Get 요청 함수 //
export const getScheduleListRequest = async (accessToken: string) => {
    const responseBody = await axios.get(GET_SCHEDULE_LIST_URL, bearerAuthorization(accessToken))
        .then(responseDataHandler<GetScheduleListResponseDto>)
        .catch(responseDataHandler);
    return responseBody;
}

// function: (일반 유저) 마일리지 정보 및 환급 내역 GET 요청 함수 //
export const getMileageData = async function (accessToken: string) {
    try {
        const response = await axios.get(MILEAGE_API_URL, bearerAuthorization(accessToken));
        return response.data as GetMileageResponseDto;
    } catch (error) {
        console.error("마일리지 정보 불러오기 오류:", error);
        return null;
    }
};

// function: (일반 유저) 환급 신청 POST 요청 함수 //
export const refundRequest = async (requestBody: MyMileageRequestDto, accessToken: string) => {
    const responseBody = await axios.post(`${MILEAGE_API_URL}/request`, requestBody, bearerAuthorization(accessToken))
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

// function: (관리자) 마일리지 지급 POST 요청 함수수 //
export const giveMileage = async (requestBody: PostAdminMileageRequestDto, accessToken: string) => {
    try {
        const response = await axios.post(`${ADMIN_MILEAGE_API_URL}/give`, requestBody, bearerAuthorization(accessToken));
        return response.data;
    } catch (error) {
        console.error("마일리지 지급 오류:", error);
        return null;
    }
};

// function: (관리자) 환급 요청 내역 GET 요청 함수 //
export const getRefundRequests = async (accessToken: string): Promise<MileageRequestDto[] | null> => {
    try {
        const response = await axios.get(`${ADMIN_MILEAGE_API_URL}/refunds`, bearerAuthorization(accessToken));
        return response.data;
    } catch (error) {
        console.error("환급 요청 내역 조회 오류:", error);
        return null;
    }
};

// function: (관리자) 환급 요청 승인/거절 POST 요청 함수 //
export const updateRefundStatus = async (mileageId: number, status: string, accessToken: string) => {
    try {
        const response = await axios.post(
            `${ADMIN_MILEAGE_API_URL}/refund/${mileageId}/status?status=${status}`,
            {},
            bearerAuthorization(accessToken)
        );
        return response.data;
    } catch (error) {
        console.error("환급 요청 상태 변경 오류:", error);
        return null;
    }
};

// function: 계좌 목록 GET 요청 함수 //
export const getAccounts = async (accessToken: string): Promise<GetAccountsResponseDto[] | null> => {
    try {
        const response = await axios.get(`${ACCOUNT_MANAGEMENT_API_URL}`, bearerAuthorization(accessToken));
        return response.data;
    } catch (error) {
        console.error("Error", error);
        return null;
    }
};

// function: 계좌 등록 POST 요청 함수 //
export const postAccount = async (account: PostAccountRequestDto, accessToken: string) => {
    const response = await axios.post(`${ACCOUNT_MANAGEMENT_API_URL}/post`, account, {
        headers: { Authorization: `Bearer ${accessToken}` }
    });
    return response.data;
};

// function: 계좌 DELETE 요청 함수 //
export const deleteAccount = async (accountNumber: string, accessToken: string) => {
    const response = await axios.delete(`${ACCOUNT_MANAGEMENT_API_URL}/delete?accountNumber=${accountNumber}`, {
        headers: { Authorization: `Bearer ${accessToken}` }
    });
    return response.data;
};


// function: get sign in 요청 함수 //
export const GetSignInRequest = async (accessToken: string) => {
    const responseBody = await axios.get(GET_SIGN_IN_API_URL, bearerAuthorization(accessToken))
        .then(responseDataHandler<GetSignInResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
}

// function: 개인 정보 수정 비밀번호 확인 user update password check 요청 함수 //
export const pwCheckRequest = async (requestBody: CheckPwRequestDto, accessToken: string) => {
    const responseBody = await axios.post(MYPAGE_USER_UPDATE_PASSWORD_CHECK_API_URL, requestBody, bearerAuthorization(accessToken))
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
}

// function: 프로필 수정 patch profile 요청 함수 //
export const patchProfileRequest = async (requestBody: PatchProfileRequestDto, accessToken: string) => {
    const responseBody = await axios.patch(MYPAGE_PATCH_PROFILE_API_URL, requestBody, bearerAuthorization(accessToken))
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
}

// function: 개인 정보 수정 시, 개인 정보 요청 함수 //
export const getUserInfoRequest = async (userId: string, accessToken: string) => {
    const responseBody = await axios.get(MYPAGE_USER_UPDATE_GET_USER_INFO_API_URL(userId), bearerAuthorization(accessToken))
        .then(responseDataHandler<GetUserInfoResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
}

// function: 비밀번호 수정 요청 함수 //
export const changePwRequest = async (requestBody: ChangePwRequestDto, accessToken: string) => {
    const responseBody = await axios.patch(MYPAGE_USER_CHANGE_PW_API_URL, requestBody, bearerAuthorization(accessToken))
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
}

// function: 개인 정보 수정 요청 함수 //
export const patchUserInfoRequest = async (requestBody: PatchUserInfoRequestDto, accessToken: string) => {
    const responseBody = await axios.patch(MYPAGE_PATCH_USER_INFO_API_URL, requestBody, bearerAuthorization(accessToken))
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
}

// function: 회원 탈퇴 요청 함수 //
export const deleteUserRequest = async (accessToken: string) => {
    const responseBody = await axios.delete(MYPAGE_USER_DELETE_API_URL, bearerAuthorization(accessToken))
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
}

// function: 마이페이지 - 내가 작성한 게시글 불러오기 함수 //
export const getMyDiscussionRequest = async(accessToken: string) => {
    const responseBody = await axios.get(MYPAGE_MY_DISCUSSION_LIST_API_URL, bearerAuthorization(accessToken))
        .then(responseDataHandler<GetMyDiscussionListResposneDto>)
        .catch(responseErrorHandler);
    return responseBody;
}

// function: 내가 작성한 게시글 삭제하기 요청 함수 //
export const deleteMyDiscussionRequest = async(accessToken: string, roomId: string | number) => {
    const responseBody = await axios.delete(MYPAGE_DELETE_MY_DISCUSSION_API_URL(roomId), bearerAuthorization(accessToken))
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
}

// function: 공지사항 작성 요청 함수 //
export const postNoticeRequest = async (requestBody: PostNoticeRequestDto, accessToken: string) => {
    const responseBody = await axios.post(POST_NOTICE_API_URL, requestBody, bearerAuthorization(accessToken))
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
}

// function: get notice list 요청 함수 //
export const getNoticeListRequest = async (accessToken: string) => {
    const responseBody = await axios.get(NOTICE_API_URL, bearerAuthorization(accessToken))
        .then(responseDataHandler<GetNoticeListResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
}

// function: get notice detail 요청 함수 //
export const getNoticeDetailRequest = async (noticeId: number | string, accessToken: string) => {
    const responseBody = await axios.get(NOTICE_DETAIL_API_URL(noticeId), bearerAuthorization(accessToken))
        .then(responseDataHandler<GetNoticeDetailResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
}

// function: 공지사항 삭제 요청 함수 //
export const deleteNoticeRequest = async (noticeId: number | string, accessToken: string) => {
    const responseBody = await axios.delete(NOTICE_DELETE_API_URL(noticeId), bearerAuthorization(accessToken))
        .then(responseDataHandler<ResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
}

const FILE_UPLOAD_URL = `${DORANDORAN_API_DOMAIN}/file/upload`;
const multipart = { headers: { 'Content-Type': 'multipart/form-data' } };

// function: file upload 요청 함수 //
export const fileUploadRequest = async (requestBody: FormData) => {
    const url = await axios.post(FILE_UPLOAD_URL, requestBody, multipart)
        .then(responseDataHandler<string>)
        .catch(error => null);
    return url;
}





