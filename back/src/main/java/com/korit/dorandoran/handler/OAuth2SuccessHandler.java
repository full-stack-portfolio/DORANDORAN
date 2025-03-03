package com.korit.dorandoran.handler;

import java.util.Map;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.korit.dorandoran.common.object.CustomOAuth2User;

import java.io.IOException;
import io.jsonwebtoken.io.SerialException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

//# OAuth2 인증 성공 후 핸들러

@Component
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
	@Override
	public void onAuthenticationSuccess(
		HttpServletRequest request,
		HttpServletResponse response,
		Authentication authentication
	) throws IOException, SerialException {
		CustomOAuth2User customOAuth2User = (CustomOAuth2User) authentication.getPrincipal();
		Map<String, Object> attributes = customOAuth2User.getAttributes();
		boolean existed = customOAuth2User.isExisted();

		if (existed) {
			String accessToken = (String) attributes.get("accessToken");
			response.sendRedirect("http://localhost:3000/sns-success?accessToken=" + accessToken + "&expiration=36000");
		}
		else {
			String snsId = (String) attributes.get("snsId");
			String joinPath = (String) attributes.get("joinPath");
			response.sendRedirect("http://localhost:3000/auth/sign-up?snsId=" + snsId + "&joinPath=" + joinPath);
		}
	}
}
