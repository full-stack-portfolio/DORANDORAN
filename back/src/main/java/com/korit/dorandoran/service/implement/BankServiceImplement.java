package com.korit.dorandoran.service.implement;

import com.korit.dorandoran.dto.request.bank.PostBankRequestDto;
import com.korit.dorandoran.dto.response.ResponseDto;
import com.korit.dorandoran.entity.BankEntity;
import com.korit.dorandoran.repository.BankRepository;
import com.korit.dorandoran.service.BankService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BankServiceImplement implements BankService {

    private final BankRepository bankRepository;

    // ✅ 계좌 등록
    @Override
    public ResponseEntity<ResponseDto> postAccount(PostBankRequestDto requestDto) {
        BankEntity bankEntity = BankEntity.builder()
                .userId(requestDto.getUserId())
                .bankName(requestDto.getBankName())
                .accountNumber(requestDto.getAccountNumber())
                .accountAlias(requestDto.getAccountAlias())
                .build();

        bankRepository.save(bankEntity);
        return ResponseDto.success();
    }

    // ✅ 계좌 삭제
    @Override
    @Transactional
    public ResponseEntity<ResponseDto> deleteAccount(String userId, String accountNumber) {
        bankRepository.deleteByUserIdAndAccountNumber(userId, accountNumber);
        return ResponseDto.success();
    }

    // ✅ 사용자의 계좌 목록 조회
    @Override
    public ResponseEntity<List<BankEntity>> getUserAccounts(String userId) {
        List<BankEntity> accounts = bankRepository.findByUserId(userId);
        return ResponseEntity.ok(accounts);
    }
}
