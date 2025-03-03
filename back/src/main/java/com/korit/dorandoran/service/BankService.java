package com.korit.dorandoran.service;

import com.korit.dorandoran.dto.request.bank.PostBankRequestDto;
import com.korit.dorandoran.dto.response.ResponseDto;
import com.korit.dorandoran.entity.BankEntity;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface BankService {
    ResponseEntity<ResponseDto> postAccount(PostBankRequestDto requestDto);
    ResponseEntity<ResponseDto> deleteAccount(String userId, String accountNumber);
    ResponseEntity<List<BankEntity>> getUserAccounts(String userId);
}
