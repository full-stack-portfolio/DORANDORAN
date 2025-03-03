package com.korit.dorandoran.provider;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.response.SingleMessageSentResponse;
import net.nurigo.sdk.message.service.DefaultMessageService;

// cool sms 메시지 전송 제공자

@Component
public class SmsProvider {
    private final DefaultMessageService messageService;
    private final String from;

    public SmsProvider(
        @Value("${cool-sms.api-key}") String apiKey, 
        @Value("${cool-sms.secret-key}") String apiSecretKey,
        @Value("${cool-sms.domain}") String domain,
        @Value("${cool-sms.from}") String from
    ) {
        this.messageService = NurigoApp.INSTANCE.initialize(apiKey, apiSecretKey, domain);
        this.from = from;
    }

    public boolean sendMessage(String to, String authNumber) {
        Message message = new Message();
        message.setFrom(from);
        message.setTo(to);
        message.setText("도란도란 인증번호 [ " + authNumber + " ] 를 3분 이내에 입력해주시기 바랍니다.");

        SingleMessageSendingRequest request = new SingleMessageSendingRequest(message);
        SingleMessageSentResponse response = messageService.sendOne(request);

        boolean resultStatus = response.getStatusCode().equals("2000");
        return resultStatus;
    }
}
