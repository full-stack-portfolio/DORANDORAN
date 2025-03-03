package com.korit.dorandoran.dto.response;

public interface ResponseMessage {
    String SUCCESS = "Success";

    String DUPLICATE_USER_ID = "Duplicated User Id";
    String VALIDATION_FAIL = "Validation Failed";
    String DUPLICATE_TEL_NUMBER = "Duplicated User Tel Number";
    String NO_EXIST_USER_ID = "No Exist User Id";
    String NO_EXIST_NOTICE_ID = "No Exist Notice Id";
    String NO_EXIST_TOOL = "No Exist Tool";
    String NO_EXIST_CUSTOMER = "No Exist Customer";

    String TEL_AUTH_FAIL = "Telnumber Authentication Failed";
    String SIGN_IN_FAIL = "Sign in Failed";
    String AUTHENTICATION_FAIL = "Authentication Fail";
    String TOOL_INSUFFICIENT = "This tool is insufficient in number.";

    // 토론방 관련 response message
    String DUPLICATED_ROOM_TITLE = "Duplicated room title. ";
    String ROOM_CREATED_FAIL = "Room created fail. ";
    String NO_EXIST_ROOM = "No Exist Room. ";

    // 댓글 및 대댓글 관련 resposne message
    String NO_EXIST_COMMENT = "No exist comment. ";
    String NO_EXIST_PARENT_COMMENT = "No exist parent comment. ";
    String NO_PERMISSION = "No Permission";

    String MESSAGE_SEND_FAIL = "Auth Number Send Failed";
    String DATABASE_ERROR = "Database Error";
    String TOKEN_CREATE_FAIL = "Token Create Failed";

    // 신고 관련 response message
    String DUPLICATED_ACCUSE = "Duplicated Accuse";
    String NO_EXIST_TARGET = "No Exist Target";
    String NO_SELF_REPORT = "No Self Report";
    String NO_HAVE_ACCUSE = "No Have Accuse";
}
