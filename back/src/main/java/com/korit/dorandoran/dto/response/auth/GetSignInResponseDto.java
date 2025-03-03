package com.korit.dorandoran.dto.response.auth;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.korit.dorandoran.dto.response.ResponseCode;
import com.korit.dorandoran.dto.response.ResponseDto;
import com.korit.dorandoran.dto.response.ResponseMessage;
import com.korit.dorandoran.entity.UserEntity;

import lombok.Getter;

@Getter
public class GetSignInResponseDto extends ResponseDto{
    
    private String userId;
    private String profileImage;
    private String name;
    private String telNumber;
    private String nickName;
    private Boolean role;
    private Integer mileage;
    private String statusMessage;

    public GetSignInResponseDto(UserEntity userEntity) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.userId = userEntity.getUserId();
        this.profileImage = userEntity.getProfileImage();
        this.name = userEntity.getName();
        this.telNumber = userEntity.getTelNumber();
        this.nickName = userEntity.getNickName();
        this.role = userEntity.getRole();
        this.mileage = userEntity.getMileage();
        this.statusMessage = userEntity.getStatusMessage();
    }

    public static ResponseEntity<GetSignInResponseDto> success(UserEntity userEntity) {
        GetSignInResponseDto responseBody = new GetSignInResponseDto(userEntity);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
}
