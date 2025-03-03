package com.korit.dorandoran.handler;

import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.korit.dorandoran.dto.response.ResponseDto;

// 예외 대처를 위한 REST API 처리

@RestControllerAdvice
public class UserExceptionHandler {
	@ExceptionHandler({
		HttpMessageNotReadableException.class,
		MethodArgumentNotValidException.class
	})
	public ResponseEntity<ResponseDto> validationExceptionHandler(Exception exception) {
		exception.printStackTrace();
		return ResponseDto.validationFail();
	}
}