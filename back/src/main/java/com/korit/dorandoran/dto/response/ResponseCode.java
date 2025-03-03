package com.korit.dorandoran.dto.response;

public interface ResponseCode {
    String SUCCESS = "SU";

    String VALIDATION_FAIL = "VF";
    String DUPLICATE_USER_ID = "DI";
    String DUPLICATE_TEL_NUMBER = "DT";
    String NO_EXIST_USER_ID = "NI";
    String NO_EXIST_NOTICE_ID = "NN";
    String NO_EXIST_TOOL = "NT";
    String NO_EXIST_CUSTOMER = "NC";
    String TOOL_INSUFFICIENT = "TI";

    String TEL_AUTH_FAIL = "TAF";
    String SIGN_IN_FAIL = "SF";
    String AUTHENTICATION_FAIL = "AF";

    // 토론방 관련 response code
    String DUPLICATED_ROOM_TITLE = "DRT";
    String ROOM_CREATED_FAIL = "RF";
    String NO_EXIST_ROOM = "NR";

    // 댓글 및 대댓글 관련 response code
    String NO_EXIST_COMMENT = "NM";
    String NO_EXIST_PARENT_COMMENT = "NPC";

    String NO_PERMISSION = "NP";

    String DATABASE_ERROR = "DBE";
    String MESSAGE_SEND_FAIL = "TF";
    String TOKEN_CREATE_FAIL = "TCF";

    // 신고 관련 rseponse Code
    String DUPLICATED_ACCUSE = "DA";
    String NO_EXIST_TARGET = "NT";
    String NO_SELF_REPORT = "NS";
    String NO_HAVE_ACCUSE = "NA";
}
