package com.korit.dorandoran.dto.response;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ResponseDto {
    private String code;
    private String Message;

    public static ResponseEntity<ResponseDto> success() {
        ResponseDto responsdBody = new ResponseDto(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        return ResponseEntity.status(HttpStatus.OK).body(responsdBody);
    }

    public static ResponseEntity<ResponseDto> duplicatedUserId() {
        ResponseDto responsdBody = new ResponseDto(ResponseCode.DUPLICATE_USER_ID, ResponseMessage.DUPLICATE_USER_ID);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responsdBody);
    }

    public static ResponseEntity<ResponseDto> duplicatedTelNumber() {
        ResponseDto responsdBody = new ResponseDto(ResponseCode.DUPLICATE_TEL_NUMBER,
                ResponseMessage.DUPLICATE_TEL_NUMBER);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responsdBody);
    }

    public static ResponseEntity<ResponseDto> noExistUserId() {
        ResponseDto responsdBody = new ResponseDto(ResponseCode.NO_EXIST_USER_ID, ResponseMessage.NO_EXIST_USER_ID);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responsdBody);
    }

    public static ResponseEntity<ResponseDto> noExistNoticeId() {
        ResponseDto responsdBody = new ResponseDto(ResponseCode.NO_EXIST_NOTICE_ID, ResponseMessage.NO_EXIST_NOTICE_ID);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responsdBody);
    }

    public static ResponseEntity<ResponseDto> noExistComment() {
        ResponseDto responsdBody = new ResponseDto(ResponseCode.NO_EXIST_COMMENT, ResponseMessage.NO_EXIST_COMMENT);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responsdBody);
    }

    public static ResponseEntity<ResponseDto> noExistParentComment() {
        ResponseDto responsdBody = new ResponseDto(ResponseCode.NO_EXIST_PARENT_COMMENT, ResponseMessage.NO_EXIST_PARENT_COMMENT);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responsdBody);
    }

    public static ResponseEntity<ResponseDto> validationFail() {
        ResponseDto responsdBody = new ResponseDto(ResponseCode.VALIDATION_FAIL, ResponseMessage.VALIDATION_FAIL);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responsdBody);
    }

    public static ResponseEntity<ResponseDto> duplicatedRoomTitle() {
        ResponseDto responseBody = new ResponseDto(ResponseCode.DUPLICATED_ROOM_TITLE,
                ResponseMessage.DUPLICATED_ROOM_TITLE);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> roomCreatedFail() {
        ResponseDto responseBody = new ResponseDto(ResponseCode.DUPLICATED_ROOM_TITLE,
                ResponseMessage.DUPLICATED_ROOM_TITLE);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> noExistRoom() {
        ResponseDto responseBody = new ResponseDto(ResponseCode.NO_EXIST_ROOM, ResponseMessage.NO_EXIST_ROOM);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> signInFail() {
        ResponseDto responsdBody = new ResponseDto(ResponseCode.SIGN_IN_FAIL, ResponseMessage.SIGN_IN_FAIL);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responsdBody);
    }

    public static ResponseEntity<ResponseDto> noPermission() {
        ResponseDto responsBody = new ResponseDto(ResponseCode.NO_PERMISSION, ResponseMessage.NO_PERMISSION);
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(responsBody);
    }

    public static ResponseEntity<ResponseDto> telAuthFail() {
        ResponseDto responsdBody = new ResponseDto(ResponseCode.TEL_AUTH_FAIL, ResponseMessage.TEL_AUTH_FAIL);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responsdBody);
    }

    public static ResponseEntity<ResponseDto> databaseError() {
        ResponseDto responseBody = new ResponseDto(ResponseCode.DATABASE_ERROR, ResponseMessage.DATABASE_ERROR);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> messageSendFail() {
        ResponseDto responseBody = new ResponseDto(ResponseCode.MESSAGE_SEND_FAIL, ResponseMessage.MESSAGE_SEND_FAIL);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> tokenCreateFail() {
        ResponseDto responseBody = new ResponseDto(ResponseCode.TOKEN_CREATE_FAIL, ResponseMessage.TOKEN_CREATE_FAIL);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseBody);
    }

    // function: 중복된 신고 //
    public static ResponseEntity<ResponseDto> duplicatedAccuse() {
        ResponseDto responsdBody = new ResponseDto(ResponseCode.DUPLICATED_ACCUSE, ResponseMessage.DUPLICATED_ACCUSE);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responsdBody);
    }

    // function: 존재하지 않는 신고 //
    public static ResponseEntity<ResponseDto> noExistedTarget() {
        ResponseDto responsdBody = new ResponseDto(ResponseCode.NO_EXIST_TARGET, ResponseMessage.NO_EXIST_TARGET);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responsdBody);
    }

    // function: 자기가 쓴 게시글 신고 //
    public static ResponseEntity<ResponseDto> noSelfAccuse() {
        ResponseDto responsdBody = new ResponseDto(ResponseCode.NO_SELF_REPORT, ResponseMessage.NO_SELF_REPORT);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responsdBody);
    }

    // function: 존재하지 않는 신고 //
    public static ResponseEntity<ResponseDto> noHaveAccuse() {
        ResponseDto responsdBody = new ResponseDto(ResponseCode.NO_HAVE_ACCUSE, ResponseMessage.NO_HAVE_ACCUSE);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responsdBody);
    }
}
