package com.korit.dorandoran.service.implement;

import java.util.HashMap;
import java.util.Map;

import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.korit.dorandoran.common.object.CustomOAuth2User;
import com.korit.dorandoran.entity.UserEntity;
import com.korit.dorandoran.provider.JwtProvider;
import com.korit.dorandoran.repository.UserRepository;

import lombok.RequiredArgsConstructor;

//# OAuth2 로그인 서비스

@Service
@RequiredArgsConstructor
public class OAuth2UserServiceImplement extends DefaultOAuth2UserService {
	private final JwtProvider jwtProvider;
	private final UserRepository userRepository;

	public OAuth2User loadUser(OAuth2UserRequest request) throws OAuth2AuthenticationException {
		OAuth2User oAuth2User = super.loadUser(request);
		String registration = request.getClientRegistration().getClientName().toLowerCase();

		// getSnsId 메서드 생성 후 작성
		String snsId = getSnsId(oAuth2User, registration);

		UserEntity userEntity = userRepository.findBySnsIdAndJoinPath(snsId, registration);

		// common - object CustomerOAuth2User 만든 후 작성

		CustomOAuth2User customOAuth2User = null;

		if (userEntity == null) {
			Map<String, Object> attributes = new HashMap<>();
			attributes.put("snsId", snsId);
			attributes.put("joinPath", registration);
			customOAuth2User = new CustomOAuth2User(snsId, attributes, false);
		} else {
			String userId = userEntity.getUserId();
			String token = jwtProvider.create(userId);

			Map<String, Object> attributes = new HashMap<>();
			attributes.put("accessToken", token);

			customOAuth2User = new CustomOAuth2User(userId, attributes, true);
		}

		return customOAuth2User;
	}

	// snsId 가져오기
	private String getSnsId(OAuth2User oAuth2User, String registration) {
		String snsId = null;

		if (registration.equals("kakao")) {
			snsId = oAuth2User.getName();
		}

		if (registration.equals("naver")) {
			Map<String, String> response = (Map<String, String>) oAuth2User.getAttributes().get("response");
			snsId = response.get("id");
		}

		if (registration.equals("google")) {
			snsId = oAuth2User.getName();
		}

		return snsId;
	}
}