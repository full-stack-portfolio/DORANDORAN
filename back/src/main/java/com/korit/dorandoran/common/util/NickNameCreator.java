package com.korit.dorandoran.common.util;

import java.util.Random;

public class NickNameCreator {
    
    // 처음 회원가입 시 DB에 입력될 랜덤 닉네임 자동 생성
    public static String generateRandomString(int length) {
        // 알파벳(대문자, 소문자)과 숫자를 포함한 문자 풀
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        Random random = new Random();
        StringBuilder result = new StringBuilder();

        for (int i = 0; i < length; i++) {
            // 랜덤한 인덱스 선택
            int index = random.nextInt(characters.length());
            // 해당 인덱스의 문자 추가
            result.append(characters.charAt(index));
        }

        return result.toString();
    }

}
