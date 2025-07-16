package com.paymii.backend.dtos.chat_message;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatMessageDto {
    private String sender;
    private String content;
    private String room;
}
