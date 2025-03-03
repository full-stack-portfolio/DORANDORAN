package com.korit.dorandoran.dto.request.bank;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PostBankRequestDto {
    private String userId;
    private String bankName;
    private String accountNumber;
    private String accountAlias;
}
