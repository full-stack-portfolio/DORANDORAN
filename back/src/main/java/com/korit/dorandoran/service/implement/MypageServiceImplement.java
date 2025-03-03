package com.korit.dorandoran.service.implement;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.korit.dorandoran.dto.request.mypage.myInfo.MypageChangePwRequestDto;
import com.korit.dorandoran.dto.request.mypage.myInfo.PatchProfileRequestDto;
import com.korit.dorandoran.dto.request.mypage.myInfo.PatchUserInfoRequestDto;
import com.korit.dorandoran.dto.request.mypage.myInfo.PwCheckRequestDto;
import com.korit.dorandoran.dto.response.ResponseDto;
import com.korit.dorandoran.dto.response.mypage.myInfo.GetUserInfoResponseDto;
import com.korit.dorandoran.entity.UserEntity;
import com.korit.dorandoran.repository.UserRepository;
import com.korit.dorandoran.service.MypageService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MypageServiceImplement implements MypageService{

    private final UserRepository userRepository;
    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    
    @Override
    public ResponseEntity<ResponseDto> pwCheck(PwCheckRequestDto dto) {
        
        String userId = dto.getUserId();
        String password = dto.getPassword();
        
        try {
            UserEntity userEntity = userRepository.findByUserId(userId);
            if (userEntity == null) return ResponseDto.noExistUserId();

            String prePassword = userEntity.getPassword();
			boolean isMatched = passwordEncoder.matches(password, prePassword);
			if (!isMatched) return ResponseDto.noPermission();

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return ResponseDto.success();
    }

    @Override
    public ResponseEntity<ResponseDto> patchProfile(PatchProfileRequestDto dto, String userId) {

        String nickName = dto.getNickName();
        String profileImage = dto.getProfileImage();
        String statusMesage = dto.getStatusMessage();

        try {
            UserEntity userEntity = userRepository.findByUserId(userId);
            if(userEntity == null) return ResponseDto.noExistUserId();

            userEntity.setNickName(nickName);
            userEntity.setProfileImage(profileImage);
            userEntity.setStatusMessage(statusMesage);

            userRepository.save(userEntity);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return ResponseDto.success();
    }

    @Override
    public ResponseEntity<? super GetUserInfoResponseDto> getUserInfo(String userId) {
        UserEntity userEntity = null;
        try {
            userEntity = userRepository.findByUserId(userId);
            if(userEntity == null) return ResponseDto.noExistUserId();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return GetUserInfoResponseDto.success(userEntity);
    }

    @Override
    public ResponseEntity<ResponseDto> deleteUser(String userId) {
        UserEntity userEntity = null;
        try {
            userEntity = userRepository.findByUserId(userId);
            if(userEntity == null) return ResponseDto.noExistUserId();

            userRepository.delete(userEntity);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return ResponseDto.success();
    }

    @Override
    public ResponseEntity<ResponseDto> patchUserInfo(PatchUserInfoRequestDto dto, String userId) {

        String name = dto.getName();
        String birth = dto.getBirth();
        String telNumber = dto.getTelNumber();

        try {
            UserEntity userEntity = userRepository.findByUserId(userId);
            if(userEntity == null) return ResponseDto.noExistUserId();

            userEntity.setName(name);
            userEntity.setBirth(birth);
            userEntity.setTelNumber(telNumber);

            userRepository.save(userEntity);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return ResponseDto.success();
    }

    @Override
    public ResponseEntity<ResponseDto> changePw(MypageChangePwRequestDto dto, String userId) {
        String password = dto.getPassword();
        try {
            UserEntity userEntity = userRepository.findByUserId(userId);
            if(userEntity == null) return ResponseDto.noExistUserId();

            String encodedPassword = passwordEncoder.encode(password);
            userEntity.setPassword(encodedPassword);
            userRepository.save(userEntity);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return ResponseDto.success();
    }

}
