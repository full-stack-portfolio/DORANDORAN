package com.korit.dorandoran.service.implement;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.korit.dorandoran.common.util.AuthNumberCreator;
import com.korit.dorandoran.common.util.NickNameCreator;
import com.korit.dorandoran.dto.request.auth.ChangePwRequestDto;
import com.korit.dorandoran.dto.request.auth.FindIdRequestDto;
import com.korit.dorandoran.dto.request.auth.FindPwRequestDto;
import com.korit.dorandoran.dto.request.auth.IdCheckRequestDto;
import com.korit.dorandoran.dto.request.auth.SignInRequestDto;
import com.korit.dorandoran.dto.request.auth.SignUpRequestDto;
import com.korit.dorandoran.dto.request.auth.TelAuthCheckRequestDto;
import com.korit.dorandoran.dto.request.auth.TelAuthRequestDto;
import com.korit.dorandoran.dto.response.ResponseDto;
import com.korit.dorandoran.dto.response.auth.FindIdResultResponseDto;
import com.korit.dorandoran.dto.response.auth.GetSignInResponseDto;
import com.korit.dorandoran.dto.response.auth.SignInResponseDto;
import com.korit.dorandoran.entity.TelAuthEntity;
import com.korit.dorandoran.entity.UserEntity;
import com.korit.dorandoran.provider.JwtProvider;
import com.korit.dorandoran.provider.SmsProvider;
import com.korit.dorandoran.repository.AdminRepository;
import com.korit.dorandoran.repository.TelAuthRepository;
import com.korit.dorandoran.repository.UserRepository;
import com.korit.dorandoran.service.AuthService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImplement implements AuthService{

    private final UserRepository userRepository;
    private final TelAuthRepository telAuthRepository;
    private final AdminRepository adminRepository;

    private final SmsProvider smsProvider;
    private final JwtProvider jwtProvider;

    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    public ResponseEntity<ResponseDto> idCheck(IdCheckRequestDto dto) {
        
        String userId = dto.getUserId();

        try {
            // 찾는 아이디 데이터가 필요하면 findBy, 조회만 하면 existBy 메서드 사용
            boolean isExistedId = userRepository.existsByUserId(userId);
            if(isExistedId) return ResponseDto.duplicatedUserId(); 
                
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        
        return ResponseDto.success();
    }

    @Override
    public ResponseEntity<ResponseDto> telAuth(TelAuthRequestDto dto) {

        String telNumber = dto.getTelNumber();

        // 동일 전화번호 조회
        try {
            boolean isExistedTelNumber = userRepository.existsByTelNumber(telNumber);
            if(isExistedTelNumber) return ResponseDto.duplicatedTelNumber(); 
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        
        String authNumber = AuthNumberCreator.number4();
        boolean isSendSuccess = smsProvider.sendMessage(telNumber, authNumber);
        if(!isSendSuccess) return ResponseDto.messageSendFail();

        // 인증번호 6자리 db에 저장
        try {
            TelAuthEntity telAuthNumberEntity = new TelAuthEntity(telNumber, authNumber);
            telAuthRepository.save(telAuthNumberEntity);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }

        return ResponseDto.success();
    }

    @Override
    public ResponseEntity<ResponseDto> telAuthCheck(TelAuthCheckRequestDto dto) {
        String telNumber = dto.getTelNumber();
        String authNumber = dto.getTelAuthNumber();

        try {
            boolean isMatched = telAuthRepository.existsByTelNumberAndTelAuthNumber(telNumber, authNumber);
            if(!isMatched) return ResponseDto.telAuthFail();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return ResponseDto.success();
    }

    @Override
    public ResponseEntity<ResponseDto> signUp(SignUpRequestDto dto) {
        String userId = dto.getUserId();
        String telNumber = dto.getTelNumber();
        String authNumber = dto.getTelAuthNumber();
        String password = dto.getPassword();
        String name = dto.getName();
        String birth = dto.getBirth();

        try {
            boolean isExistedId = userRepository.existsByUserId(userId);
            if(isExistedId) return ResponseDto.duplicatedUserId();

            boolean isExistedTelNumber = userRepository.existsByTelNumber(telNumber);
            if(isExistedTelNumber) return ResponseDto.duplicatedTelNumber();

            boolean isMatched = telAuthRepository.existsByTelNumberAndTelAuthNumber(telNumber, authNumber);
            if(!isMatched) return ResponseDto.telAuthFail();

            boolean isAdmin = adminRepository.existsByNameAndTelNumberAndBirth(name, telNumber, birth);
            if(isAdmin) dto.setRole(true); else dto.setRole(false);

            String encodedPassword = passwordEncoder.encode(password);
            dto.setPassword(encodedPassword);

            dto.setNickName(NickNameCreator.generateRandomString(10));

            UserEntity userEntity = new UserEntity(dto);
            userRepository.save(userEntity);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        
        return ResponseDto.success();
    }

    @Override
    public ResponseEntity<? super SignInResponseDto> signIn(SignInRequestDto dto) {

        String userId = dto.getUserId();
        String password = dto.getPassword();
        String accessToken = null;

        try {
            
            UserEntity userEntity = userRepository.findByUserId(userId);
            if(userEntity == null) return ResponseDto.signInFail();

            String encodedPassword = userEntity.getPassword();
            boolean isMatched = passwordEncoder.matches(password, encodedPassword);
            if(!isMatched) return ResponseDto.signInFail();

            accessToken = jwtProvider.create(userId);
            if(accessToken == null) return ResponseDto.tokenCreateFail();

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return SignInResponseDto.success(accessToken);
    }

    @Override
    public ResponseEntity<ResponseDto> findId(FindIdRequestDto dto) {
        String name = dto.getName();
        String telNumber = dto.getTelNumber();
        
        try {
            boolean isTrue = userRepository.existsByNameAndTelNumber(name, telNumber);
            if(!isTrue) return ResponseDto.noExistUserId();

            String authNumber = AuthNumberCreator.number4();
            boolean isSendSuccess = smsProvider.sendMessage(telNumber, authNumber);
            if(!isSendSuccess) return ResponseDto.messageSendFail();

            // 인증번호 6자리 db에 저장
            try {
                TelAuthEntity telAuthNumberEntity = new TelAuthEntity(telNumber, authNumber);
                telAuthRepository.save(telAuthNumberEntity);
            } catch (Exception e) {
                e.printStackTrace();
                return ResponseDto.databaseError();
            }

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return ResponseDto.success();
    }

    @Override
    public ResponseEntity<? super FindIdResultResponseDto> findIdResult(TelAuthCheckRequestDto dto) {
        String telNumber = dto.getTelNumber();
        String authNumber = dto.getTelAuthNumber();
        String userId = null;

        try {
            boolean isMatched = telAuthRepository.existsByTelNumberAndTelAuthNumber(telNumber, authNumber);
            if(!isMatched) return ResponseDto.telAuthFail();

            UserEntity userEntity = userRepository.findByTelNumber(telNumber);
            userId = userEntity.getUserId();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return FindIdResultResponseDto.success(userId);
    }

    @Override
    public ResponseEntity<ResponseDto> findPw(FindPwRequestDto dto) {
        String userId = dto.getUserId();
        String telNumber = dto.getTelNumber();
        
        try {
            boolean isTrue = userRepository.existsByUserIdAndTelNumber(userId, telNumber);
            if(!isTrue) return ResponseDto.noExistUserId();

            String authNumber = AuthNumberCreator.number4();
            boolean isSendSuccess = smsProvider.sendMessage(telNumber, authNumber);
            if(!isSendSuccess) return ResponseDto.messageSendFail();

            // 인증번호 6자리 db에 저장
            try {
                TelAuthEntity telAuthNumberEntity = new TelAuthEntity(telNumber, authNumber);
                telAuthRepository.save(telAuthNumberEntity);
            } catch (Exception e) {
                e.printStackTrace();
                return ResponseDto.databaseError();
            }

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return ResponseDto.success();
    }

    @Override
    public ResponseEntity<ResponseDto> changePw(ChangePwRequestDto dto) {
        String userId = dto.getUserId();
        String telNumber = dto.getTelNumber();
        String password = dto.getPassword();

        try {
            UserEntity userEntity = userRepository.findByUserIdAndTelNumber(userId, telNumber);
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

    @Override
    public ResponseEntity<? super GetSignInResponseDto> getSignIn(String userId) {

        UserEntity userEntity = null;
        try {
            userEntity = userRepository.findByUserId(userId);
            if(userEntity == null) return ResponseDto.noExistUserId();
            
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return GetSignInResponseDto.success(userEntity);
    }
}
